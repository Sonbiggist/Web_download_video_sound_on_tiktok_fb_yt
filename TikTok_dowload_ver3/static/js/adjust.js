document
  .getElementById("upload-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const fileInput = document.getElementById("file-input");
    const files = fileInput.files;

    if (files.length === 0) {
      alert("Please select one or more files.");
      return;
    }

    const progress = document.getElementById("progress");
    progress.innerText = "Merging files...";

    // Create a FormData object to send the files to the server
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    fetch("/merge-files", {
      // Replace '/merge-files' with your actual server endpoint
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "merged_file.mp4"; // You can change the name based on your requirements
        a.click();
        URL.revokeObjectURL(url);
        progress.innerText = "Download completed!";
      })
      .catch((error) => {
        console.error("Error:", error);
        progress.innerText = "An error occurred during the merge.";
      });
  });
