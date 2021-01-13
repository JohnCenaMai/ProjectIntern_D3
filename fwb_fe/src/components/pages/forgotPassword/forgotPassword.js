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

function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Enter email", "Enter code", "Change password"];

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
                <Input placeholder="Enter your email..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Send code</Button>
              </Form.Item>
            </Form>
          )}

          {currentStep === 1 && (
            <Form layout="vertical" className="forgotPassword__form">
              <Typography.Title level={4}>
                Enter code you've received here
              </Typography.Title>
              <Form.Item>
                <Input placeholder="Enter the code..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          )}

          {currentStep === 2 && (
            <Form layout="vertical" className="forgotPassword__form">
              <Typography.Title level={4} style={{ textAlign: "center" }}>
                Change password
              </Typography.Title>
              <Form.Item label="Your new password">
                <Input placeholder="Enter you new password..." />
              </Form.Item>
              <Form.Item label="Reeenter your new password">
                <Input placeholder="Reenter you new password..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Submit</Button>
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
          {currentStep === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
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
        </div>
      </div>
    </Fragment>
  );
}

export default ForgotPassword;
