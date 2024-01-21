// src/Home.js
import React, { useState, useEffect } from 'react';
import SongGrid from './SongGrid';

function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs') // Adjust the URL based on your Flask API
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to Soundscape</h1>
      <SongGrid songs={songs} />
    </div>
  );
}

export default Home;
