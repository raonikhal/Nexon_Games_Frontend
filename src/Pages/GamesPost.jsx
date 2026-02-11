import React, { useEffect, useState } from "react";
import axios from "axios";
import { Drawer, Button, Upload, Form, Input, Modal, Popover } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSquarePlus } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import {toast} from 'react-toastify'
import AdminNavbar from "../Components/AdminNavbar";
import instance from './../../utils/instanceFile';

function GamesPost() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [form] = Form.useForm();

  const [isadminLogin, setisadminLogin] = useState(null);  // yahin se kaam shuru karna hai . 

  /* ================= FETCH GAMES ================= */
  const fetchGames = async () => {
    try {
      const res = await instance.get("/v1/getGames");
      setGames(res.data.Games || []);
    } catch (err) {
      console.error("Failed to fetch games", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  /* ================= SEARCH ================= */
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= FILE NORMALIZER for img and video ================= */
  const normFile = (e) => {     
    if (Array.isArray(e)) return e;
    return e.fileList;
  };

  /* ================= ADD / UPDATE ================= */
  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("genre", values.genre);

      if (values.image) {
        formData.append("img", values.image[0].originFileObj);
      }

      if (values.video) {
        formData.append("video", values.video[0].originFileObj);
      }

      let res;

      if (isEditMode) {
        res = await instance.put(`/v1/updateGame/${selectedGame._id}`,formData , { headers: { "Content-Type": "multipart/form-data" } });

        setGames((prev) =>prev.map((g) => g._id === selectedGame._id ? res.data.data : g ));

        toast.success("Game Added Successfully")
      } else {
        res = await instance.post("/v1/createGames", formData, { headers: { "Content-Type": "multipart/form-data" } });

        setGames((prev) => [res.data.game, ...prev]);

        toast.success("Game Added Successfully")
      }

      setIsModalOpen(false);
      form.resetFields();
      setIsEditMode(false);
      setSelectedGame(null);
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (game) => {
    setIsEditMode(true);
    setSelectedGame(game);
    setIsModalOpen(true);

    form.setFieldsValue({
      name: game.name,
      description: game.description,
      price: game.price,
      genre: game.genre,
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = (gameID) => {
    Modal.confirm({title: "Delete Game?",content: "This action cannot be undone.", okText: "Delete", okType: "danger", onOk: async () => {
        await instance.delete(`/v1/deleteGame/${gameID}`);
        setGames((prev) => prev.filter((g) => g._id !== gameID));
      },
    });
  };

  /* ================= POPOVER ================= */
  const popoverContent = (game) => (
    <div className="space-y-2">
      <p className="cursor-pointer font-bold hover:text-blue-500" onClick={() => handleEdit(game)}>
        Update Game
      </p>

      <p className="cursor-pointer font-bold hover:text-red-500" onClick={() => handleDelete(game._id)} >
        Delete Game
      </p>
    </div>
  );

  const token = localStorage.getItem("adminToken");

  console.log(games);

  return (
    <div className="relative w-full">

      <video
        src={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732159/glowingStar_b08y0c.mp4"}
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      />

      <div className="absolute w-full min-h-screen text-white">
        <AdminNavbar/>



        {/* TOP BAR */}
        <div className="flex items-center gap-4 p-6 justify-between mt-20">
          <GiHamburgerMenu
            size={28}
            className="cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          />

          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="top-25 z-50 right-0 w-full max-w-md px-4 py-2 rounded-full bg-gray-800 outline-none"
          />
        </div>


        {/* DRAWER */}
        <Drawer
          title="Filters"
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={320}
        >
          <ul className="space-y-4">
            <li>All Games</li>
            <li>Rent Games</li>
            <li>Buy Games</li>
            <li>Trending</li>
          </ul>
        </Drawer>

        {/* ADD BUTTON */}
        <div className="flex justify-end px-6">
          <Button
            type="primary"
            onClick={() => {
              setIsEditMode(false);
              setSelectedGame(null);
              form.resetFields();

              !token ? toast.success("Please Signup or Login as Admin first") : setIsModalOpen(true);
            }}
          >
            Add Game +
          </Button>
        </div>



        {/* MODAL */}
        <Modal
          title={isEditMode ? "Update Game" : "Add New Game"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
        >



          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item name="name" label="Game Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="image"
              label="Game Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: !isEditMode }]}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                maxCount={1}
                accept="image/*"
              >
                <CiSquarePlus />
                <div>Upload Image</div>
              </Upload>
            </Form.Item>

            <Form.Item
              name="video"
              label="Gameplay Video"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: !isEditMode }]}
            >
              <Upload beforeUpload={() => false} maxCount={1} accept="video/*">
                <Button icon={<CiSquarePlus />}>Upload Video</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        </Modal>

        {/* GAMES GRID */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (<p>Loading...</p> ) : filteredGames.length === 0 ? (<p>No games found</p>) : (
            filteredGames.map((game) => (
              <div key={game._id} className="bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 duration-300">
                
                <img src={game.img} alt={game.name} className="h-60 w-full object-cover rounded" />

                <h3 className="mt-2 font-semibold">{game.name}</h3>
                <p className="text-gray-400">{game.description}</p>
                <p className="text-gray-400">Genre : {game.genre}</p>

                <div className="flex justify-between items-center">
                  <p className="text-gray-400">₹ {game.price}</p>

                  <Popover content={popoverContent(game)} title="Actions" trigger="click">
                    <BsThreeDotsVertical className="cursor-pointer" />
                  </Popover>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GamesPost;
