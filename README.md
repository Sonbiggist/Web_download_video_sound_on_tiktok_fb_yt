# Welcome to My World! 🌟

![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%23FF5733&size=30&center=true&vCenter=true&width=700&height=70&lines=Hello%2C+I'm+Xuân+Sơn!;Welcome+to+my+GitHub!;Let's+create+something+amazing!)

## 👋 Hello, I'm **Xuân Sơn!**

![Profile Badge](https://img.shields.io/badge/NEU-Computer_Science-blueviolet?style=for-the-badge&logo=github)

I'm currently a **Computer Science** student at the **National Economics University (NEU)**. 

🎨 **Passionate** about the intersection of technology and creativity, I enjoy:
- Exploring new ways to solve problems through code.
- Developing web applications.
- Diving into data.
- Experimenting with game development.

Join me on this exciting journey as I **build, learn, and share** my projects with the world. Let's create something **amazing** together!

![Coder GIF](https://media.giphy.com/media/L8K62iTDkzGX6/giphy.gif)

# TikTok Video Downloader Web App

## Overview

This project is a web application built with **Flask** that allows users to download TikTok videos and audio. The app provides options to download the full video, video without audio, or audio-only in MP3 format. Additionally, users can upload and concatenate MP3 files.

## Features

- **Download TikTok Videos**: 
  - Users can input a TikTok video URL and choose between downloading:
    - Full video (with audio)
    - Video without audio
    - Audio only (MP3)
    
- **TikTok User Video List**:
  - Users can input a TikTok username, open the user’s page in a popup modal, and select videos to download.
  
- **Concatenate MP3 Files**:
  - Upload multiple MP3 files, concatenate them, and download the combined audio file.

- **Custom Save Path**:
  - File dialog allows users to choose the save path for downloads, with automatic filename generation.

- **Background Music**:
  - The web app features background music that plays automatically upon first interaction and loops continuously.

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Dependencies**:
  - `youtube_dl` for handling TikTok downloads
  - `ffmpeg` for video/audio processing
  - `gunicorn` for deploying the app
  - `Flask-WTF` for form handling

## Project Structure

```plaintext
.
├── app.py                  # Main Flask app
├── static/                 # Static files (CSS, JavaScript, images, audio)
│   ├── css/
│   ├── js/
│   ├── img/
│   └── audio/
├── templates/              # HTML templates
│   └── index.html
├── downloads/              # Folder where downloads are saved
├── requirements.txt        # Python dependencies
└── Procfile                # Heroku deployment file
