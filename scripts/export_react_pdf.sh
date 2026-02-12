#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${OUT:-$ROOT/output/InvestmentThesis-react.pdf}"
URL="${DECK_URL:-}"
TMPBASE="${TMPDIR:-/tmp}/chart_pdf_export_react"
NODEDIR="$TMPBASE/node"
IMGDIR="$TMPBASE/slides"
BROWSERDIR="$TMPBASE/playwright-browsers"
AUTO_PORT="${DECK_PORT:-3173}"
DEV_PID=""
STARTED_SERVER=0

mkdir -p "$NODEDIR" "$IMGDIR" "$(dirname "$OUT")"
mkdir -p "$BROWSERDIR"
export PLAYWRIGHT_BROWSERS_PATH="$BROWSERDIR"

cleanup() {
  if [ "$STARTED_SERVER" -eq 1 ] && [ -n "$DEV_PID" ]; then
    kill "$DEV_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

if [ -z "$URL" ]; then
  for candidate in \
    "http://127.0.0.1:3000/deck-react?desktop=1" \
    "http://127.0.0.1:3001/deck-react?desktop=1"
  do
    if curl -s --max-time 2 -o /dev/null "$candidate"; then
      URL="$candidate"
      break
    fi
  done
fi

if [ -z "$URL" ]; then
  echo "No running deck detected. Starting temporary dev server on port $AUTO_PORT..."
  (
    cd "$ROOT"
    nohup env NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1 --port "$AUTO_PORT" > "$TMPBASE/next-dev.log" 2>&1 &
    echo $! > "$TMPBASE/next-dev.pid"
  )
  DEV_PID="$(cat "$TMPBASE/next-dev.pid")"
  STARTED_SERVER=1
  URL="http://127.0.0.1:${AUTO_PORT}/deck-react?desktop=1"

  ready=0
  for _ in $(seq 1 90); do
    if curl -s --max-time 2 -o /dev/null "$URL"; then
      ready=1
      break
    fi
    sleep 1
  done

  if [ "$ready" -ne 1 ]; then
    echo "Failed to start temporary dev server for PDF export." >&2
    tail -n 40 "$TMPBASE/next-dev.log" >&2 || true
    exit 1
  fi
fi

if [ ! -f "$NODEDIR/package.json" ]; then
  (cd "$NODEDIR" && npm init -y >/dev/null 2>&1)
fi
if [ ! -d "$NODEDIR/node_modules/playwright" ]; then
  (cd "$NODEDIR" && npm install --silent playwright)
fi
(cd "$NODEDIR" && npx --yes playwright install chromium >/dev/null 2>&1)

if ! python3 - <<'PY' >/dev/null 2>&1
import reportlab
import PIL
PY
then
  python3 -m pip install --quiet reportlab pillow
fi

export URL IMGDIR
(cd "$NODEDIR" && node <<'NODE')
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const url = process.env.URL;
  const outDir = process.env.IMGDIR;
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  // Bypass client-side deck auth gate used in deck-react pages.
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('deck_auth', '1');
    } catch (_) {}
  });

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  const slideNumbers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.slide[id^="slide-"]'))
      .map((el) => Number(el.id.replace('slide-', '')))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);
  });

  if (!slideNumbers.length) {
    throw new Error('No slides found at deck URL. Is the dev server running?');
  }

  for (const n of slideNumbers) {
    await page.evaluate((slideNumber) => {
      if (typeof window.__deckGoTo === 'function') {
        window.__deckGoTo(slideNumber);
      }
    }, n);

    await page.waitForTimeout(800);
    const activeSlide = page.locator(`#slide-${n}.slide.active`).first();
    const file = path.join(outDir, `slide-${String(n).padStart(2, '0')}.png`);
    await activeSlide.screenshot({ path: file });
  }

  await browser.close();
  console.log(`captured=${slideNumbers.length}`);
})();
NODE

export OUT IMGDIR
python3 - <<'PY'
from pathlib import Path
from reportlab.pdfgen import canvas
from PIL import Image
import os

img_dir = Path(os.environ["IMGDIR"])
out_pdf = Path(os.environ["OUT"])

images = sorted(img_dir.glob('slide-*.png'))
if not images:
    raise SystemExit('No slide PNGs found')

c = None
for img_path in images:
    with Image.open(img_path) as im:
        w, h = im.size
    if c is None:
        c = canvas.Canvas(str(out_pdf), pagesize=(w, h))
    else:
        c.setPageSize((w, h))
    c.drawImage(str(img_path), 0, 0, width=w, height=h, preserveAspectRatio=False, mask='auto')
    c.showPage()

c.save()
print(out_pdf)
print(f"pages={len(images)}")
PY

pdfinfo "$OUT" | sed -n '1,22p'
