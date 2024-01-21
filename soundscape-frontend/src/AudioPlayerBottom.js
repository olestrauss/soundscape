// AudioPlayerBottom.js

import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayerBottom = ({ src }) => {
  return (
    <div className="audio-player-bottom">
      <AudioPlayer src={src} autoPlay />
    </div>
  );
};

export default AudioPlayerBottom;
