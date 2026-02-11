import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import PS5 from "../assets/PS5.png";
import XBOX from "../assets/XBOX.png";
import VideoBackground from '../Components/VideoBackground';
import instance from "../../utils/instanceFile";
import { toast } from "react-toastify"

const Login = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await instance.post("/v1/login", values);
            toast.success("Login Successfull", res.data);
            localStorage.setItem("userToken", res.data.Token);
            navigate("/homepage");
        } catch (err) {
            toast.error(err.response?.data.message || err.message);
        }
    };

    const onFinishFailed = values => {
        console.log(values);
    }



    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Video */}
            <VideoBackground src={"https://res.cloudinary.com/dguejsskq/video/upload/v1769733736/DJ_4_New_-_Made_with_Clipchamp_nyeryh.mp4"} className="absolute inset-0 w-full h-full object-cover"/>

            {/* Overlay */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full">

                <div className="flex items-center justify-center px-4">
                    <div className="bg-black/40 border border-gray-500 w-full max-w-md p-6 rounded-xl">

                        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login </h1>

                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
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

                            <p className="text-gray-300 mt-4 text-center"> New user ?{" "}
                                <Link to="/signup" className="text-blue-400">
                                    Signup first
                                </Link>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login



