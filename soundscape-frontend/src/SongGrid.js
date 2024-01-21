import React from 'react';
import './SongGrid.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const IMAGE_CLASS = 'song-image';

const SongGrid = ({ songs, onDelete }) => {
  return (
    <div className="song-grid">
      {songs.map(song => (
        <div key={song.id} className="song">
          {/* Construct the relative path for the cover image */}
          <img 
            src={`http://localhost:5000/api/media/covers/${song.id}`}
            alt={song.title} 
            className={IMAGE_CLASS} 
          />
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
          {/* Construct the relative path for the audio file */}
          <AudioPlayer
            src={`http://localhost:5000/api/media/audio/${song.id}`}
            onPlay={e => console.log("onPlay")}
            // Additional audio player props here
          />
          <button onClick={() => onDelete(song.id)} className="delete-button">🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default SongGrid;
