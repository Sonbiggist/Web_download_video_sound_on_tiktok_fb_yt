import os
import yt_dlp as youtube_dl
from flask import Flask, render_template, request, send_file, abort, send_from_directory, url_for

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/open_tiktok', methods=['POST'])
def open_tiktok():
    user_url = request.form.get('user_url')
    if user_url:
        return render_template('index.html', url=user_url)
    else:
        return render_template('index.html', error="Please enter a TikTok user URL.")

@app.route('/download', methods=['POST'])
def download():
    video_url = request.form.get('video_url')
    option = request.form.get('option')

    if not video_url:
        return render_template('index.html', error="Please enter a TikTok video URL.")
    
    # Đặt đường dẫn lưu mặc định
    save_path = 'downloads/%(title)s.%(ext)s'

    download_url = handle_download(video_url, option, save_path)
    
    if download_url:
        return render_template('index.html', download_url=download_url)
    else:
        return render_template('index.html', error="An error occurred while processing your request.")

def handle_download(video_url, option, save_path):
    download_dir = 'D:/Web/downloads'
    if not os.path.isdir(download_dir):
        os.makedirs(download_dir, exist_ok=True)
    
    save_path = os.path.join(download_dir, '%(title)s.%(ext)s')
    
    ydl_opts = {
        'outtmpl': save_path,
        'ffmpeg_location': 'D:/Music/ffmpeg-master-latest-win64-gpl/ffmpeg-master-latest-win64-gpl/bin',
        'noplaylist': True,
    }
    
    if option == 'audio':
        ydl_opts.update({
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        })

    elif option == 'video_no_audio':
        ydl_opts.update({
            'format': 'bestvideo',
            'noplaylist': True,
        })
    
    try:
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(video_url, download=True)
            ext = 'mp3' if option == 'audio' else info_dict['ext']
            filename = f"{info_dict['title']}.{ext}"
            return url_for('download_file', filename=filename)
    except Exception as e:
        return None



@app.route('/adjust', methods=['GET'])
def adjust():
    return send_from_directory('templates', 'Adjust.html')

@app.route('/merge-files', methods=['POST'])
def merge_files():
    files = request.files.getlist('files')
    merged_file_path = 'merged_file.mp4'  # Thay đổi đường dẫn tệp nếu cần
    return send_from_directory('', merged_file_path)



if __name__ == '__main__':
    app.run(debug=True)
