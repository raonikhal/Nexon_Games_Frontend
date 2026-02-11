import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // npm i lucide-react
import NavMegaMenu from './NavMegaMenu';
import instance from "../../utils/instanceFile";
import { toast } from "react-toastify";
import { Modal } from "antd";
import VideoCard from "./VideoCard";
import PS5icon from "../assets/PS5icon.png"
import DUALSENSEicon from "../assets/DUALSENSEicon.png"
import PSicon from "../assets/PSicon.png"


const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const [LoginModal, setLoginModal] = useState(false);
  const [SignupModal, setSignupModal] = useState(false);


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
      localStorage.removeItem("adminToken");
      setisLoggedIn(false);
    } catch (error) {
      console.error("error in Logout", error)
    }
  }

  const Loginhandle = () => {
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
      <div className="hidden md:flex gap-5">
        <div className="h-17 w-11 flex flex-col justify-center items-center  hover:border-b-3 border-b-blue-400 duration-300 text-center">
          <Link to={"/gamespost"}>
            <img src={PSicon} alt="" className="h-12 w-20" />
            <p className="text-white text-[10px]">Games</p>
          </Link>
        </div>

        <div className="h-17 w-15 flex flex-col justify-center items-center hover:border-b-3 border-b-blue-400 duration-300 text-center">
          <Link to={"/consolespost"}>
            <img src={PS5icon} alt="" className="h-12 w-22" />
            <p className="text-white text-[10px]">Consoles</p>
          </Link>
        </div>

        <div className="h-17 w-11 flex flex-col justify-center items-center hover:border-b-3 border-b-blue-400 duration-300 text-center">
          <Link to={"/controllerspost"}>
            <img src={DUALSENSEicon} alt="" className="h-12 w-22" />
            <p className="text-white text-[10px]">Controllers</p>
          </Link>
        </div>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex items-center gap-2">

        {isLoggedIn ? (

          <button onClick={handleLogout} className="px-3 py-1 text-xs md:px-5 md:py-2 md:text-base text-white bg-white/20 rounded-sm hover:bg-white/30 hover:scale-110 transition-all duration-300 cursor-pointer">
            Logout
          </button>

        ) : (
          <div className="flex flex-col gap-2 md:flex-row">

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
      <div className={`fixed top-0 left-0 h-full w-64 bg-black z-50 transform ${open ? "translate-x-0" : "-translate-x-full"}  transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">MENU</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 bg-black text-white h-[100vh]">
          <Link to="/gamespost">Games</Link>
          <Link to="/consolespost" >Consoles</Link>
          <Link to="/controllerspost">Controllers</Link>
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
        width="90%"
        className="md:w-[800px]! bg-black!"
        bodyStyle={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[400px] w-full px-5 gap-5 justify-center items-center">
          <Link to="/adminSignup">
            <VideoCard video={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732159/Iron-Man_b3k98k.mp4"} title="Signup as Admin" />
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

export default AdminNavbar;

