#!/usr/bin/env bash
# Rasterizes the app icon SVG sources (scripts/icon-src/) into the PNG assets
# referenced by app.json. Requires rsvg-convert and ImageMagick (`magick`).
# Run with: bash scripts/generate-app-icons.sh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT_DIR/scripts/icon-src"
OUT_DIR="$ROOT_DIR/assets"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

rsvg-convert -w 512 -h 512 "$SRC_DIR/bg.svg" -o "$OUT_DIR/android-icon-background.png"
rsvg-convert -w 512 -h 512 "$SRC_DIR/fg.svg" -o "$OUT_DIR/android-icon-foreground.png"
rsvg-convert -w 432 -h 432 "$SRC_DIR/mono.svg" -o "$OUT_DIR/android-icon-monochrome.png"
rsvg-convert -w 48 -h 48 "$SRC_DIR/favicon.svg" -o "$OUT_DIR/favicon.png"

rsvg-convert -w 1024 -h 1024 "$SRC_DIR/bg.svg" -o "$TMP_DIR/bg-1024.png"
rsvg-convert -w 1024 -h 1024 "$SRC_DIR/fg.svg" -o "$TMP_DIR/fg-1024.png"
magick "$TMP_DIR/bg-1024.png" "$TMP_DIR/fg-1024.png" -gravity center -composite \
  -background "#16203E" -alpha remove -alpha off "$OUT_DIR/icon.png"

rsvg-convert -w 1024 -h 1024 "$SRC_DIR/fg.svg" -o "$OUT_DIR/splash-icon.png"

echo "Icons written to $OUT_DIR"
