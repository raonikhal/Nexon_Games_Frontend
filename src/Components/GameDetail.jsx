import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import instance from '../../utils/instanceFile';

const GameDetail = () => {

    const [game, setGame] = useState(null);
    const { id } = useParams();

    const gamedata = async () => {
        try {
            const res = await instance.get("/v1/getGames");

            const selectedGame = res.data.Games.find((g) => g._id === id);

            setGame(selectedGame);
        } catch (err) {
            console.error("Failed to fetch game details", err);
        }
    };

    useEffect(() => {
        gamedata();
    }, [id]);

    if (!game) {
        return <div className="text-white p-10">Loading...</div>;
    }


    const handlecheckout = async () => {
        try {
            const res = await instance.post("/v1/create_checkout_session", {
                cartItems: [
                    {
                        name: game.name,
                        image: "https://via.placeholder.com/300",
                        price: game.price,
                        quantity: 1
                    }
                ]
            });

            // Stripe checkout redirect
            window.location.href = res.data.url;

        } catch (err) {
            console.error("Checkout error:", err.response?.data || err.message);
            alert(err.response?.data?.error || "Payment failed");
        }

    };


    return (
        <div className="relative min-h-screen w-full overflow-hidden">

            {/* BACKGROUND VIDEO */}
            <video
                src={game.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
            />

            {/* GRADIENT OVERLAY */}
            <div className="fixed top-0 left-0 w-full h-full z-[1] bg-gradient-to-r from-black/90  via-black/50 to-transparent
      "
            />

            {/* CONTENT */}
            <div className="relative z-10">
                <Navbar />

                <div className="p-10 flex flex-col md:flex-row md:gap-10">

                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <img
                            src={game.img}
                            alt={game.name}
                            className="rounded-lg shadow-lg max-h-[400px]"
                        />
                    </div>

                    <div className="w-full md:w-1/2 text-white pt-10 md:pt-50">
                        <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
                        <p className="mb-6 text-gray-200">{game.description}</p>
                        <p className="text-2xl font-semibold mb-4">Price: ₹{game.price}</p>

                        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded" onClick={handlecheckout}>
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );

};

export default GameDetail;
