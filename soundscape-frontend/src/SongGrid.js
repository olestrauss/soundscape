// SongGrid.js
import React from 'react';
import './SongGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SongGrid = ({ songs, onDelete, onSongSelect }) => {
  return (
    <div className="song-grid-bg">
      <div className="song-grid">
        {songs.map(song => (
          <div key={song.id} className="song-card">
            <div className="song-image-container" onClick={() => onSongSelect(`http://localhost:5000/api/media/audio/${song.id}`)}>
              <img 
                src={`http://localhost:5000/api/media/covers/${song.id}`}
                alt={song.title} 
                className="song-image"
              />
            </div>
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <div className="artist-delete-container">
                <p className="song-artist">{song.artist}</p>
                <button onClick={() => onDelete(song.id)} className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SongGrid;