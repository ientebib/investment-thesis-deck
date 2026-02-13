#!/usr/bin/env python3
"""Generate a slide-level manifest from the legacy HTML deck.

This file is used as a migration checklist to preserve content and chart parity.
"""

from __future__ import annotations

import json
import re
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEGACY_DECK = ROOT / "output" / "InvestmentThesis.html"
OUT_FILE = ROOT / "migration" / "slide_manifest.json"

SLIDE_START_RE = re.compile(r'<div class="slide(?: active)?" id="slide-(\d+)">')
TITLE_RE = re.compile(r'class="(title-main|divider-title|slide-title)"[^>]*>(.*?)</div>')
CANVAS_RE = re.compile(r'<canvas id="([^"]+)"')
SOURCE_RE = re.compile(r'class="source-line"')
STYLE_ATTR_RE = re.compile(r'\sstyle="')


def _clean_html_text(raw: str) -> str:
    text = re.sub(r"<[^>]+>", "", raw)
    return unescape(" ".join(text.split()))


def main() -> None:
    if not LEGACY_DECK.exists():
        raise SystemExit(f"Missing source deck: {LEGACY_DECK}")

    lines = LEGACY_DECK.read_text(encoding="utf-8").splitlines()
    starts: list[tuple[int, int]] = []

    for line_no, line in enumerate(lines, start=1):
        match = SLIDE_START_RE.search(line)
        if match:
            starts.append((int(match.group(1)), line_no))

    if not starts:
        raise SystemExit("No slides found in source deck.")

    starts.sort(key=lambda item: item[0])
    manifest: list[dict[str, object]] = []

    for index, (slide_id, start_line) in enumerate(starts):
        end_line = starts[index + 1][1] - 1 if index + 1 < len(starts) else len(lines)
        block = "\n".join(lines[start_line - 1 : end_line])

        title = ""
        title_match = TITLE_RE.search(block)
        if title_match:
            title = _clean_html_text(title_match.group(2))

        canvas_ids = CANVAS_RE.findall(block)

        manifest.append(
            {
                "slide": slide_id,
                "startLine": start_line,
                "endLine": end_line,
                "title": title,
                "chartCanvasIds": canvas_ids,
                "chartCount": len(canvas_ids),
                "inlineStyleAttrCount": len(STYLE_ATTR_RE.findall(block)),
                "hasSourceLine": bool(SOURCE_RE.search(block)),
            }
        )

    output = {
        "source": str(LEGACY_DECK.relative_to(ROOT)),
        "slideCount": len(manifest),
        "chartCount": sum(int(item["chartCount"]) for item in manifest),
        "generatedAt": "2026-02-09",
        "slides": manifest,
    }

    OUT_FILE.write_text(json.dumps(output, indent=2), encoding="utf-8")
    print(f"Wrote {OUT_FILE.relative_to(ROOT)}")
    print(f"slideCount={output['slideCount']} chartCount={output['chartCount']}")


if __name__ == "__main__":
    main()
