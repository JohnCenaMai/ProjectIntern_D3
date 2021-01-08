import React, { Fragment } from 'react';
import styled from "styled-components";
import {PageHeader,Tabs,Tooltip,  Form, Input, Button, Checkbox} from 'antd';
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
`;
  const ButtonSignInWithGG = styled.button`
  display: inline-block;
  color: white;
  background-color: #ff2e68;
  font-size: 1em;
  margin: 1em;
  padding: 1%;
  border: 2px solid #ff4081;
  border-radius: 32px;
  width: 94%;
  `;

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
                style={{'margin-right': '20%','margin-left': '20%'}}
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
                        <Input.Password placeholder="password" />
                    </Form.Item>
                    <Form.Item >
                        <ButtonSignIn type="primary" htmlType="submit">
                        Sign In
                        </ButtonSignIn>
                    </Form.Item>
                    <Form.Item >
                        <ButtonSignInWithGG type="primary" htmlType="submit">
                        Sign In
                        </ButtonSignInWithGG>
                    </Form.Item>
                    <Tooltip>
                        <a href="#API">Forgot Password?</a>
                    </Tooltip>
                </Form>
            </TabPane>
            <TabPane tab="Sign Up" key="3" className="form__text--signup">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
  </Fragment>
    );
}

export default Login;