import yt_dlp as youtube_dl
import tkinter as tk
from tkinter import filedialog, messagebox

def download_tiktok_audio_gui():
    try:
        video_url = entry.get()
        save_file = filedialog.asksaveasfilename(defaultextension=".mp3", filetypes=[("MP3 files", "*.mp3")])
        
        if not video_url:
            messagebox.showerror("Error", "Please enter a TikTok video URL.")
            return
        if not save_file:
            messagebox.showerror("Error", "Please specify a file name.")
            return

        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'outtmpl': save_file,  # Save directly to the chosen location
            'ffmpeg_location': '"D:\Music\ffmpeg-master-latest-win64-gpl\ffmpeg-master-latest-win64-gpl\bin"'  # Update if necessary
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])

        messagebox.showinfo("Success", "Audio downloaded and saved successfully!")
    except Exception as e:
        messagebox.showerror("Error", f"An error occurred: {str(e)}")

# GUI setup
root = tk.Tk()
root.title("TikTok Audio Downloader")

frame = tk.Frame(root)
frame.pack(pady=20)

label = tk.Label(frame, text="Enter TikTok video URL:")
label.pack(side=tk.LEFT)

entry = tk.Entry(frame, width=50)
entry.pack(side=tk.LEFT)

button = tk.Button(frame, text="Download", command=download_tiktok_audio_gui)
button.pack(side=tk.LEFT)

root.mainloop()
