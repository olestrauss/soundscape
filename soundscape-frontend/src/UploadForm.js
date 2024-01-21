import React, { useState } from 'react';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [image_URI, setImageURI] = useState('');

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
    formData.append('image_uri', image_URI);

    console.log(formData)

    // Send a POST request to the server to handle the upload
    fetch(`http://localhost:5000/upload-song`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        // Handle the response from the server (e.g., display success message)
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Upload a Song</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={handleTitleChange} /><br />
      <label>Artist:</label>
      <input type="text" value={artist} onChange={handleArtistChange} /><br />
      <label>Image Name:</label>
      <input type="text" value={image_URI} onChange={handleImageURIChange} /><br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
