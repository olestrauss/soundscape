import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [imageURI, setImageURI] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const handleImageURIChange = (e) => {
    setImageURI(e.target.value);
  };

  const handleUpload = () => {
    // Create a FormData object to send the form data to the server
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('image_uri', imageURI);

    // Send a POST request to the server to handle the upload
    fetch(`http://localhost:5000/upload-song`, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Redirect to the home page after upload is complete
      navigate('/');
    })
    .catch(error => {
      console.error('Error during upload:', error);
      // Optionally, handle the error state here
    });
  };

  return (
    <div>
      <h1>Upload a Song</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={handleTitleChange} /><br />
      <label>Artist:</label>
      <input type="text" value={artist} onChange={handleArtistChange} /><br />
      <label>Image URI:</label>
      <input type="text" value={imageURI} onChange={handleImageURIChange} /><br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
