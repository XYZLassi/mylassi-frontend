#!/usr/bin/env sh

minHeight=480
outputDir=src/assets/header

headerCut () {
  outputFile="$outputDir/header-$2.jpg"
  convert "$1" -resize "$2" -gravity Center -crop "$2x$minHeight+0+0" "$outputFile"

  width=$(identify "$outputFile" | cut -f 3 -d " " | sed s/x.*//) #width
  height=$(identify "$outputFile" | cut -f 3 -d " " | sed s/.*x//) #height

  [[ "$height" -lt "$minHeight" ]] && convert "$1" -resize "x$minHeight" "$outputFile"
}

mkdir -p "outputDir"
cp "$1" "$outputDir"
headerCut "$1" 3840
headerCut "$1" 2560
headerCut "$1" 1920
headerCut "$1" 1280
headerCut "$1" 854
headerCut "$1" 620
headerCut "$1" 426
