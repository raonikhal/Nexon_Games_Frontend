import { useGSAP } from "@gsap/react";
import { Modal } from "antd";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PS5 from "../assets/PS5.png";
import XBOX from "../assets/XBOX.png";
import VideoBackground from "../Components/VideoBackground";
import VideoCard from './../Components/VideoCard';
import StarBorder from "../Components/StarBorder";
import { Autoplay } from 'swiper/modules';
import AdminNavbar from "../Components/AdminNavbar";
import RotatingText from "../Components/RotatingText";



const GettingStarted = () => {

  const videoref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.fromTo(
      videoref.current,
      { opacity: 0 },
      { opacity: 1, duration: 3, ease: "power2.out" }
    );

    tl.fromTo(".Welcome_text",
      { opacity: 0, y: 30 },
      { opacity: 1, duration: 3, y: 0 }
    );

    tl.fromTo(".Subtext",
      { opacity: 0, y: 30 },
      { opacity: 1, duration: 1, y: 0 }
    );
  }, []);

  return (
    <>
      <div className="h-screen w-full">
        <div className="Homesection h-screen w-full relative overflow-hidden">

          <VideoBackground src={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732140/DJ_1_eh6ssr.mp4"} ref={videoref} />

          <div className="relative z-10">

            {/* NAVBAR */}
            <AdminNavbar />
            {/* TEXT SECTION */}
            <div className="flex flex-col max-w-[90%] md:max-w-[400px] w-full md:w-1/3 ml-5 md:ml-20 mt-10 md:mt-15 text-sm md:text-base lg:text-lg">
              <h1 className="font-bold text-white text-4xl md:text-7xl Welcome_text">
                WELCOME
              </h1>

              <h1 className="font-bold text-white text-2xl md:text-4xl Subtext">
                To the World of
              </h1>

              <div className="w-100 bg-transparent flex justify-start items-center">

                <RotatingText
                  texts={['₲₳Mł₦₲', '₳₵₮łØ₦', '₳ĐVɆ₦₮ɄⱤɆ', '฿₳₮₮ⱠɆ₲ⱤØɄ₦Đ']}
                  mainClassName="px-2 sm:px-2 md:px-3 font-extrabold text-cyan-300 text-2xl md:text-4xl overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </div>

            {/* IMAGES + BUTTON */}
            <div className="w-full mt-60 md:mt-30 flex flex-col justify-center items-center">

              <div className="flex items-center justify-center pt-5 md:pt-10 gap-5">
                <img src={PS5} className="h-10 w-20 md:h-16 md:w-32" />
                <img src={XBOX} className="h-14 w-24 md:h-24 md:w-36" />
              </div>

              <div onClick={() => setOpen(true)} className="w-auto md:w-56 h-10 flex justify-center items-center rounded-2xl p-3 md:p-4 hover:scale-105 duration-300 cursor-pointer mt-1">
                <StarBorder as="button" className="custom-class" color="cyan" speed="3s" thickness={4}>
                  <p>GET STARTED</p>
                </StarBorder>
              </div>

            </div>


          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        centered
        width={"90%"}
        className="md:w-[800px]! bg-black!"
      >
        <div className="flex flex-col md:flex-row h-auto w-full px-5 gap-5 justify-center items-center">
          <Link to="/admin">
            <VideoCard video={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732159/Iron-Man_b3k98k.mp4"} title="Admin Login" />
          </Link>

          <p className="text-3xl text-center md:text-3xl">OR</p>

          <Link to="/login">
            <VideoCard video={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732127/Spider-Man_hxquhg.mp4"} title="User Login" />
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default GettingStarted;






