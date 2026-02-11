import React, { useEffect, useState } from "react";
import { Drawer, Button, Upload, Form, Input, Modal, Popover } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSquarePlus } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import Navbar from "../Components/Navbar";
import instance from "../../utils/instanceFile";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function RentPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rentedItems, setRentedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  /* ================= FETCH MY RENTED ITEMS ================= */
  const fetchMyRentedItems = async () => {
    try {
      const res = await instance.get("/v1/allListed_items");

      console.log(res.data);

      setRentedItems(res.data.Items || []);
    } catch (err) {
      toast.error("Failed to load rented items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRentedItems();
  }, []);

  /* ================= SEARCH ================= */
  const filteredItems = rentedItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= FILE NORMALIZER ================= */
  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  /* ================= ADD RENT ITEM ================= */
  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("item", values.item);

      formData.append("img", values.img[0].originFileObj);
      formData.append("video", values.video[0].originFileObj);

      await instance.post("/v1/rent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Item added for rent successfully");

      setIsModalOpen(false);
      form.resetFields();
      fetchMyRentedItems();
    } catch (err) {
      toast.error("Failed to add item");
    }
  };

  /* ================= DELETE RENT ITEM ================= */
  const handleDelete = async (itemId) => {
    Modal.confirm({
      title: "Delete Rent Item?",
      okType: "danger",
      onOk: async () => {
        try {
          await instance.delete(`/v1/deleteRentedItem/${itemId}`);
          setRentedItems((prev) =>
            prev.filter((item) => item._id !== itemId)
          );
          toast.success("Item deleted");
        } catch {
          toast.error("Delete failed");
        }
      },
    });
  };

  const popoverContent = (item) => (
    <p
      className="cursor-pointer font-bold text-red-500"
      onClick={() => handleDelete(item._id)}
    >
      Delete Rent Item
    </p>
  );

  return (
    <div className="relative w-full">
      {/* BACKGROUND */}
      <video
        src={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732129/glowingStar_ht90tb.mp4"}
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      />

      <div className="absolute w-full min-h-screen text-white">
        <Navbar />

        {/* TOP BAR */}
        <div className="flex items-center justify-between p-6 mt-20">
          <GiHamburgerMenu
            size={28}
            className="cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          />

          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Rent Item
          </Button>
        </div>

        {/* SEARCH */}
        <div className="px-6">
          <input
            type="text"
            placeholder="Search rented items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full bg-gray-800 outline-none"
          />
        </div>

        {/* DRAWER */}
        <Drawer
          title="My Rented Items"
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          Only items rented by you are shown here.
        </Drawer>

        {/* ITEMS GRID */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : filteredItems.length === 0 ? (
            <p>No rented items found</p>
          ) : (
            filteredItems.map((item) => (
              <div>
                <Link to={`/rentItemMainPage/${item._id}`}>
                  <div key={item._id} className="bg-gray-800 rounded-xl p-4 shadow-lg">
                    <img src={`http://localhost:5000/${item.img}`} alt={item.name} className="h-60 w-full object-cover rounded" />

                    <h3 className="mt-2 font-semibold">{item.name}</h3>
                    <p className="text-gray-400">{item.description}</p>

                    <div className="flex justify-between items-center mt-4">
                      <p className="text-gray-400">₹ {item.price}</p>

                      <Popover content={popoverContent(item)} trigger="click">
                        <BsThreeDotsVertical className="cursor-pointer" />
                      </Popover>
                    </div>
                  </div>
                </Link>



              </div>

            ))
          )}
        </div>

        {/* RENT MODAL */}
        <Modal
          title="Add Item for Rent"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
        >
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
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

            <Form.Item name="item" label="Item Type" rules={[{ required: true }]}>
              <Input placeholder="Game / Console / Movie" />
            </Form.Item>

            <Form.Item
              name="img"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<CiSquarePlus />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="video"
              label="Video"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<CiSquarePlus />}>Upload Video</Button>
              </Upload>
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default RentPage;
