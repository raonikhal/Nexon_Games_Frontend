
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import HomeCarousel from '../Components/HomeCarousel';
import bannerData from './../Components/bannerData';
import Model3dController from './../Components/Model3dController';
import Navbar from './../Components/Navbar';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);


const HomePage = () => {


  const VI_ref = useRef(null);
  const CHAR_ref = useRef(null);
  const REL_ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(VI_ref.current, {
      opacity: 0,
      scale: 0.5,
    },
      {
        opacity: 1,
        scale: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: VI_ref.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      })

    gsap.fromTo(CHAR_ref.current, {
      opacity: 0,
      y: 80
    },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: CHAR_ref.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      })

    gsap.fromTo(REL_ref.current, {
      opacity: 0,
      y: 50
    },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: REL_ref.current,
          scrub: true
        }
      })
  });


  return (
    <div className="bg-black text-white w-full overflow-x-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO / CAROUSEL */}
      <HomeCarousel />

      {/* SECTION 1 – Consoles & Accessories */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Consoles & Accessories
            </h1>
            <p className="text-gray-400 text-lg">
              Experience next-gen gaming with premium consoles, controllers, and accessories.
              Power, performance, and perfection — all in one place.
            </p>

            <Link to={"/consoles"} className="w-fit px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:scale-105 transition cursor-pointer">
              Explore Now
            </Link>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-disc-console-featured-hardware-image-block-02-en-15nov23?$1600px$"
              alt="PS5 Console"
              className="max-h-[420px] object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            />
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT – Yellow Background Box */}
          <div className="h-80 md:h-[400px] w-full bg-yellow-400 rounded-2xl shadow-2xl overflow-hidden">
            <Model3dController />
          </div>

          {/* RIGHT – Text Content */}
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-bold">
              Next-Gen Gaming Experience
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Discover a smarter way to play.
              High-quality controllers, Actionable Triggers, and adaptive feedback
              for an immersive gaming experience like never before.
            </p>

            <p className="text-gray-500">
              Built for performance. Trusted by gamers.
            </p>

            <Link to={"/controllers"} className="w-fit px-7 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:scale-105 transition pointer-cursor">
              Learn More
            </Link>
          </div>

        </div>
      </section>


      {/* SECTION 2 – Games */}
      <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center py-10">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col gap-6">
          <h2 className="text-4xl font-bold">
            Latest & Trending Games
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Rent or buy top-rated titles at affordable prices.
            AAA games, classics, and multiplayer favorites — all available.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 cursor-pointer">
            {bannerData.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-xl p-6 hover:scale-105 transition shadow-lg">
                <div className="h-40 bg-gray-700 rounded-lg mb-4">
                  <img src={item.image} alt="" />
                </div>
                <h3 className="text-xl font-semibold mt-8">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2"> High-quality graphics & immersive gameplay. </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>

      </section>


=      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <img src={"https://res.cloudinary.com/dguejsskq/image/upload/v1769764469/background_uqcmra.png"} alt="Background" className="absolute inset-0 w-full h-full object-cover" />

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <img src={"https://res.cloudinary.com/dguejsskq/image/upload/v1769764474/GTA_Logo_bdierb.png"} alt="GTA Logo" ref={VI_ref} className="w-full h-full  mb-4"/>
            <img src={"https://res.cloudinary.com/dguejsskq/image/upload/v1769764472/characters_dcimuy.png"} alt="Characters" ref={CHAR_ref} className="absolute inset-0 w-full h-full object-cover z-10" />
            <img src={"https://res.cloudinary.com/dguejsskq/image/upload/v1769764644/GTA_RELEASE_vglc8a.png"} alt="GTA Release" ref={REL_ref} className="w-[220px] sm:w-[280px] md:w-[340px] h-auto bg-black/70 backdrop-blur-md rounded-3xl px-4 py-2 mb-10 z-11" />
        </div>
      </section>


      {/* SECTION 3 – Rent System */}
      <section className="min-h-screen flex items-center bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <div>
            <div className="h-80 w-full bg-black rounded-2xl shadow-2xl flex justify-center">
              <img src={"https://res.cloudinary.com/dguejsskq/image/upload/v1769764491/RentPlayReturn_wbgdph.png"} alt="" className='h-full w-100' />
            </div>
          </div>

          {/* TEXT */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">
              Rent. Play. Return.
            </h2>
            <p className="text-gray-400 text-lg">
              No need to buy expensive games. Rent for a few days,
              complete the game, and switch to the next one.
            </p>

            <ul className="text-gray-300 space-y-2">
              <li>✔ Affordable daily pricing</li>
              <li>✔ Secure deposit system</li>
              <li>✔ Verified game condition</li>
            </ul>

            <Link to={"/rent"} className="w-fit px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition pointer-cursor">
              Start Renting
            </Link>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center items-center">
          <h1 className="text-gray-400 text-sm">
            © 2024 GameVerse. All rights reserved.
          </h1>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
