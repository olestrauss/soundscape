import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const navigate = useNavigate();

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
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
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (response.headers.get("content-type").includes("application/json")) {
        return response.json();
      }
      return response.text();
    })
    .then(data => {
      console.log('Success:', data);
      navigate('/');
    })
    .catch(error => {
      console.error('Error during upload:', error);
    });
  };

  return (
    <div>
      <h1>Upload a Song</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      
      <label>Artist:</label>
      <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} /><br />
      
      <label>Cover Image:</label>
      <input type="file" accept="image/jpeg, image/png" onChange={handleCoverImageChange}  /><br />
      
      <label>Song File:</label>
      <input type="file" accept=".mp3, .wav" onChange={handleAudioFileChange} /><br />
      
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
