// UploadForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadForm.css';
import Navbar from './NavBar';
import UploadPreview from './UploadPreview'; 

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageUrl, setImageUrl] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const navigate = useNavigate();

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handlePreviewURLImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageChange = (e) => {
    handleCoverImageChange(e);
    handlePreviewURLImage(e);
  };

  const handleAudioFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('cover_image', coverImage); 
    formData.append('audio_file', audioFile);

    fetch(`http://localhost:5000/upload-song`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (response.headers.get('content-type').includes('application/json')) {
          return response.json();
        }
        return response.text();
      })
      .then((data) => {
        console.log('Success:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during upload:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="upload-page">
        <div className="upload-container">
          <div className="upload-preview">
            <UploadPreview title={title} artist={artist} coverImageUrl={coverImageUrl} />
          </div>
          <div className="upload-form">
            <h1>Upload a Song</h1>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
  
            <div className="form-group">
              <label>Artist:</label>
              <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
            </div>
  
            <div className="form-group">
              <label>Cover Image:</label>
              <div className="custom-file-input">
                <label className="custom-button">
                  <span>Browse</span>
                  <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
                </label>
              </div>
            </div>
  
            <div className="form-group">
              <label>Song File:</label>
              <div className="custom-file-input">
                <label className="custom-button">
                  <span>Browse</span>
                  <input type="file" accept=".mp3, .wav" onChange={handleAudioFileChange} />
                </label>
              </div>
            </div>
  
            <div className="form-group">
              <button onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
export default UploadForm;