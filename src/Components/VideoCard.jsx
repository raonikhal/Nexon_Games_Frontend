

const VideoCard = ({ video, title }) => {
  return (
    <div className="relative h-100 w-80 rounded-xl overflow-hidden hover:scale-105 duration-500">
      
      {/* Background Video */}
      <video
        src={video}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text */}
      <div className="relative z-10 h-full flex justify-center items-center">
        <h2 className="text-2xl text-white font-bold">{title}</h2>
      </div>

    </div>
  );
};


export default VideoCard;
