import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const IntroMask = ({onFinish}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPage, setShowPage] = useState(false);

  const imageRef = useRef(null);

  useGSAP(() => {
    if (!imageLoaded) return;  // run only after image loads

    const tl = gsap.timeline();

    tl.fromTo(".mask-text",{
       scale: 1, 
      },

      {
        scale: 45,
        duration: 7,     
        ease: "expo.inOut",
        onComplete: () => {setShowPage(true), onFinish()}
      }
    );
  }, [imageLoaded]); // run after image loads

  return (
    <div className="overflow-hidden">

      {!imageLoaded && (
        <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center text-white">
          Loading...
        </div>
      )}

      {/* INTRO MASK AFTER IMAGE LOAD */}
      {!showPage && (
        <div className="fixed inset-0 z-[10] bg-black">

          {/* BACKGROUND IMAGE */}
          <img ref={imageRef} src={"https://res.cloudinary.com/dguejsskq/image/upload/v1769764610/Tekken_m7yfva.png"} onLoad={() => setImageLoaded(true)} className="absolute inset-0 h-full w-full object-cover overflow-hidden"
          />

          {/* SVG MASK */}
          {imageLoaded && (

            <svg className="absolute inset-0 w-full h-full mask-text" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <mask id="text-mask">
                  {/* White = cover whole screen */}
                  <rect width="100" height="100" fill="white" />

                  {/* Black text = transparent hole */}
                  <text x="50" y="60" textAnchor="middle" fill="black" fontSize="20" fontWeight="900" letterSpacing="1" minantBaseline="middle"
                  >
                    NEXON
                  </text>
                </mask>
              </defs>

              {/* block that uses mask */}
              <rect width="100" height="100" fill="black" mask="url(#text-mask)" />
            </svg>

          )}

        </div>
      )}
    </div>
  );
};

export default IntroMask;



