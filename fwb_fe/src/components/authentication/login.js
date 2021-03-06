import React, { Fragment, useState } from "react";
import styled from "styled-components";
import {
  PageHeader,
  Tabs,
  Tooltip,
  Form,
  Input,
  Radio,
  DatePicker,
} from "antd";
import "antd/dist/antd.css";
import "./login.css";
import "./responsive.css";
import { useHistory, Redirect, Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, register } from "./../../redux/actions/auth";

const { TabPane } = Tabs;

const ButtonSignIn = styled.button`
  display: inline-block;
  color: white;
  background-color: #ff2e68;
  font-size: 1em;
  padding: 1%;
  border: 2px solid #ff4081;
  border-radius: 32px;
  width: 100%;
  cursor: pointer;
`;

const ButtonSignUp = styled.button`
  display: inline-block;
  color: white;
  background-color: #ff2e68;
  font-size: 1em;
  padding: 1%;
  border: 2px solid #ff4081;
  border-radius: 32px;
  width: 100%;
  cursor: pointer;
`;
const ButtonSignInWithGG = styled.button`
  display: inline-block;
  color: black;
  font-size: 1em;
  padding: 1%;
  border: 2px solid #ff4081;
  border-radius: 32px;
  width: 100%;
  cursor: pointer;
`;
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please date of birth",
    },
  ],
};

const requireRadio = {
  rules: [
    {
      required: true,
    },
  ],
};

function Login({ login, register, isAuthenticated }) {
  let history = useHistory();

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [usernameRegister, setusernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [genderRegister, setGenderRegister] = useState("");
  const [birthRegister, setbirthRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleAge = (date, dateString) => {
    const birth = new Date(dateString);
    var ageDifMs = Date.now() - birth.getTime();
    var ageDate = new Date(ageDifMs);
    // const age = now - birth;

    setbirthRegister(Math.abs(ageDate.getUTCFullYear() - 1970));
  };

  const handleLogin = () => {
    console.log("Logining...");
    console.log(login);
    login(emailLogin, passwordLogin);
    history.push("/find-near-you");
  };

  const handleRegister = () => {
    register(
      usernameRegister,
      birthRegister,
      genderRegister,
      emailRegister,
      passwordRegister
    );
    history.push("/me");
  };

  if (isAuthenticated) {
    return <Redirect to="/find-near-you" />;
  }

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="FWB"
      />

      <Tabs centered className="form">
        <TabPane tab="Sign In" key="1" className="form__text--signin">
          <Form
            style={{ marginRight: "20%", marginLeft: "20%" }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              onChange={(e) => setEmailLogin(e.target.value)}
              value={emailLogin}
              rules={[
                {
                  required: true,
                  message: "Please input your username or email!",
                },
              ]}
            >
              <Input placeholder="Username or email" />
            </Form.Item>

            <Form.Item
              name="password"
              onChange={(e) => setPasswordLogin(e.target.value)}
              value={passwordLogin}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <ButtonSignIn
                type="primary"
                htmlType="submit"
                onClick={handleLogin}
              >
                Sign In
              </ButtonSignIn>
            </Form.Item>

            <Tooltip>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </Tooltip>
          </Form>
        </TabPane>
        <TabPane tab="Sign Up" key="3" className="form__text--signup">
          <Form
            style={{ marginRight: "20%", marginLeft: "20%" }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              onChange={(e) => setusernameRegister(e.target.value)}
              value={usernameRegister}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              onChange={(e) => setEmailRegister(e.target.value)}
              value={emailRegister}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              onChange={(e) => setPasswordRegister(e.target.value)}
              value={passwordRegister}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
            <Form.Item name="date-picker" label="Date of Birth" {...config}>
              <DatePicker
                onChange={(date, dateString) => handleAge(date, dateString)}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              {...requireRadio}
              onChange={(e) => setGenderRegister(e.target.value)}
            >
              <Radio.Group>
                <Radio value={1}>Male</Radio>
                <Radio value={2}>Female</Radio>
                <Radio value={3}>Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <ButtonSignUp type="primary" onClick={handleRegister}>
                Sign Up
              </ButtonSignUp>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Fragment>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, register })(Login);
