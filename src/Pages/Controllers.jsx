import { useEffect, useState } from "react";
import Navbar from "./../Components/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import instance from './../../utils/instanceFile';

const Controllers = () => {
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [controllers, setControllers] = useState([]);

  // FILTER CONTROLLERS (SAFE)
  const filteredControllers = controllers.filter((controller) =>
    controller.remoteName.toLowerCase().includes(search.toLowerCase())
  );

  // FETCH CONTROLLERS
  const fetchControllers = async () => {
    try {
      const res = await instance.get("/v1/getRemotes");
      setControllers(res.data.remotes || []);
    } catch (err) {
      console.error("Failed to fetch controllers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchControllers();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black">
      <Navbar />

      {/* TOP BAR */}
      <div className="p-10 flex flex-col gap-5 md:flex-row  md:justify-between md:items-center">

       <GiHamburgerMenu className='text-white size-7' onClick={() => setDrawerOpen(true)} />

          <input type='search' className='w-full md:w-1/3 border-4 border-gray-400 rounded-3xl p-2  text-white' placeholder='search the consoles' value={search} onChange={(e) => setSearch(e.target.value)} />

      </div>

      {/* DRAWER */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={250}
      >
        <p>
          <Link to="/games">Games</Link>
        </p>
        <p>
          <Link to="/controllers">Controllers</Link>
        </p>
        <p>
          <Link to="/consoles">Consoles</Link>
        </p>
        <p>
          <Link to="/rent">Rent</Link>
        </p>
      </Drawer>

      {/* CONTROLLERS GRID */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (<h3 className="text-white">Loading controllers...</h3>) : 
        filteredControllers.length === 0 ? (<h3 className="text-white">No controllers found</h3>) : 
        (
          filteredControllers.map((controller) => (
            <Link to={`/controllerDetails/${controller._id}`}>
              <div key={controller._id} className="bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 transition duration-300">
                <img src={controller.img} alt={controller.remoteName} className="h-60 w-full object-cover rounded"/>
                <h3 className="mt-2 font-semibold text-white">{controller.remoteName}</h3>
                <p className="text-gray-400">{controller.description}</p>
                <p className="text-gray-400">type : {controller.genre}</p>
                <p className="text-gray-400">Price : ₹ {controller.price}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Controllers;
