import os
import numpy as np
from PIL import Image, ImageSequence

def set_pixels_above_threshold_to_white(input_folder, output_folder):
    # Ensure output directory exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Loop through all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith('.gif'):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)

            # Use PIL to open the GIF
            im = Image.open(input_path)
            frames = [frame.copy() for frame in ImageSequence.Iterator(im)]
            processed_frames = []

            for frame in frames:
                frame_np = np.array(frame)

                # Get the pixel value of the top-left most pixel
                threshold = frame_np[0, 0]  # Assuming the image is RGBA; if it's RGB, use frame_np[0, 0]

                # Create a mask where pixels above the threshold are set to white
                mask = (frame_np > 240)  # Again, assuming RGBA
                frame_np[mask] = 255  # Set to white (including alpha channel)

                # Convert the NumPy array back to a PIL Image for saving
                pil_image = Image.fromarray(frame_np)

                pil_image = pil_image.convert("P", palette=Image.ADAPTIVE, dither=Image.FLOYDSTEINBERG)

                processed_frames.append(pil_image)

            # Save processed frames back as GIF
            processed_frames[1].save(output_path, save_all=True, append_images=processed_frames[2:], loop=0, duration=im.info['duration'],quality = 95)
            print(f"Processed GIF '{input_path}' and saved to '{output_path}'.")

# Example usage
input_folder = "."
output_folder = "whitened"

set_pixels_above_threshold_to_white(input_folder, output_folder)

