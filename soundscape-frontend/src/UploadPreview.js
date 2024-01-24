// UploadPreview.js

import React from 'react';

const SongPreview = ({ title, artist, coverImageUrl }) => {
  return (
    <div className="song-card">
      <div className="song-image-container">
        <img src={coverImageUrl} alt="" className="song-image" />
      </div>
      <h3 className="song-title">{title}</h3>
      <p className="song-info">{artist}</p>
    </div>
  );
};

export default SongPreview;
