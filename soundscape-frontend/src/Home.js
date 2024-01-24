// src/Home.js

import React, { useState, useEffect } from 'react';
import SongGrid from './SongGrid';
import AudioPlayerBottom from './AudioPlayerBottom';
import './button-50.css';
import Navbar from './NavBar'; 

function Home() {
  const [currentSong, setCurrentSong] = useState('');
  const [songs, setSongs] = useState([]);

  const handleSongSelect = (songUrl) => {
    setCurrentSong(songUrl);
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/songs') 
      .then(response => response.json())
      .then(data => {
        console.log('Songs fetched:', data);
        setSongs(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const handleDelete = (songId) => {
    fetch(`http://localhost:5000/api/songs/${songId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSongs(songs => songs.filter(song => song.id !== songId));
    })
    .catch(error => {
      console.error('Error deleting song:', error);
    });
  };
  
  return (
    <div>
      <Navbar /> 
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <img src="logo.png" alt="Logo" width="300" height="125"/>
      </div>
      <SongGrid songs={songs} onDelete={handleDelete} onSongSelect={handleSongSelect} />
      <AudioPlayerBottom src={currentSong}/>
    </div>
  );
}

export default Home;
