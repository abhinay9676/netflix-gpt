import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
<div className="w-screen h-screen absolute top-0 left-0 text-white flex items-center px-24 bg-gradient-to-br from-black/80 via-transparent to-transparent">
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold mb-6">{title}</h1>
        <p className="text-lg mb-6 line-clamp-4">{overview}</p>
        <div className="flex space-x-4">
          <button className="bg-white text-black py-3 px-8 text-xl rounded-lg hover:bg-gray-300 transition">
            ▶️ Play
          </button>
          <button className="bg-gray-500 text-white py-3 px-8 text-xl bg-opacity-60 rounded-lg hover:bg-opacity-80 transition">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
