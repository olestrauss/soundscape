import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import UploadForm from './UploadForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload-form" element={<UploadForm />} />
    </Routes>
  );
}

export default App;
