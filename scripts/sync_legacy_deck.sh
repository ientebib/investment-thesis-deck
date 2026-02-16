#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DECK="$ROOT/output/InvestmentThesis.html"
SRC_ASSETS="$ROOT/output/assets"
DST_PUBLIC="$ROOT/public"

if [[ ! -f "$SRC_DECK" ]]; then
  echo "Missing source deck: $SRC_DECK" >&2
  exit 1
fi

mkdir -p "$DST_PUBLIC"
cp "$SRC_DECK" "$DST_PUBLIC/InvestmentThesis.html"

if [[ -d "$SRC_ASSETS" ]]; then
  rm -rf "$DST_PUBLIC/assets"
  mkdir -p "$DST_PUBLIC/assets"
  cp -R "$SRC_ASSETS"/. "$DST_PUBLIC/assets/"
fi

echo "Synced legacy deck to public/InvestmentThesis.html"
