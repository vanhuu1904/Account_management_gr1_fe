import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../services/api";
import { doLoginAction } from "../../redux/account/accountSlice";

interface ILogin {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values: ILogin) => {
    const { username, password } = values;
    console.log({ username, password });
    setIsSubmit(true);
    const res: any = await login(username, password);
    console.log(">>>check res: ", res);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem('access_token', res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      navigate('/admin');
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      })
    }
  }

  return (
    <div className="login-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập</h2>
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
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Chưa có tài khoản ?
                <span>
                  <Link to="/register"> Đăng Ký </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
