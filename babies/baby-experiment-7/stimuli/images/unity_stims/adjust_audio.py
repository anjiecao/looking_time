import os
import subprocess

base_dir = "fam9/"  # Change this to the path of your main folder

for subdir, _, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.mp4'):
            original_file_path = os.path.join(subdir, file)
            temp_file_path = os.path.join(subdir, "temp_output.mp4")

            # Use ffmpeg to double the volume
            cmd = [
                'ffmpeg',
                '-y',
                '-i', original_file_path,
                '-af', 'volume=10.0dB',
                temp_file_path
            ]
            subprocess.run(cmd)

            # Replace the original file with the processed file
            os.replace(temp_file_path, original_file_path)

print("Volume doubling process complete!")

