import React from 'react';
import './App.css';
import SongGrid from './SongGrid';

function App() {
  // Temporary placeholder data
  const songs = [
    { id: 1, title: "Song One", artist: "Artist A", coverImageUrl: "url_to_image" },
    { id: 2, title: "Song Two", artist: "Artist B", coverImageUrl: "url_to_image" },
    // Add more songs here
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Soundscape</h1>
      </header>
      <SongGrid songs={songs} />
    </div>
  );
}

export default App;
