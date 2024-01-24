// UploadPreview.js

import React from 'react';
import './UploadPreview.css';

const SongPreview = ({ title, artist, coverImageUrl }) => {
  return (
    <div className="preview-song-card">
      <div className="preview-song-image-container">
        <img src={coverImageUrl} alt="" className="preview-song-image" />
      </div>
      <h3 className="preview-song-title">{title}</h3>
      <p className="preview-song-info">{artist}</p>
    </div>
  );
};

export default SongPreview;
