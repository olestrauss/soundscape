import React from 'react';

const SongGrid = ({ songs }) => {
  return (
    <div className="song-grid">
      {songs.map(song => (
        <div key={song.id} className="song">
          <img src={song.coverImageUrl} alt={song.title} />
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default SongGrid;
