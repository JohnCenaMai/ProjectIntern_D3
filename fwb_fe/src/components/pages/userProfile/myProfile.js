import React, { Fragment, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Tooltip,
  Form,
  Upload,
  Modal,
  List,
} from "antd";
import Sidebar from "../../common/sidebar/sider";
import {
  UploadOutlined,
  RightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./myProfile.css";
import { Link } from "react-router-dom";

function MyProfile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hobits, setHobits] = useState([
    {
      id: 1,
      name: "Gaming",
    },
    {
      id: 2,
      name: "Riding",
    },
    {
      id: 3,
      name: "Reading",
    },
    {
      id: 4,
      name: "Football",
    },
    {
      id: 5,
      name: "Swimming",
    },
    {
      id: 6,
      name: "Hanging out",
    },
  ]);
  const [userHobits, setUserHobits] = useState(["Gaming", "Riding"]);

  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <Typography.Title
            level={4}
            style={{ marginLeft: "1rem", marginTop: "1rem" }}
          >
            Profile
          </Typography.Title>
          <div className="myProfile">
            <div className="myProfile__pic">
              <img
                className="myProfile__photo"
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/180506_%EB%AA%A8%EB%AA%A8%EB%9E%9C%EB%93%9C_%EC%84%9C%EB%93%A0%EC%96%B4%ED%83%9D_%ED%8C%AC%EB%AF%B8%ED%8C%85_%281%29.jpg"
                alt="myProfile__pic"
              />
              <Form className="myProfile__uploadForm">
                <Upload>
                  <Tooltip title="Upload picture">
                    <Button
                      type="primary"
                      shape="circle"
                      className="myProfile__upload"
                      icon={<UploadOutlined style={{ fontSize: "24px" }} />}
                    />
                  </Tooltip>
                </Upload>
              </Form>
            </div>
            <div class="myProfile__info">
              <div className="myProfile__info--item">
                <Typography.Title level={5}>Basic info</Typography.Title>
                <Link to="/me/edit" className="myProfile__info--show">
                  <Typography.Title level={5}>Basic info</Typography.Title>
                  <RightOutlined
                    style={{
                      fontSize: "18px",
                      marginLeft: "1rem",
                      color: "black",
                    }}
                  />
                </Link>
              </div>
            </div>
            <div class="myProfile__info">
              <div className="myProfile__info--item">
                <Typography.Title level={5}>Interest</Typography.Title>
                <div
                  className="myProfile__info--show"
                  onClick={() => setIsModalVisible(true)}
                >
                  <Typography.Title level={5}>
                    {userHobits.toString()}
                  </Typography.Title>
                  <RightOutlined
                    style={{
                      fontSize: "18px",
                      marginLeft: "1rem",
                      color: "black",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Modal interest */}
            <Modal
              title="Interest"
              visible={isModalVisible}
              onOk={() => setIsModalVisible(false)}
              onCancel={() => setIsModalVisible(false)}
            >
              <List
                className="modalList"
                itemLayout="horizontal"
                dataSource={hobits}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 1rem",
                    }}
                  >
                    <Typography.Title level={5}>{item.name}</Typography.Title>
                    {/* {checkInclude(item, hobits) && <CheckOutlined />} */}
                  </List.Item>
                )}
              />
            </Modal>

            <Button
              type="primary"
              danger
              style={{ width: "80%", marginTop: "2rem" }}
            >
              Sign out
            </Button>
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default MyProfile;
