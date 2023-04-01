#!/usr/bin/env sh

backgroundColor="#1b1e20"

mkdir -p "./src/favicon/"
cp ./favicon.svg ./src/favicon
convert -background "$backgroundColor" ./favicon.svg  -resize 48x48 src/favicon/favicon.ico
convert -background "$backgroundColor" ./favicon.svg -resize 192x192  src/favicon/favicon.png
convert -background "$backgroundColor" ./favicon.svg  -resize 32x32 src/favicon/favicon-32.png
convert -background "$backgroundColor" ./favicon.svg  -resize 96x96 src/favicon/favicon-96.png
convert -background "$backgroundColor" ./favicon.svg  -resize 180x180 src/favicon/apple-touch-icon.png
convert -background "$backgroundColor" ./favicon.svg  -resize 144x144 src/favicon/mstile-144x144.png

npm run pwa-asset-generator -- --path-override "" --background "$backgroundColor" -i ./src/index.html -m ./src/manifest.webmanifest favicon.svg
