#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "lib", "data", "slides");
const COMPONENTS_DIR = path.join(ROOT, "components", "slides");
const SLIDE_REGISTRY_PATH = path.join(ROOT, "components", "deck", "slideRegistry.tsx");
const OUTPUT_PATH = path.join(ROOT, "docs", "slide-copy-review.md");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseDeletedSlides() {
  const source = readText(SLIDE_REGISTRY_PATH);
  const match = source.match(/const\s+deletedSlides\s*=\s*new\s+Set\(\[([^\]]*)\]\)/);
  if (!match) {
    return new Set();
  }
  const values = match[1]
    .split(",")
    .map((v) => Number(v.trim()))
    .filter((v) => Number.isFinite(v));
  return new Set(values);
}

function parseSlideNumberFromDataFilename(filename) {
  const match = filename.match(/^slide(\d{2})\.ts$/);
  return match ? Number(match[1]) : null;
}

function findComponentPath(slideNumber) {
  const prefix = `${String(slideNumber).padStart(2, "0")}-`;
  const files = fs.readdirSync(COMPONENTS_DIR);
  const found = files.find((file) => file.startsWith(prefix) && file.endsWith(".tsx"));
  return found ? path.join(COMPONENTS_DIR, found) : null;
}

function propName(name) {
  if (ts.isIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return null;
}

function evaluateNode(node) {
  if (!node) return undefined;

  if (ts.isParenthesizedExpression(node)) {
    return evaluateNode(node.expression);
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) {
      const expr = span.expression.getText();
      text += `\${${expr}}${span.literal.text}`;
    }
    return text;
  }

  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
    const n = Number(node.operand.text);
    if (node.operator === ts.SyntaxKind.MinusToken) return -n;
    if (node.operator === ts.SyntaxKind.PlusToken) return n;
  }

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((el) => evaluateNode(el));
  }

  if (ts.isObjectLiteralExpression(node)) {
    const output = {};
    for (const property of node.properties) {
      if (ts.isPropertyAssignment(property)) {
        const key = propName(property.name);
        if (!key) continue;
        output[key] = evaluateNode(property.initializer);
      } else if (ts.isShorthandPropertyAssignment(property)) {
        const key = property.name.text;
        output[key] = undefined;
      }
    }
    return output;
  }

  if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
    return evaluateNode(node.expression);
  }

  if (ts.isIdentifier(node)) {
    return undefined;
  }

  return undefined;
}

function flattenStrings(value, currentPath = "") {
  const rows = [];

  if (typeof value === "string") {
    rows.push({ path: currentPath || "(root)", value });
    return rows;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const nextPath = `${currentPath}[${index}]`;
      rows.push(...flattenStrings(item, nextPath));
    });
    return rows;
  }

  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      const nextPath = currentPath ? `${currentPath}.${key}` : key;
      rows.push(...flattenStrings(nested, nextPath));
    }
  }

  return rows;
}

function parseDataFile(dataPath) {
  const source = readText(dataPath);
  const sf = ts.createSourceFile(dataPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

  let objectNode = null;

  sf.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    const isExported = node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword);
    if (!isExported) return;

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) continue;
      if (!declaration.name.text.startsWith("slide")) continue;
      if (!declaration.initializer) continue;

      if (ts.isObjectLiteralExpression(declaration.initializer)) {
        objectNode = declaration.initializer;
        return;
      }

      if (ts.isAsExpression(declaration.initializer) && ts.isObjectLiteralExpression(declaration.initializer.expression)) {
        objectNode = declaration.initializer.expression;
        return;
      }
    }
  });

  if (!objectNode) {
    return {
      raw: {},
      strings: []
    };
  }

  const raw = evaluateNode(objectNode) ?? {};
  const strings = flattenStrings(raw);

  return { raw, strings };
}

function normalizeInlineText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function looksHumanSentence(text) {
  if (!text) return false;
  if (text.length < 4) return false;
  if (text.startsWith("@/")) return false;
  if (text.startsWith("/")) return false;
  if (text.includes("http://") || text.includes("https://")) return false;
  if (/^rgba?\(/i.test(text) || /^hsla?\(/i.test(text)) return false;
  if (/^#[0-9a-f]{3,8}$/i.test(text)) return false;
  if (/^[A-Za-z0-9_.:-]+$/.test(text)) return false;
  if (/^[a-z0-9_-]+(?:\s+[a-z0-9_-]+)+$/.test(text)) return false;
  if (/^\[\[.*\]\]$/.test(text)) return false;
  if (/^[a-z-]+$/.test(text)) return false;
  if (/[{}<>]/.test(text)) return false;
  return /[A-Za-z]/.test(text);
}

function parseComponentFile(componentPath) {
  if (!componentPath) {
    return {
      charts: {},
      inlineCopy: []
    };
  }

  const source = readText(componentPath);
  const charts = {
    BarChart: (source.match(/<BarChart\b/g) || []).length,
    LineChart: (source.match(/<LineChart\b/g) || []).length,
    DonutChart: (source.match(/<DonutChart\b/g) || []).length
  };

  const sf = ts.createSourceFile(componentPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const inlineSet = new Set();

  function isNonCopyStringLiteral(node) {
    const parent = node.parent;
    if (!parent) return false;

    if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) {
      return true;
    }

    if (ts.isJsxAttribute(parent)) {
      const attr = parent.name.text;
      if (["className", "id", "key", "src", "href", "target", "rel", "role", "name", "type"].includes(attr)) {
        return true;
      }
    }

    if (ts.isCallExpression(parent) && ts.isIdentifier(parent.expression) && parent.expression.text === "require") {
      return true;
    }

    return false;
  }

  function visit(node) {
    if (ts.isJsxText(node)) {
      const text = normalizeInlineText(node.getText());
      if (looksHumanSentence(text)) {
        inlineSet.add(text);
      }
    }

    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (isNonCopyStringLiteral(node)) {
        ts.forEachChild(node, visit);
        return;
      }
      const text = normalizeInlineText(node.text);
      if (looksHumanSentence(text)) {
        inlineSet.add(text);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sf);

  return {
    charts,
    inlineCopy: [...inlineSet]
      .filter((text) => text.length <= 220)
      .sort((a, b) => a.localeCompare(b))
  };
}

function escapeMd(text) {
  return String(text).replace(/\|/g, "\\|").replace(/`/g, "\\`");
}

function firstValue(rows, wantedPath) {
  const item = rows.find((row) => row.path === wantedPath);
  return item ? item.value : "";
}

function buildDocument(slides, deletedSlides) {
  const lines = [];
  const now = new Date().toISOString();

  lines.push("# Slide Copy Review Packet");
  lines.push("");
  lines.push(`Generated: ${now}`);
  lines.push("Source: `lib/data/slides/*.ts` + `components/slides/*.tsx`");
  lines.push("");
  lines.push("Use this as an editable language sheet. Each slide includes a key-value map of extracted copy so you can rewrite titles, subtitles, and prose in one pass.");
  lines.push("");
  lines.push("## Deck Status");
  lines.push("");
  lines.push(`- Slides currently excluded from runtime deck: ${[...deletedSlides].sort((a, b) => a - b).join(", ") || "None"}`);
  lines.push(`- Total slide data files parsed: ${slides.length}`);
  lines.push("");

  for (const slide of slides) {
    const chartParts = Object.entries(slide.charts)
      .filter(([, count]) => count > 0)
      .map(([name, count]) => `${name}×${count}`);

    const sectionLabel = firstValue(slide.strings, "sectionLabel");
    const title = firstValue(slide.strings, "title");
    const subtitle = firstValue(slide.strings, "subtitle");
    const sourceLine = firstValue(slide.strings, "sourceLine");

    lines.push(`## Slide ${String(slide.number).padStart(2, "0")}`);
    lines.push("");
    lines.push(`- Status: ${slide.deleted ? "excluded from runtime deck" : "active"}`);
    lines.push(`- Data file: \`${slide.dataFileRel}\``);
    lines.push(`- Component: ${slide.componentFileRel ? `\`${slide.componentFileRel}\`` : "(missing)"}`);
    lines.push(`- Section: ${sectionLabel || "(none)"}`);
    lines.push(`- Title: ${title || "(none)"}`);
    lines.push(`- Subtitle: ${subtitle || "(none)"}`);
    lines.push(`- Charts: ${chartParts.length ? chartParts.join(", ") : "none"}`);
    if (sourceLine) {
      lines.push(`- Source line: ${sourceLine}`);
    }
    lines.push("");

    if (chartParts.length) {
      lines.push("### What This Chart Shows");
      lines.push("");
      lines.push(`- ${subtitle || title || "Chart slide."}`);
      lines.push(`- Visuals: ${chartParts.join(", ")}`);
      if (sourceLine) {
        lines.push(`- Data source: ${sourceLine.replace(/^Source:\s*/i, "")}`);
      }
      lines.push("");
    } else {
      lines.push("### Slide Intent");
      lines.push("");
      lines.push(`- ${subtitle || title || "Content slide."}`);
      lines.push("");
    }

    const chartStrings = slide.strings.filter((row) => /chart/i.test(row.path));
    if (chartStrings.length) {
      lines.push("### Chart-Related Copy");
      lines.push("");
      for (const row of chartStrings) {
        lines.push(`- \`${row.path}\`: ${escapeMd(row.value)}`);
      }
      lines.push("");
    }

    const nonMetaStrings = slide.strings.filter(
      (row) => !["sectionLabel", "title", "subtitle", "sourceLine"].includes(row.path)
    );

    lines.push("### Extracted Copy Map");
    lines.push("");
    if (!nonMetaStrings.length) {
      lines.push("- (no additional copy extracted)");
    } else {
      for (const row of nonMetaStrings) {
        lines.push(`- \`${row.path}\`: ${escapeMd(row.value)}`);
      }
    }
    lines.push("");

    const inlineCopy = slide.inlineCopy.filter((text) => {
      if (title && text === title) return false;
      if (subtitle && text === subtitle) return false;
      if (sourceLine && text === sourceLine) return false;
      return true;
    });

    if (inlineCopy.length) {
      lines.push("### Inline Component Copy (Hardcoded)");
      lines.push("");
      for (const text of inlineCopy) {
        lines.push(`- ${escapeMd(text)}`);
      }
      lines.push("");
    }
  }

  return `${lines.join("\n")}\n`;
}

function main() {
  const deletedSlides = parseDeletedSlides();

  const dataFiles = fs
    .readdirSync(DATA_DIR)
    .filter((file) => /^slide\d{2}\.ts$/.test(file))
    .sort((a, b) => a.localeCompare(b));

  const slides = dataFiles
    .map((dataFile) => {
      const number = parseSlideNumberFromDataFilename(dataFile);
      if (number === null) return null;

      const dataPath = path.join(DATA_DIR, dataFile);
      const componentPath = findComponentPath(number);
      const { strings } = parseDataFile(dataPath);
      const { charts, inlineCopy } = parseComponentFile(componentPath);

      return {
        number,
        deleted: deletedSlides.has(number),
        dataFileRel: path.relative(ROOT, dataPath),
        componentFileRel: componentPath ? path.relative(ROOT, componentPath) : null,
        strings,
        charts,
        inlineCopy
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.number - b.number);

  const markdown = buildDocument(slides, deletedSlides);
  ensureDir(path.dirname(OUTPUT_PATH));
  fs.writeFileSync(OUTPUT_PATH, markdown, "utf8");

  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)} with ${slides.length} slides.`);
}

main();
