import { useEffect, useState } from 'react'
import Navbar from './../Components/Navbar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import instance from './../../utils/instanceFile';


const Games = () => {

  const [search, setSearch] = useState("");
  const [draweropen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );


  const fetchGames = async () => {
    try {
      const res = await instance.get("/v1/getGames");
      setGames(res.data.Games || []);

      console.log(res.data)
    } catch (err) {
      console.error("Failed to fetch games", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchGames();
  }, []);







  console.log(search);

  return (
    <div className='relative h-auto w-full '>

     <video src={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732129/glowingStar_ht90tb.mp4"} autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover z-0 opacity-30"
                ></video>
      <div className='absolute h-auto w-full'>
        <Navbar className='fixed' />

        <div className='p-10 flex flex-col gap-5 md:justify-between md:items-center md:flex-row'>
          <GiHamburgerMenu className='text-white size-7 cursor-pointer hover:text-blue-300 duration-300' onClick={() => setDrawerOpen(true)} />

          <input type='search' className='w-auto md:w-1/3 border-4 border-gray-400 rounded-3xl p-2  text-white' placeholder='search the games' value={search} onChange={(e) => setSearch(e.target.value)} />


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
            <Link><p>My Games</p></Link>
            <hr />
            <Link><p>My Consoles</p></Link>
            <hr />
            <Link><p>My Controllers</p></Link>
            <hr />
          </Drawer>


        </div>

        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {loading ? (<h3 className='text-white'>Loading Games....</h3>) : filteredGames.length === 0 ? (<h3 className='text-white'>No games found</h3>) :
            (
              filteredGames.map((game) => {
                return (
                  <Link to={`/gameDetails/${game._id}`}>
                    <div key={game._id} className='bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 duration-500'>
                      <img src={game.img} alt={game.name} className='h-60 w-full object-cover rounded' />
                      <h3 className="mt-2 font-semibold text-white">{game.name}</h3>
                      <p className="text-gray-400">{game.description}</p>
                      <p className="text-gray-400">Genre : {game.genre}</p>
                      <p className="text-gray-400">₹ {game.price}</p>
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

export default Games;

