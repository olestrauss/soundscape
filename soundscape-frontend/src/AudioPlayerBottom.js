// AudioPlayerBottom.js

import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayerBottom.css';

const AudioPlayerBottom = ({ src }) => {
  return (
    <div className="audio-player-bottom">
      <AudioPlayer src={src} volume={.2} showJumpControls={false} showSkipControls/>
    </div>
  );
};

export default AudioPlayerBottom;
