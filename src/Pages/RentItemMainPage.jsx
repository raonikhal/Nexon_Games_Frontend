import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../utils/instanceFile";
import Navbar from "../Components/Navbar";

function RentItemMainPage() {
  const [Item, setItem] = useState(null);
  const { id } = useParams();

  const ItemData = async () => {
    const res = await instance.get("/v1/allListed_items");
    const selectedItem = res.data.Items.find((I) => I._id === id);
    setItem(selectedItem);

    console.log(Item)
  };

  useEffect(() => {
    ItemData();
  }, [id]);

  console.log(Item)

  if (!Item) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }


  const handlecheckOut = async () => {
    try {
      const res = await instance.post("/v1/create_checkout_session", {
        cartItems: [
          {
            name: Item.name,
            image: "https://via.placeholder.com/300",
            price: Item.price,
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
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col gap-6">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[60%] bg-gray-900 rounded-xl p-6 flex flex-col gap-4">
          <img
            src={`http://localhost:5000/${Item.img}`}
            className="w-full h-[320px] object-cover rounded-lg"
          />

          <h1 className="text-2xl font-bold">{Item.name}</h1>
          <p className="text-gray-300">{Item.description}</p>

          <div className="flex gap-4 text-sm justify-between">

            <div className="flex gap-4">
              <span className="bg-gray-800 px-3 py-1 rounded-full flex justify-center items-center">
                Type: {Item.item}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full flex justify-center items-center">
                ₹ {Item.price} / day
              </span>
            </div>

            <div>
              <button className="bg-green-600 px-10 py-3 rounded-full text-lg cursor-pointer" onClick={handlecheckOut}>
                Rent It
              </button>
            </div>

          </div>

        </div>

        <div className="lg:w-[40%] bg-gray-900 rounded-xl p-6">
          <video src={`http://localhost:5000/${Item.video}`} controls className="w-full h-[420px] object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-center">

      </div>
    </div>
  );
}


export default RentItemMainPage;