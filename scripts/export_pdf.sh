#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HTML="$ROOT/output/InvestmentThesis.html"
OUT="$ROOT/output/InvestmentThesis.pdf"
TMPBASE="${TMPDIR:-/tmp}/chart_pdf_export"
NODEDIR="$TMPBASE/node"
IMGDIR="$TMPBASE/slides"

if [ ! -f "$HTML" ]; then
  echo "Missing deck: $HTML" >&2
  exit 1
fi

mkdir -p "$NODEDIR" "$IMGDIR" "$(dirname "$OUT")"

if [ ! -f "$NODEDIR/package.json" ]; then
  (cd "$NODEDIR" && npm init -y >/dev/null 2>&1)
fi
if [ ! -d "$NODEDIR/node_modules/playwright" ]; then
  (cd "$NODEDIR" && npm install --silent playwright)
fi

if ! python3 - <<'PY' >/dev/null 2>&1
import reportlab
import PIL
PY
then
  python3 -m pip install --quiet reportlab pillow
fi

export ROOT IMGDIR
(cd "$NODEDIR" && node <<'NODE')
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const root = process.env.ROOT;
  const htmlPath = path.join(root, 'output', 'InvestmentThesis.html');
  const outDir = process.env.IMGDIR;
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.evaluate(() => {
    document.querySelectorAll('.slide').forEach((el) => {
      el.style.transition = 'none';
    });
  });

  const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
  for (let i = 1; i <= totalSlides; i += 1) {
    await page.evaluate((n) => {
      if (typeof showSlide === 'function') showSlide(n);
    }, i);
    await page.waitForTimeout(700);
    const activeSlide = page.locator('.slide.active').first();
    const file = path.join(outDir, `slide-${String(i).padStart(2, '0')}.png`);
    await activeSlide.screenshot({ path: file });
  }

  await browser.close();
  console.log(`captured=${totalSlides}`);
})();
NODE

export OUT
python3 - <<'PY'
from pathlib import Path
from reportlab.pdfgen import canvas
from PIL import Image
import os

root = Path(os.environ["ROOT"])
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
