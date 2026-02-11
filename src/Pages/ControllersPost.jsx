import React, { useEffect, useState } from "react";
import axios from "axios";
import { Drawer, Button, Upload, Form, Input, Modal, Popover } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSquarePlus } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import Navbar from "../Components/Navbar";
import AdminNavbar from "../Components/AdminNavbar";
import { toast } from "react-toastify";
import instance from './../../utils/instanceFile';

function ControllersPost() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [controllers, setControllers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedController, setSelectedController] = useState(null);
  const [form] = Form.useForm();

  /* ================= FETCH CONTROLLERS ================= */
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

  /* ================= SEARCH ================= */
  const filteredControllers = controllers.filter((controller) =>
    controller.remoteName.toLowerCase().includes(search.toLowerCase())
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

      formData.append("remoteName", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);

      if (values.image) {
        formData.append("img", values.image[0].originFileObj);
      }

      if (values.video) {
        formData.append("video", values.video[0].originFileObj);
      }

      let res;

      if (isEditMode) {
        res = await instance.put(`/v1/updateRemote/${selectedController._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setControllers((prev) =>prev.map((g) =>
            g._id === selectedController._id ? res.data.remotes : g
          )
        );
      } else {
        res = await instance.post("/v1/createRemote",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setControllers((prev) => [res.data.remote, ...prev]);
      }

      setIsModalOpen(false);
      form.resetFields();
      setIsEditMode(false);
      setSelectedController(null);
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (controller) => {
    setIsEditMode(true);
    setSelectedController(controller);
    setIsModalOpen(true);

    form.setFieldsValue({
      name: controller.remoteName,
      description: controller.description,
      price: controller.price,
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = (controllerID) => {
    Modal.confirm({title: "Delete Controller?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        await instance.delete(`/v1/deleteRemote/${controllerID}`);
        setControllers((prev) => prev.filter((g) => g._id !== controllerID));
      },
    });
  };

  /* ================= POPOVER ================= */
  const popoverContent = (controller) => (
    <div className="space-y-2">
      <p className="cursor-pointer font-bold hover:text-blue-500" onClick={() => handleEdit(controller)}>
        Update Controller
      </p>

      <p className="cursor-pointer font-bold hover:text-red-500" onClick={() => handleDelete(controller._id)} >
        Delete Controller
      </p>
    </div>
  );


  const token = localStorage.getItem("adminToken");



  return (
    <div className="relative w-full">

      <video
        src={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732129/glowingStar_ht90tb.mp4"}
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      />
      
      <AdminNavbar/>

      <div className="absolute w-full min-h-screen text-white">
      



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
            className="fixed top-25 z-50 right-0 w-full max-w-md px-4 py-2 rounded-full bg-gray-800 outline-none"
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
              setSelectedController(null);
              form.resetFields();

              !token ? toast.success("Please Signup or Login as Admin first") : toast.success("Abhi bs Nikhil hi Controllers add kar sakta hai !") // setIsModalOpen(true);
            }}
          >
            Add Controller +
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

            <Form.Item name="name" label="Controller Name" rules={[{ required: true }]}>
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
              label="Controller Image"
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
              label="Controller Video"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: !isEditMode }]}
            >
              <Upload beforeUpload={() => false} maxCount={1} accept="video/*">
                <Button icon={<CiSquarePlus />}>Upload Video</Button>
              </Upload>
            </Form.Item>

          
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        </Modal>

        {/* GAMES GRID */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : filteredControllers.length === 0 ? (
            <p>No controllers found</p>
          ) : (
            filteredControllers.map((controller) => (
              <div
                key={controller._id}
                className="bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 duration-300"
              >
                <img
                  src={`http://localhost:5000/${controller.img}`}
                  alt={controller.remoteName}
                  className="h-60 w-full object-cover rounded"
                />

                <h3 className="mt-2 font-semibold">{controller.remoteName}</h3>
                <p className="text-gray-400">{controller.description}</p>

                <div className="flex justify-between items-center">

                  <p className="text-gray-400">₹ {controller.price}</p>

                  <Popover content={popoverContent(controller)} title="Actions" trigger="click" >
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

export default ControllersPost;
