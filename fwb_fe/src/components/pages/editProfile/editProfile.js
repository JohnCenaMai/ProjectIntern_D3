import React, { Fragment } from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  DatePicker,
  Radio,
  Button,
} from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./editProfile.css";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

function EditProfile() {
  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <Link to="/me" style={{ display: "flex", alignItems: "center" }}>
            <LeftOutlined style={{ color: "black", fontSize: "16px" }} />
            <Typography.Title
              level={4}
              style={{ marginLeft: "10px", marginTop: "1rem" }}
            >
              Edit my profile
            </Typography.Title>
          </Link>

          <div className="editProfile">
            <Form layout="vertical" className="editProfile__form">
              <Form.Item label="Username" name="usernmae">
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item label="Full name" name="full_name">
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Birthday" name="age">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <Radio.Group>
                  <Radio value={1}>Male</Radio>
                  <Radio value={2}>Female</Radio>
                  <Radio value={3}>Other</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="About you" name="bio">
                <Input.TextArea placeholder="Bio" />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <Input placeholder="Location" />
              </Form.Item>
              <Form.Item>
                <Button
                  className="editProfile__btn"
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default EditProfile;
