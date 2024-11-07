import React from 'react';

const Videoplayback = ({ autoPlay = true, muted = true }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <video
        src='Video Editor Showreel _ Portfolio _ 2023 _ video editor showreel portfolio.mp4'
        autoPlay={autoPlay}
        muted={muted}
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Videoplayback;
