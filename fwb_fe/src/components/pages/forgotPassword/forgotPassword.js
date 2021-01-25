import React, { Fragment, useState } from "react";
import {
  PageHeader,
  Form,
  Input,
  Button,
  Typography,
  Steps,
  message,
} from "antd";
import "./forgotPassword.css";
import api from "../../../utils/api";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCf, setNewPasswordCf] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Enter email", "Enter code", "Change password"];

  const sendResetToken = async () => {
    const response = await api.post(
      "/auth/fotgotPassword",
      JSON.stringify({ email })
    );

    message.success(response.data.msg);
  };

  const sendResetTokenToServer = async () => {
    if (
      newPassword === "" ||
      (newPasswordCf === "") | (newPassword !== newPasswordCf)
    ) {
      message.error("Password and password confirm is not match or empty");
      return;
    }

    const response = await api.put(
      `/auth/resetPassword/${resetToken}`,
      JSON.stringify({ password: newPassword })
    );

    message.success(response.data.msg);
    history.push("/");
  };

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Login"
      />
      <div className="forgotPassword">
        <Steps current={currentStep} className="steps">
          {steps.map((step) => (
            <Steps.Step key={step} title={step} />
          ))}
        </Steps>

        <div className="stepContent">
          {currentStep === 0 && (
            <Form layout="vertical" className="forgotPassword__form">
              <Typography.Title level={4}>
                Enter you email here. And we'll send you a authentication code
              </Typography.Title>
              <Form.Item>
                <Input
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={sendResetToken}>
                  Send code
                </Button>
              </Form.Item>
            </Form>
          )}

          {currentStep === 1 && (
            <Form layout="vertical" className="forgotPassword__form">
              <Typography.Title level={4}>
                Enter code you've received here
              </Typography.Title>
              <Form.Item>
                <Input
                  placeholder="Enter the code..."
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                />
              </Form.Item>
            </Form>
          )}

          {currentStep === 2 && (
            <Form layout="vertical" className="forgotPassword__form">
              <Typography.Title level={4} style={{ textAlign: "center" }}>
                Change password
              </Typography.Title>
              <Form.Item label="Your new password">
                <Input
                  placeholder="Enter you new password..."
                  value={newPassword}
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Reeenter your new password">
                <Input
                  placeholder="Reenter you new password..."
                  type="password"
                  value={newPasswordCf}
                  onChange={(e) => setNewPasswordCf(e.target.value)}
                />
              </Form.Item>
            </Form>
          )}
        </div>

        {/* Delete this when deploying */}
        <div className="steps-action">
          {currentStep < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          )}

          {currentStep > 0 && (
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={sendResetTokenToServer}>
              Done
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ForgotPassword;
