// src/Home.js
import React, { useState, useEffect } from 'react';
import SongGrid from './SongGrid';
import { useNavigate } from "react-router-dom";
import AudioPlayerBottom from './AudioPlayerBottom';
import './button-50.css';

function Home() {
  const [currentSong, setCurrentSong] = useState('');
  const [songs, setSongs] = useState([]);

  let navigate = useNavigate();

  const navigateToUploadForm = () => {
    navigate('/upload-form');
  }

  const handleSongSelect = (songUrl) => {
    setCurrentSong(songUrl);
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
  
  const handleDelete = (songId) => {
    fetch(`http://localhost:5000/api/songs/${songId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // If delete was successful, update the state to remove the song
      setSongs(songs => songs.filter(song => song.id !== songId));
    })
    .catch(error => {
      console.error('Error deleting song:', error);
    });
  };
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>  
        <img src="/soundscape_logo.png" alt="logo" width="300" height="150"></img>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className='button-50' onClick={navigateToUploadForm}>Upload a Song</button>
      </div>
      <SongGrid songs={songs} onDelete={handleDelete} onSongSelect={handleSongSelect} />
      <AudioPlayerBottom src={currentSong}/>
    </div>
  );
}

export default Home;
