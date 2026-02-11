import { forwardRef } from "react";

const VideoBackground = forwardRef(({ src }, ref) => (
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    src={src}
    ref={ref}
    autoPlay
    loop
    muted
    playsInline
  />
));

export default VideoBackground;
