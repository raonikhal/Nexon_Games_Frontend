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

function ConsolesPost() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [consoles, setConsoles] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedConsole, setSelectedConsole] = useState(null);
  const [form] = Form.useForm();

  /* ================= FETCH CONSOLES ================= */
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

  /* ================= SEARCH ================= */
  const filteredConsoles = consoles.filter((console) =>
    console.Console.toLowerCase().includes(search.toLowerCase())
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

      formData.append("Console", values.name);
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
        res = await instance.put(`/v1/updateConsole/${selectedConsole._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setConsoles((prev) =>prev.map((g) =>
            g._id === selectedConsole._id ? res.data.console : g
          )
        );
      } else {
        res = await instance.post(
          "/v1/createConsole",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setConsoles((prev) => [res.data.console, ...prev]);
      }

      setIsModalOpen(false);
      form.resetFields();
      setIsEditMode(false);
      setSelectedConsole(null);
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (console) => {
    setIsEditMode(true);
    setSelectedConsole(console);
    setIsModalOpen(true);

    form.setFieldsValue({
      name: console.Console,
      description: console.description,
      price: console.price,
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = (consoleID) => {
    Modal.confirm({title: "Delete Controller?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        await instance.delete(`/v1/deleteConsole/${consoleID}`);
        setConsoles((prev) => prev.filter((g) => g._id !== consoleID));
      },
    });
  };

  /* ================= POPOVER ================= */
  const popoverContent = (console) => (
    <div className="space-y-2">
      <p className="cursor-pointer font-bold hover:text-blue-500" onClick={() => handleEdit(console)}>
        Update Console
      </p>

      <p className="cursor-pointer font-bold hover:text-red-500" onClick={() => handleDelete(console._id)} >
        Delete Console
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
            placeholder="Search consoles..."
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
              setSelectedConsole(null);
              form.resetFields();
              
              !token ? toast.success("Please Signup or Login as Admin first") : setIsModalOpen(true);
            }}
          >
            Add Console +
          </Button>
        </div>



        {/* MODAL */}
        <Modal
          title={isEditMode ? "Update Console" : "Add New Console"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
        >



          <Form layout="vertical" form={form} onFinish={onFinish}>

            <Form.Item name="name" label="Console Name" rules={[{ required: true }]}>
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
              <Input type={Number}/>
            </Form.Item>

            <Form.Item
              name="image"
              label="Console Image"
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
              label="Console Video"
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
          ) : filteredConsoles.length === 0 ? (
            <p>No consoles found</p>
          ) : (
            filteredConsoles.map((console) => (
              <div
                key={console._id}
                className="bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 duration-300"
              >
                <img
                  src={`http://localhost:5000/${console.img}`}
                  alt={console.Console}
                  className="h-60 w-full object-cover rounded"
                />

                <h3 className="mt-2 font-semibold">{console.Console}</h3>
                <p className="text-gray-400">{console.description}</p>

                <div className="flex justify-between items-center">

                  <p className="text-gray-400">₹ {console.price}</p>
                  <Popover content={popoverContent(console)} title="Actions" trigger="click" >
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

export default ConsolesPost;
