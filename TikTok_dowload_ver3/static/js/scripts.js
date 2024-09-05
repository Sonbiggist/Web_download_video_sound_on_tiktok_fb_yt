document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("play_button");
  const modal = document.getElementById("video_modal");
  const closeButton = document.querySelector(".close");
  const videoPlayer = document.getElementById("video_player");

  function downloadVideo() {
    var form = document.getElementById("downloadForm");
    var formData = new FormData(form);

    fetch("/download", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("result").innerHTML = data;
      })
      .catch((error) => console.error("Error:", error));
  }

  // Lấy phần tử audio, nút play, và lớp overlay
  var audio = document.getElementById("audio");
  var audioButton = document.getElementById("audio-player");
  var overlay = document.getElementById("overlay");

  // Khi người dùng nhấn vào overlay (hoặc bất kỳ đâu), kích hoạt âm thanh và ẩn overlay
  overlay.addEventListener("click", function () {
    audioButton.click(); // Giả lập click vào nút Play
    overlay.classList.add("hidden"); // Ẩn overlay sau khi click
  });

  // Khi người dùng nhấn vào nút Play, phát hoặc dừng âm thanh
  audioButton.addEventListener("click", function () {
    if (audio.paused) {
      audio.play(); // Phát âm thanh
      audioButton.textContent = "Pause"; // Đổi tên nút thành Pause
    } else {
      audio.pause(); // Dừng âm thanh
      audioButton.textContent = "Play"; // Đổi tên nút thành Play
    }
  });

  playButton.addEventListener("click", () => {
    const videoUrl = document.getElementById("video_url").value;
    if (videoUrl) {
      let embedUrl;
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        // YouTube: Convert to embed URL
        if (videoUrl.includes("youtube.com/watch?v=")) {
          const videoId = new URL(videoUrl).searchParams.get("v");
          embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (videoUrl.includes("youtu.be/")) {
          const videoId = videoUrl.split("youtu.be/")[1];
          embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else {
          alert("Invalid YouTube URL");
          return;
        }
      } else if (videoUrl.includes("facebook.com/watch")) {
        // Facebook: Use Facebook's embed format
        embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          videoUrl
        )}&show_text=0&width=560`;
      } else if (videoUrl.includes("tiktok.com")) {
        // TikTok: Attempt to use TikTok's embed format
        const videoId = videoUrl.split("/").pop();
        embedUrl = `https://www.tiktok.com/embed/${videoId}`;
      } else {
        alert("Unsupported video URL");
        return;
      }
      videoPlayer.src = embedUrl; // Set the iframe source
      modal.style.display = "block"; // Show the modal
    } else {
      alert("Please enter a video URL.");
    }
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
    videoPlayer.src = ""; // Stop the video
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"; // Hide the modal if clicked outside
      videoPlayer.src = ""; // Stop the video
    }
  });
});
