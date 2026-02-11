import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import PS5 from "../assets/PS5.png";
import XBOX from "../assets/XBOX.png";
import VideoBackground from "../Components/VideoBackground";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import instance from "../../utils/instanceFile";
import { toast } from "react-toastify";

function AdminSignup() {
  const navigate = useNavigate();
  const videoref = useRef(null);

  const onFinish = async (values) => {
    try {
      const res = await instance.post("/v1/adminSignup", values);
      toast.success(res.data.message);
      navigate("/adminLogin");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      videoref.current,
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: "power2.out" }
    );
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      
      {/* Background Video */}
      <VideoBackground
        src="https://res.cloudinary.com/dguejsskq/video/upload/v1769733908/DJ_3_-_Made_with_Clipchamp_lv9q6p.mp4"
        ref={videoref}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-col items-center md:items-start justify-center md:justify-start min-h-screen px-4 md:px-16 py-10 gap-10">

        {/* Form Card */}
        <div className="w-full max-w-md border border-gray-500 rounded-2xl p-3 sm:p-8 shadow-2xl">

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-300 mb-6">
            ADMIN SIGNUP
          </h1>

          <Form layout="vertical" onFinish={onFinish}>

            <Form.Item
              label={<span className="text-gray-300">Username</span>}
              name="adminName"
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input
                size="large"
                className="!bg-transparent !text-white !border-gray-400"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-300">Email</span>}
              name="email"
              rules={[
                { type: "email", message: "Enter valid email" },
                { required: true, message: "Email is required" },
              ]}
            >
              <Input
                size="large"
                className="!bg-transparent !text-white !border-gray-400"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-300">Password</span>}
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                size="large"
                className="!bg-transparent !text-white !border-gray-400"
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined style={{ color: "white" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: "gray" }} />
                  )
                }
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full mt-4"
            >
              Signup
            </Button>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/adminLogin" className="text-blue-400 hover:text-blue-300">
                Login
              </Link>
            </p>

          </Form>
        </div>

        {/* Console Images */}
        <div className="absolute flex items-center justify-center gap-6 mt-6 md:mt-0 md:bottom-8 md:left-30 bottom-7">
          <img src={PS5} alt="PS5" className="h-16 sm:h-20 md:h-18 object-contain"/>
          <img src={XBOX} alt="XBOX" className="h-16 sm:h-20 md:h-24 object-contain" />
        </div>

      </div>
    </div>
  );
}

export default AdminSignup;

