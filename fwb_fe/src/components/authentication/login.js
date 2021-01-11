import React, { Fragment } from 'react';
import styled from "styled-components";
import {PageHeader,Tabs,Tooltip,  Form, Input, Radio, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import './login.css';
const { TabPane } = Tabs;

  const ButtonSignIn = styled.button`
  display: inline-block;
  color: white;
  background-color: #ff2e68;
  font-size: 1em;
  margin: 1em;
  padding: 1%;
  border: 2px solid #ff4081;
  border-radius: 32px;
  width: 94%;
  cursor: pointer;
`;

const ButtonSignUp = styled.button`
display: inline-block;
  color: white;
  background-color: #ff2e68;
  font-size: 1em;
  margin: 1em;
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
  margin: 1em;
  padding: 1%;
  border: 2px solid #ff4081;
  border-radius: 32px;
  width: 94%;
  cursor: pointer;
  `;
  const config = {
      rules: [
          {
              type: 'object',
              required: true,
              message: 'Please date of birth'
          }
      ]
  }

  const requireRadio = {
      rules: [
          {
              required: true
          }
      ]
  }

function Login() {

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
    <Fragment>
        <PageHeader 
        className="site-page-header"
        onBack={() => null}
        title="FWB" />

        <Tabs centered className="form">
            <TabPane tab="Sign In" key="1" className="form__text--signin">
                <Form
                style={{'marginRight': '20%','marginLeft': '20%'}}
                    name="basic"
                    initialValues={{remember: true,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username or email!',
                        },
                        ]}
                    >
                        <Input placeholder="Username or email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item >
                        <ButtonSignIn type="primary" htmlType="submit">
                        Sign In
                        </ButtonSignIn>
                    </Form.Item>

                    <Form.Item >
                        <ButtonSignInWithGG type="primary">
                        Sign In With Google
                        </ButtonSignInWithGG>
                    </Form.Item>

                    <Tooltip>
                        <a href="/filter">Forgot Password?</a>
                    </Tooltip>
                </Form>
            </TabPane>
            <TabPane tab="Sign Up" key="3" className="form__text--signup">
            <Form
                style={{'marginRight': '20%','marginLeft': '20%'}}
                    name="basic"
                    initialValues={{remember: true,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your confirm password!',
                        },
                        ]}
                    >
                        <Input.Password placeholder="Confirm password" />
                    </Form.Item>
                    <Form.Item name="date-picker" label="Date of Birth" {...config}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Gender" {...requireRadio}>
                        <Radio.Group>
                            <Radio value={1}>Male</Radio>
                            <Radio value={2}>Female</Radio>
                            <Radio value={3}>Other</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item >
                        <ButtonSignUp type="primary">
                        Sign Up
                        </ButtonSignUp>
                    </Form.Item>
                    </Form>
            </TabPane>
        </Tabs>
  </Fragment>
    );
}

export default Login;