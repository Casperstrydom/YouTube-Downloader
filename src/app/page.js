"use client";
import React, { useState } from "react";
import axios from "axios";
import './globals.css';


const Home = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDownload = async (type) => {
    try {
      const loaderId = type === 'video' ? 'loadButton1' : 'loadButton2';
      const loader = document.getElementById(loaderId);
      loader.style.display = 'block';

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/download`, // Use NEXT_PUBLIC_API_URL
        { url: inputValue, type },
        { responseType: 'blob' }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `file.${type === 'audio' ? 'mp3' : 'mp4'}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Failed to download file:', response.statusText);
      }
      loader.style.display = 'none';
    } catch (error) {
      console.error('Error downloading file:', error.response ? error.response.data : error.message);
      const loader = document.getElementById(type === 'video' ? 'loadButton1' : 'loadButton2');
      if (loader) loader.style.display = 'none';
    }
  };

  const [showForm, setShowForm] = useState(false);

  const handleSubscribeClick = () => {
    setShowForm(!showForm);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="Mp4 YouTube Downloader">
        <div className="Mp4-1">DC YouTube Downloader</div>
        <div className="container1">
          <input
            className="input-box"
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Insert URL..."
          />
        </div>
        <div>
          <div className="button-1">
            <button className="button-85-1" role="button" onClick={() => handleDownload('video')}>
              <span className="text">Mp4</span>
              <div id="loadButton1" className="center1" style={{ display: 'none' }}>
                Downloading...
              </div>
            </button>
          </div>
          <div className="button-2">
            <button className="button-85-2" role="button" onClick={() => handleDownload('audio')}>
              <span className="text">Mp3</span>
              <div id="loadButton2" className="center2" style={{ display: 'none' }}>
                Downloading...
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
