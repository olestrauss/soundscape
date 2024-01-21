import React, { useState } from 'react';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    // Create a FormData object to send the form data to the server
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('song', file);

    // Send a POST request to the server to handle the upload
    fetch('/upload', {
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
      <label>Select a Song:</label>
      <input type="file" accept=".mp3,.wav" onChange={handleFileChange} /><br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
