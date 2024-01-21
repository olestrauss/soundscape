import React from 'react';
import './SongGrid.css';

// Create a CSS class to style the images with consistent dimensions
const IMAGE_CLASS = 'song-image';

const SongGrid = ({ songs, onDelete }) => {
  console.log('Songs in SongGrid:', songs);
  
  return (
    <div className="song-grid">
      {songs.map(song => (
        <div key={song.id} className="song">
          {/* Apply the CSS class to the img element */}
          <img src={song.image_uri} alt={song.title} className={IMAGE_CLASS} />
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
          <button onClick={() => onDelete(song.id)} className="delete-button">🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default SongGrid;
