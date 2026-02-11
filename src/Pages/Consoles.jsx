import { useEffect, useState } from 'react'
import Navbar from './../Components/Navbar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import instance from './../../utils/instanceFile';


const Consoles = () => {

  const [search, setSearch] = useState("");
  const [draweropen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [consoles, setConsoles] = useState([]);

  const filteredConsoles = consoles.filter((console) =>
    console.Console.toLowerCase().includes(search.toLowerCase())
  );


  const fetchConsoles = async () => {
    try {
      const res = await instance.get("/v1/getConsoles");
      setConsoles(res.data.consoles || []);
    } catch (err) {
      console.error("Failed to fetch consoles", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchConsoles();
  }, []);

  console.log(search);

  return (
    <div className='relative h-auto w-full '>
      {/* video */}

      <div className='absolute h-auto w-full'>
        <Navbar className='fixed' />

        <div className='p-10 flex gap-5 flex-col md:justify-between md:items-center md:flex-row'>
          <GiHamburgerMenu className='text-white size-7' onClick={() => setDrawerOpen(true)} />

          <input type='search' className='w-full md:w-1/3 border-4 border-gray-400 rounded-3xl p-2  text-white' placeholder='search the consoles' value={search} onChange={(e) => setSearch(e.target.value)} />


          <Drawer
            title="Resizable Drawer"
            placement="left"
            onClose={() => setDrawerOpen(false)}
            open={draweropen}
            width={250}
            resizable={{
              onResize: newSize => setSize(newSize),
            }}

          >
            <p>Drag the edge to resize the drawer</p>
            <p>Current size: px</p>
          </Drawer>


        </div>

        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {loading ? (<h3 className='text-white '>Loading consoles....</h3>) : filteredConsoles.length === 0 ? (<h3 className='text-white'>No consoles found</h3>) :
            (
              filteredConsoles.map((console) => {
                return (
                  <Link to={`/consoleDetails/${console._id}`}>
                    <div key={console._id} className='bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 duration-500 w-50'>
                      <img src={console.img} alt={console.Console} className='h-auto w-auto object-contain rounded' />
                      <h3 className="mt-2 font-semibold text-white">{console.Console}</h3>
                      <p className="text-gray-400">{console.description}</p>
                      <p className="text-gray-400">type : {console.genre}</p>
                      <p className="text-gray-400">Price : ₹ {console.price}</p>
                    </div>
                  </Link>
                );

              })
            )}
        </div>


      </div>
    </div>
  )
}

export default Consoles;

