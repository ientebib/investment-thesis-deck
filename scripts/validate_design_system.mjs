#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const slidesDir = path.join(root, "components", "slides");
const manifestPath = path.join(root, "migration", "slide_manifest.json");
const slideRegistryPath = path.join(root, "components", "deck", "slideRegistry.tsx");
const slidesDataIndexPath = path.join(root, "lib", "data", "slides", "index.ts");
const dataRegistryPath = path.join(root, "lib", "data", "registry.ts");

if (!fs.existsSync(slidesDir)) {
  console.error("Missing slides directory:", slidesDir);
  process.exit(1);
}

const slideFiles = fs
  .readdirSync(slidesDir)
  .filter((file) => /^\d{2}-.*\.tsx$/.test(file))
  .sort();

const moduleCssFiles = fs
  .readdirSync(slidesDir)
  .filter((file) => file.endsWith(".module.css"))
  .sort();

const issues = [];

function addIssue(file, message) {
  issues.push(`${file}: ${message}`);
}

function normalizeTitle(value) {
  return value
    .toLowerCase()
    .replace(/&(?:rsquo|ldquo|rdquo|ndash|mdash);/g, " ")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titlesRoughlyMatch(left, right) {
  const a = normalizeTitle(left);
  const b = normalizeTitle(right);

  if (!a || !b) {
    return true;
  }

  if (a === b || a.includes(b) || b.includes(a)) {
    return true;
  }

  const aTokens = new Set(a.split(" ").filter((token) => token.length > 2));
  const bTokens = new Set(b.split(" ").filter((token) => token.length > 2));
  const overlap = [...aTokens].filter((token) => bTokens.has(token)).length;
  const smallerTokenCount = Math.min(aTokens.size, bTokens.size);

  return overlap >= Math.max(2, Math.floor(smallerTokenCount * 0.5));
}

function readSlideDataTitle(slideNumber) {
  const fileName = `slide${String(slideNumber).padStart(2, "0")}.ts`;
  const filePath = path.join(root, "lib", "data", "slides", fileName);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/\btitle:\s*(["'`])([\s\S]*?)\1/);
  if (!match) {
    return null;
  }
  return match[2].replace(/\s+/g, " ").trim();
}

function parseRegistryMappingEntries(source) {
  const blockMatch = source.match(
    /const migratedSlides:\s*Record<number,\s*ComponentType>\s*=\s*{([\s\S]*?)\n};/
  );
  if (!blockMatch) {
    return null;
  }

  const result = [];
  const entryRegex = /(\d+)\s*:\s*([A-Za-z0-9_]+)/g;
  for (const match of blockMatch[1].matchAll(entryRegex)) {
    result.push({ slide: Number.parseInt(match[1], 10), componentSymbol: match[2] });
  }
  return result;
}

function parseSlideImports(source) {
  const imports = new Map();
  const importRegex = /import\s+\{\s*([A-Za-z0-9_]+)\s*\}\s+from\s+"@\/components\/slides\/(\d{2})-([^"]+)";/g;
  for (const match of source.matchAll(importRegex)) {
    const symbol = match[1];
    const fileNumber = Number.parseInt(match[2], 10);
    const relPath = path.join("components", "slides", `${match[2]}-${match[3]}.tsx`);
    imports.set(symbol, { fileNumber, relPath });
  }
  return imports;
}

function parseDataIndexExports(source) {
  const numbers = new Set();
  const exportRegex = /from\s+"@\/lib\/data\/slides\/slide(\d{2})";/g;
  for (const match of source.matchAll(exportRegex)) {
    numbers.add(Number.parseInt(match[1], 10));
  }
  return numbers;
}

function parseDataRegistryEntries(source) {
  const blockMatch = source.match(
    /const reactDatasetSources:\s*Record<number,\s*string\[]>\s*=\s*{([\s\S]*?)\n};/
  );
  if (!blockMatch) {
    return null;
  }
  const map = new Map();
  const entryRegex = /(\d+)\s*:\s*\[\s*"lib\/data\/slides\/slide(\d{2})\.ts"\s*]/g;
  for (const match of blockMatch[1].matchAll(entryRegex)) {
    const key = Number.parseInt(match[1], 10);
    const slideFileNumber = Number.parseInt(match[2], 10);
    map.set(key, slideFileNumber);
  }
  return map;
}

function checkInlineStyles(file, source) {
  const styleMatches = [...source.matchAll(/style=\{\{[\s\S]*?\}\}/g)];
  for (const match of styleMatches) {
    const snippet = match[0];
    const keys = [...snippet.matchAll(/([A-Za-z0-9_]+)\s*:/g)].map((item) => item[1]);
    const allowedOnlyObjectPosition = keys.length > 0 && keys.every((key) => key === "objectPosition");
    if (!allowedOnlyObjectPosition) {
      addIssue(file, `inline style not allowed: ${snippet.slice(0, 100)}...`);
    }
  }
}

for (const file of slideFiles) {
  const fullPath = path.join(slidesDir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const isTitleSlide = file.startsWith("01-");
  const isLeadershipSlide = file.startsWith("02-");
  const isDividerSlide = file.includes("divider");
  const usesSectionHeader = source.includes("<SectionHeader");
  const usesSourceLineComponent = source.includes("<SourceLine");

  if (/module\.css/.test(source) || /className=\{styles\./.test(source)) {
    addIssue(file, "CSS Modules are not allowed for slides in this repo");
  }

  if (!source.includes('from "@/lib/data/slides"')) {
    addIssue(file, 'must import structured data from "@/lib/data/slides"');
  }

  if (/#[0-9a-fA-F]{3,8}\b/.test(source)) {
    addIssue(file, "contains hardcoded hex color; use theme tokens");
  }

  checkInlineStyles(file, source);

  if (!isTitleSlide && !isDividerSlide) {
    if (!usesSectionHeader && !/className="[^"]*\bsection-label\b[^"]*"/.test(source)) {
      addIssue(file, 'missing standard section label class: className="section-label"');
    }
    if (!usesSectionHeader && !/className="[^"]*\bslide-title\b[^"]*"/.test(source)) {
      addIssue(file, 'missing standard title class: className="slide-title"');
    }
    if (!usesSectionHeader && !/className="[^"]*\bslide-subtitle\b[^"]*"/.test(source)) {
      addIssue(file, 'missing standard subtitle class: className="slide-subtitle"');
    }
    if (!usesSourceLineComponent && !/className="[^"]*\b(?:source-line|slide-footer)\b[^"]*"/.test(source)) {
      addIssue(file, 'missing SourceLine component or slide-footer class');
    }
  }

  if (isDividerSlide && usesSectionHeader) {
    addIssue(file, "section divider slides must not use SectionHeader");
  }

  if (source.includes("ChartData<") && !source.includes("theme")) {
    addIssue(file, "chart slide should consume theme tokens");
  }

  const forbiddenBackgroundColorLiteral = /backgroundColor:\s*["'](?!transparent["'])/;
  if (forbiddenBackgroundColorLiteral.test(source)) {
    addIssue(file, "hardcoded chart backgroundColor literal detected; use theme/semantic helpers");
  }
}

for (const cssFile of moduleCssFiles) {
  addIssue(cssFile, "remove stale slide CSS module; use app/globals.css prefixed classes");
}

if (!fs.existsSync(manifestPath)) {
  addIssue("migration/slide_manifest.json", "missing slide manifest for numbering validation");
}

if (!fs.existsSync(slideRegistryPath)) {
  addIssue("components/deck/slideRegistry.tsx", "missing slide registry");
}

if (!fs.existsSync(slidesDataIndexPath)) {
  addIssue("lib/data/slides/index.ts", "missing slide data index");
}

if (!fs.existsSync(dataRegistryPath)) {
  addIssue("lib/data/registry.ts", "missing slide data registry");
}

if (
  fs.existsSync(manifestPath) &&
  fs.existsSync(slideRegistryPath) &&
  fs.existsSync(slidesDataIndexPath) &&
  fs.existsSync(dataRegistryPath)
) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const manifestByLegacy = new Map(
    (manifest.slides ?? []).map((entry) => [Number.parseInt(String(entry.slide), 10), entry])
  );

  const registrySource = fs.readFileSync(slideRegistryPath, "utf8");
  const slidesIndexSource = fs.readFileSync(slidesDataIndexPath, "utf8");
  const dataRegistrySource = fs.readFileSync(dataRegistryPath, "utf8");

  const migratedEntries = parseRegistryMappingEntries(registrySource);
  if (!migratedEntries) {
    addIssue("components/deck/slideRegistry.tsx", "could not parse migratedSlides mapping");
  } else {
    const slideImports = parseSlideImports(registrySource);
    const dataIndexExports = parseDataIndexExports(slidesIndexSource);
    const dataRegistryEntries = parseDataRegistryEntries(dataRegistrySource);

    if (!dataRegistryEntries) {
      addIssue("lib/data/registry.ts", "could not parse reactDatasetSources mapping");
    }

    const migratedNumbers = migratedEntries.map((entry) => entry.slide).sort((a, b) => a - b);
    const maxMigrated = migratedNumbers[migratedNumbers.length - 1] ?? 0;
    for (let expected = 1; expected <= maxMigrated; expected += 1) {
      if (!migratedNumbers.includes(expected)) {
        addIssue(
          "components/deck/slideRegistry.tsx",
          `migratedSlides has a numbering gap at slide ${expected}; keep migrated mappings contiguous`
        );
      }
    }

    for (const entry of migratedEntries) {
      const { slide, componentSymbol } = entry;
      const imported = slideImports.get(componentSymbol);
      if (!imported) {
        addIssue(
          "components/deck/slideRegistry.tsx",
          `migratedSlides[${slide}] references "${componentSymbol}" but no matching import was found`
        );
        continue;
      }

      if (imported.fileNumber !== slide) {
        addIssue(
          "components/deck/slideRegistry.tsx",
          `migratedSlides[${slide}] points to component file ${imported.relPath} (slide ${imported.fileNumber})`
        );
      }

      const componentPath = path.join(root, imported.relPath);
      if (!fs.existsSync(componentPath)) {
        addIssue(imported.relPath, `component file for slide ${slide} does not exist`);
      }

      const dataFileName = `slide${String(slide).padStart(2, "0")}.ts`;
      const dataFilePath = path.join(root, "lib", "data", "slides", dataFileName);
      if (!fs.existsSync(dataFilePath)) {
        addIssue(`lib/data/slides/${dataFileName}`, `missing data file for migrated slide ${slide}`);
      }

      if (!dataIndexExports.has(slide)) {
        addIssue(
          "lib/data/slides/index.ts",
          `missing export for migrated slide ${slide} (expected slide${String(slide).padStart(2, "0")})`
        );
      }

      if (!dataRegistryEntries || !dataRegistryEntries.has(slide)) {
        addIssue("lib/data/registry.ts", `missing reactDatasetSources entry for migrated slide ${slide}`);
      } else if (dataRegistryEntries.get(slide) !== slide) {
        addIssue(
          "lib/data/registry.ts",
          `reactDatasetSources[${slide}] points to slide${String(dataRegistryEntries.get(slide)).padStart(2, "0")} instead of slide${String(slide).padStart(2, "0")}`
        );
      }

      if (slide >= 3) {
        const expectedLegacy = slide - 1;
        const manifestEntry = manifestByLegacy.get(expectedLegacy);
        if (!manifestEntry) {
          addIssue(
            "components/deck/slideRegistry.tsx",
            `migrated slide ${slide} has no corresponding legacy slide ${expectedLegacy} in manifest`
          );
          continue;
        }

        const manifestTitle = manifestEntry.title ? String(manifestEntry.title) : "";
        const dataTitle = readSlideDataTitle(slide);
        if (manifestTitle && dataTitle && !titlesRoughlyMatch(manifestTitle, dataTitle)) {
          addIssue(
            `lib/data/slides/${dataFileName}`,
            `title looks misaligned with manifest for deck slide ${slide} (legacy ${expectedLegacy})`
          );
        }
      }
    }
  }
}

if (issues.length > 0) {
  console.error("\nDesign-system validation failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Design-system validation passed (${slideFiles.length} slide components checked).`);
