#!/usr/bin/env sh

minHeight=480
outputDir=src/assets/header

headerCut () {
  outputFile="$outputDir/header-$2.$3"
  echo "Create Header: '$outputFile'"

  convert "$1" -resize "$2" -gravity Center -crop "$2x$minHeight+0+0" "$outputFile"



  width=$(identify "$outputFile" | cut -f 3 -d " " | sed s/x.*//) #width
  height=$(identify "$outputFile" | cut -f 3 -d " " | sed s/.*x//) #height

  [[ "$height" -lt "$minHeight" ]] && convert "$1" -resize "x$minHeight" -gravity Center -crop "$2x$minHeight+0+0"  "$outputFile"
}

echo "Create Origin Header"
mkdir -v -p "$outputDir"
echo "Create Origin Header-jpg"
convert "$1" "$outputDir/header.jpg"
echo "Create Origin Header-webp"
convert "$1" "$outputDir/header.webp"

echo "Create JPG Header"
headerCut "$1" 3840 jpg
headerCut "$1" 2560 jpg
headerCut "$1" 1920 jpg
headerCut "$1" 1280 jpg
headerCut "$1" 854 jpg
headerCut "$1" 620 jpg
headerCut "$1" 426 jpg

echo "Create Webp Header"
headerCut "$1" 3840 webp
headerCut "$1" 2560 webp
headerCut "$1" 1920 webp
headerCut "$1" 1280 webp
headerCut "$1" 854 webp
headerCut "$1" 620 webp
headerCut "$1" 426 webp
