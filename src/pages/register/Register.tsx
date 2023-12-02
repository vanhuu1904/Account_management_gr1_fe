import { Button, Divider, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { callRegister } from "../../services/api";
import "./register.scss";
import { register } from "../../services/api";

interface IRegister {
  username: string;
  password: string;
  fullname: string;
  studentcode: number;
  address: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values: IRegister) => {
    const { username, password, fullname, studentcode, address } = values;
    console.log({ username, password, fullname, studentcode, address });
    setIsSubmit(true);
    const res: any = await register(username, password, fullname, studentcode, address)
    setIsSubmit(false);
    console.log(">>>check res: ", res);
    if (res?.data?.id) {
      message.success("Đăng ký tài khoản thành công!");
      navigate('/login');
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
    // setIsSubmit(true);
    // const res = await callRegister(fullName, email, password, phone);
    // setIsSubmit(false);
    // if (res?.data?._id) {
    //   message.success("Đăng ký tài khoản thành công!");
    //   navigate("/login");
    // } else {
    //   notification.error({
    //     message: "Có lỗi xảy ra",
    //     description:
    //       res.message && Array.isArray(res.message)
    //         ? res.message[0]
    //         : res.message,
    //     duration: 5,
    //   });
    // }
  };

  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
              <Divider />
            </div>
            <Form
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Họ tên"
                name="fullname"
                rules={[
                  { required: true, message: "Họ tên không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Username không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mã số sinh viên"
                name="studentcode"
                rules={[
                  {
                    required: true,
                    message: "Mã số sinh viên không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng ký
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Đã có tài khoản ?
                <span>
                  <Link to="/login"> Đăng Nhập </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
