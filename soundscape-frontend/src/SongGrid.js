import React from 'react';
import './SongGrid.css';
import 'react-h5-audio-player/lib/styles.css';

const IMAGE_CLASS = 'song-image';



const SongGrid = ({ songs, onDelete, onSongSelect }) => {
  return (
    <div className="song-grid">
      {songs.map(song => (
        <div key={song.id} className="song">
          <img 
            src={`http://localhost:5000/api/media/covers/${song.id}`}
            alt={song.title} 
            onClick={() => onSongSelect(`http://localhost:5000/api/media/audio/${song.id}`)}
            className={IMAGE_CLASS} 
          /> 
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
          <button onClick={() => onDelete(song.id)} className="delete-button">🗑️</button>     
          {/* Rest of the song details */}
        </div>
      ))}
    </div>
  );
};

export default SongGrid;
