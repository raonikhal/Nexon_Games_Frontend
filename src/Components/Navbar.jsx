import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // npm i lucide-react
import NavMegaMenu from './NavMegaMenu';
import instance from "../../utils/instanceFile";
import { toast } from "react-toastify";
import {Modal} from "antd";
import VideoCard from "./VideoCard";



const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [LoginModal, setLoginModal] = useState(false);
  const [SignupModal, setSignupModal] = useState(false);

  const Navigate = useNavigate();


  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const usertoken = localStorage.getItem("userToken");
    const admintoken = localStorage.getItem("adminToken");

    if (usertoken || admintoken) {
      setisLoggedIn(true);
    }
    else {
      setisLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const res = await instance.get("/v1/logout", { withCredentials: true });
      console.log("Logout Succeeded");
      toast.success("Logout Successfull");
      localStorage.removeItem("userToken");
      Navigate("/login");
      setisLoggedIn(false);
    } catch (error) {
      console.error("error in Logout", error)
    }
  }

  const Loginhandle = () =>{
     setLoginModal(true);
  }

  const Singuphandle = () => {
    setSignupModal(true);
  }


  return (
    <nav className="w-full px-4 md:px-10 py-4 flex items-center justify-between text-white relative bg-black/30 backdrop-blur-sm z-10">

      {/* LEFT - HAMBURGER (MOBILE) */}
      <div className="md:hidden">
        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* CENTER LOGO (MOBILE) | LEFT LOGO (DESKTOP) */}
      <div className="absolute left-1/2 -translate-x-10 md:static md:ml-10">
        <Link to="/" className="text-xl md:text-2xl font-bold">
          NEXON
        </Link>
      </div>

      {/* DESKTOP NAV LINKS */}
      <div className="hidden md:flex">
        <NavMegaMenu />
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex items-center gap-2">

        {isLoggedIn ? (

          <button onClick={handleLogout} className="px-3 py-1 text-xs md:px-5 md:py-2 md:text-base text-white bg-white/20 rounded-sm hover:bg-white/30 hover:scale-110 transition-all duration-300 cursor-pointer">
            Logout
          </button>

        ) : (
          <div className="flex gap-5">
            
              <button onClick={Loginhandle} className="px-3 py-1 text-xs /* MOBILE */ md:px-5 md:py-2 md:text-base   /* DESKTOP */text-white bg-white/20 rounded-sm hover:bg-white/30 hover:scale-110 transition-all duration-300 cursor-pointer" >
                Login
              </button>


              <button onClick={Singuphandle} className="px-3 py-1 text-xs /* MOBILE */ md:px-5 md:py-2 md:text-base   /* DESKTOP */ bg-white text-black rounded-sm hover:bg-gray-400 hover:scale-110 transition-all duration-300 ">
                Signup
              </button>
          </div>
        )
        }
      </div>

      {/* MOBILE SLIDE MENU */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-black z-50 transform ${open ? "translate-x-0" : "-translate-x-full" }  transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">MENU</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 bg-black text-white h-[100vh]">
          <Link to="/cd">Games</Link>
          <Link to="/consoles" >Consoles</Link>
          <Link to="/controllers">Controllers</Link>
        </div>
      </div>


       <Modal
              open={LoginModal}
              footer={null}
              onCancel={() => setLoginModal(false)}
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


            <Modal
              open={SignupModal}
              footer={null}
              onCancel={() => setSignupModal(false)}
              centered
              width={"90%"}
              className="md:w-[800px]! bg-black!"
            >
              <div className="flex flex-col md:flex-row h-auto w-full px-5 gap-5 justify-center items-center">
                <Link to="/adminSignup">
                  <VideoCard video={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732127/Spider-Man_hxquhg.mp4"} title="Signup as Admin" />
                </Link>
      
                <p className="text-3xl text-center md:text-3xl">OR</p>
      
                <Link to="/signup">
                  <VideoCard video={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732127/Spider-Man_hxquhg.mp4"} title="Signup as User" />
                </Link>
              </div>
            </Modal>
    </nav>
  );
};

export default Navbar;

