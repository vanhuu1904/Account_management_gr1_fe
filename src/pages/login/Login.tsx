import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginGoogle, loginUser } from "../../services/api";
import { doLoginAction } from "../../redux/account/accountSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import axios from "axios";
interface ILogin {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  // const setAuthData = useStore((state: any) => state.setAuthData);
  const dispatch = useDispatch();





  const onFinish = async (values: ILogin) => {
    const { username, password } = values;
    console.log({ username, password });
    setIsSubmit(true);
    const res: any = await loginUser(username, password);
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
  const handleLogin = async (credentialResponse: any) => {
    // var obj = jwtDecode(credentialResponse.credential);
    console.log("check credential: ", credentialResponse);
    const res = await axios.post('https://vanhuu-account-management-gr1.onrender.com/google', {
      token: credentialResponse.credential
    });
    // const res = await loginGoogle(credentialResponse.credential)
    console.log(">>> check res: ", res);
    if (res) {
      const data = res?.data?.data;
      if (data) {
        localStorage.setItem('access_token', data.access_token);
        dispatch(doLoginAction(data?.createdUser || data?.userExists));
        navigate('/admin');
      }
      console.log(">>> check res : ", data);
      // setAuthData(data);
    }

  }
  const handleLoginWithGoogle = async () => {
    window.open('http://localhost:8000/google')
    // window.location.href = 'http://localhost:8000/google';
    const res = await axios.get('http://localhost:8000/google');
    console.log(">>> check  res : ", res);
  }
  const handleLoginFacebook = async () => {
    const res = await axios.get('http://localhost:8000/facebook')
    console.log(">>>> check res: ", res);
    // navigate('/admin');
  }
  const clientid = "612136221181-cdi6lu7hfd7vup2hd8vjvvbhc8q0pm8l.apps.googleusercontent.com"

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
                label="Tên đăng nhập"
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
              {/* <Button onClick={() => handleLoginWithGoogle()}>Login with Google</Button> */}
              <p>
                <GoogleOAuthProvider clientId={clientid}
                >
                  <GoogleLogin
                    useOneTap={true}
                    onSuccess={handleLogin}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </p>
              <p>
                <LoginSocialFacebook appId="393993129750751"
                  onResolve={handleLoginFacebook}
                  onReject={(error) => {
                    console.log(error);
                  }}
                  redirect_uri="http://localhost:8000/facebook">
                  <FacebookLoginButton />
                </LoginSocialFacebook>
              </p>
              <p className="text text-normal">
                Chưa có tài khoản ?
                <span>
                  <Link to="/register"> Đăng Ký </Link>
                </span>
              </p>

            </Form>
          </section>
        </div>
      </main >
    </div >
  );
}
export default LoginPage;
