// src/Home.js
import React, { useState, useEffect } from 'react';
import SongGrid from './SongGrid';
import { useNavigate } from "react-router-dom";

function Home() {
  const [songs, setSongs] = useState([]);

  let navigate = useNavigate();

  const navigateToUploadForm = () => {
    navigate('/upload-form');
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/songs') // Adjust the URL based on your Flask API
      .then(response => response.json())
      .then(data => {
        console.log('Songs fetched:', data);
        setSongs(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return (
    <div>
      <h1>Welcome to Soundscape</h1>
      <button onClick={navigateToUploadForm}>Upload a Song</button>
      <SongGrid songs={songs} />
    </div>
  );
}

export default Home;
