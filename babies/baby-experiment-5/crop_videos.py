import os
from moviepy.editor import VideoFileClip

source_folder = "unity_stims/"
destination_folder = "cropped_vids/"

if not os.path.exists(destination_folder):
    os.makedirs(destination_folder)

for video_file in os.listdir(source_folder):
    if video_file.endswith(('.mp4', '.avi', '.mov', '.mkv', '.flv')):  # Add any other video formats if needed
        video_path = os.path.join(source_folder, video_file)
        with VideoFileClip(video_path) as clip:
            duration = clip.duration
            start_time = max(0, duration - 6)  # Ensure the start_time is not negative

            new_clip = clip.subclip(start_time, duration)
            new_clip.write_videofile(os.path.join(destination_folder, video_file))


print("Cropping completed!")
