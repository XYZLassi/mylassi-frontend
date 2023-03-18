#!/usr/bin/env sh

mkdir -p "src/favicon/"
cp ./favicon.svg src/favicon
convert ./favicon.svg -resize 48x48 src/favicon/favicon.ico
convert ./favicon.svg -resize 192x192 src/favicon/favicon.png
convert ./favicon.svg -resize 32x32 src/favicon/favicon-32.png
convert ./favicon.svg -resize 96x96 src/favicon/favicon-96.png
convert ./favicon.svg -resize 180x180 src/favicon/apple-touch-icon.png
convert ./favicon.svg -resize 144x144 src/favicon/mstile-144x144.png

pwa-asset-generator favicon.svg ./src/favicon -v "" -i ./src/index.html -m ./src/manifest.webmanifest
