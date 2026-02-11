
import PS5icon from "../assets/PS5icon.png"
import DUALSENSEicon from "../assets/DUALSENSEicon.png"
import PSicon from "../assets/PSicon.png"
import Rent from "../assets/Rent.jpg"
import { Link } from 'react-router-dom';

function NavMegaMenu() {
  return (
   
    <div className='h-15 w-1 flex items-center justify-center gap-8'> 
      <div className="h-17 w-15 flex flex-col justify-center items-center  hover:border-b-3 border-b-blue-400 duration-300">
        <Link to={"/cd"}> 
          <img src={PSicon} alt="" className="h-12 w-30" />
          <p className="text-white text-[10px]">Games</p>
        </Link>
      </div>

       <div className="h-17 w-15 flex flex-col justify-center items-center hover:border-b-3 border-b-blue-400 duration-300">
        <Link to={"/consoles"}> 
          <img src={PS5icon} alt="" className="h-12 w-22" />
          <p className="text-white text-[10px]">Consoles</p>
        </Link>
      </div>

       <div className="h-17 w-15 flex flex-col justify-center items-center hover:border-b-3 border-b-blue-400 duration-300">
        <Link to={"/controllers"}> 
          <img src={DUALSENSEicon} alt="" className="h-12 w-22" />
          <p className="text-white text-[10px]">Controllers</p>
        </Link>
      </div>

       <div className="h-17 w-40 flex flex-col justify-center items-center hover:border-b-3 border-b-blue-400 duration-300">
        <Link to={"/rent"}> 
          <img src={Rent} alt="" className="h-12 w-40" />
          <p className="text-white text-[10px]">Rent</p>
        </Link>
      </div>

       {/* <div className="h-17 w-15 flex flex-col justify-center items-center hover:border-b-3 border-b-blue-400 duration-300">
        <Link> 
          <img src={PS5icon} alt="" className="h-12 w-22" />
          <p className="text-white text-[10px]">About us</p>
        </Link>
      </div> */}

    </div>
  );
}

export default NavMegaMenu;