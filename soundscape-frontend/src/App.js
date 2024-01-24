// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css'; 
import UploadForm from './UploadForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-form" element={<UploadForm />} />
      </Routes>
    </div>
  );
}

export default App;
