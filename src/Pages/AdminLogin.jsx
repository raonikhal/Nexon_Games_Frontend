import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useGSAP } from "@gsap/react";
import { Button, Form, Input } from "antd";
import gsap from "gsap";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../utils/instanceFile";
import VideoBackground from "../Components/VideoBackground";
import PS5 from "../assets/PS5.png";
import XBOX from "../assets/XBOX.png";

const AdminLogin = () => {
  const videoref = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.fromTo(
      videoref.current,
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: "power2.out" }
    );
  });

  const onFinish = async (values) => {
    try {
      const res = await instance.post("/v1/adminLogin", values);
      toast.success(res.data.message);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/gamespost");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Background Video */}
      <VideoBackground src={"https://res.cloudinary.com/dguejsskq/video/upload/v1769732129/Admin_Spidy_ubyvow.mp4"} ref={videoref} className="absolute inset-0 w-full h-full object-cover" />

      {/* Overlay Grid (same as Login) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full">

        {/* Left / Center Section */}
        <div className="flex items-center justify-center px-4">
          <div className="bg-black/40 border border-gray-500 w-full max-w-sm p-6 sm:p-8 rounded-xl">

            <h1 className="text-3xl font-bold text-gray-200 mb-6 text-center">
              ADMIN LOGIN
            </h1>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                label={<span className="text-white">Email</span>}
                rules={[{ type: "email", required: true }]}
              >
                <Input className="!bg-transparent !text-white" />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="text-white">Password</span>}
                rules={[{ required: true }]}
              >
                <Input.Password
                  className="!bg-transparent !text-white"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeOutlined style={{ color: "white" }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ color: "gray" }} />
                    )
                  }
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>

              <p className="text-gray-300 mt-4 text-center text-sm">
                New Admin?{" "}
                <Link to="/adminSignup" className="text-blue-400">
                  Signup First
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>

      {/* Bottom Consoles */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20">
        <img src={PS5} alt="PS5" className="h-10 sm:h-14 w-auto" />
        <img src={XBOX} alt="XBOX" className="h-15 sm:h-14 w-30" />
      </div>
    </div>
  );
};

export default AdminLogin;
