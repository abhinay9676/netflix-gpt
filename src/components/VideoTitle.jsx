import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0">
        <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;






// import React from 'react';

// const VideoTitle = ({ title, overview }) => {
//   return (
// <div className="w-screen h-screen absolute top-0 left-0 text-white flex items-center px-24 bg-gradient-to-br from-black/80 via-transparent to-transparent">
//       <div className="max-w-xl">
//         <h1 className="text-5xl font-bold mb-6">{title}</h1>
//         <p className="text-lg mb-6 line-clamp-4">{overview}</p>
//         <div className="flex space-x-4">
//           <button className="bg-white text-black py-3 px-8 text-xl rounded-lg hover:bg-gray-300 transition">
//             ▶️ Play
//           </button>
//           <button className="bg-gray-500 text-white py-3 px-8 text-xl bg-opacity-60 rounded-lg hover:bg-opacity-80 transition">
//             More Info
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoTitle;
