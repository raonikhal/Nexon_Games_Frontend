import React from 'react'
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Adress() {

    const { TextArea } = Input;

    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {

        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };
    return (
        <div className="relative h-screen w-full overflow-hidden text-white">

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full">


                <div className="flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-black/40 border border-gray-500 rounded-xl p-6" >

                        <h1 className="text-2xl font-bold text-center text-gray-300 mb-6">
                            Adress
                        </h1>

                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label={<span className="text-gray-300">Name</span>}
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

                            <Form.Item label={<span className="text-gray-300">Adress</span>} name="adress" rules={[{ required: true, message: 'Please input your adress!' }]}>
                                <TextArea rows={4} className='!bg-transparent !text-white'/>
                            </Form.Item>

                            <Button type="primary" htmlType="submit" className="w-full mt-2">
                                Proceed to Payment
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adress;
