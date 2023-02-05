#!/usr/bin/env sh

convert src/favicon/favicon.svg -resize 48x48 src/favicon/favicon.ico
convert src/favicon/favicon.svg -resize 192x192 src/favicon/favicon.png
convert src/favicon/favicon.svg -resize 32x32 src/favicon/favicon-32.png
convert src/favicon/favicon.svg -resize 96x96 src/favicon/favicon-96.png
convert src/favicon/favicon.svg -resize 180x180 src/favicon/apple-touch-icon.png
convert src/favicon/favicon.svg -resize 144x144 src/favicon/mstile-144x144.png
