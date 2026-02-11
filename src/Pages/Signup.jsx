import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import VideoBackground from "../Components/VideoBackground";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import instance from "../../utils/instanceFile";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const videoref = useRef(null);

  const onFinish = async (values) => {
    try {
      const res = await instance.post("/v1/signup", values);
      toast.success(res.data.message);
      navigate("/login");
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
    <div className="relative h-screen w-full overflow-hidden text-white">
      {/* Background Video */}
      <VideoBackground src={"https://res.cloudinary.com/dguejsskq/video/upload/v1769733908/DJ_3_-_Made_with_Clipchamp_lv9q6p.mp4"} ref={videoref} className="absolute inset-0 w-full h-full object-cover"/>

      {/* Overlay */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full">
        
        
        <div className="flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-black/40 border border-gray-500 rounded-xl p-6" >

            <h1 className="text-2xl font-bold text-center text-gray-300 mb-6">
              SIGNUP
            </h1>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={<span className="text-gray-300">Username</span>}
                name="username"
                rules={[{ required: true }]}
              >
                <Input className="!bg-transparent !text-white" />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300">Email</span>}
                name="email"
                rules={[{ type: "email", required: true }]}
              >
                <Input className="!bg-transparent !text-white" />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300">Password</span>}
                name="password"
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

              <Button type="primary" htmlType="submit" className="w-full mt-2">
                Signup
              </Button>

              <p className="text-center text-gray-400 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400">
                  Login
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;



