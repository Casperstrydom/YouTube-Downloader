require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route handler for downloading files
app.post("/download", (req, res) => {
  const { url, type } = req.body;
  if (!url || !type) {
    return res.status(400).send("URL and type are required");
  }

  const filename = type === 'audio' ? 'downloaded_audio.mp3' : 'downloaded_video.mp4';
  const filePath = path.join(__dirname, filename);
  const pythonProcess = spawn('python3', ['download.py', url, type]);

  pythonProcess.on('exit', (code) => {
    console.log(`Python process exited with code ${code}`);
    if (code === 0) {
      // Check if file exists
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error(`File not found: ${filePath}`);
          return res.status(404).send('File not found');
        }

        // Stream the file if it exists
        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', type === 'audio' ? 'audio/mp3' : 'video/mp4');
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      });
    } else {
      res.status(500).send("Error downloading file");
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
});

// Route handler for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the download API. Send a POST request to /download to download a file.");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
