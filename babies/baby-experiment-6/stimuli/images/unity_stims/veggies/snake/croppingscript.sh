#!/bin/bash

# Loop over all .mp4 files in the current directory
for filepath in *.mp4
do
  # Output file path
  output_path="${filepath%.*}_cropped.mp4"

  # Get the height and width of the video
  height=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$filepath")
  width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$filepath")

  # Calculate the new height and width (60% of the original height, 88% of the original width)
  new_height=$(awk -v h="$height" 'BEGIN{printf("%d", h*0.6)}')
  new_width=$(awk -v w="$width" 'BEGIN{printf("%d", w*0.88)}')

  # Calculate offsets (20% of the original height, 0% of the original width)
  y_offset=$(awk -v h="$height" 'BEGIN{printf("%d", h*0.2)}')
  x_offset=0

  # Crop the video
  ffmpeg -i "$filepath" -filter:v "crop=${new_width}:${new_height}:${x_offset}:${y_offset}" "$output_path"
done
