import React, { Fragment, useEffect, useState } from "react";
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
import { Link, Redirect, useHistory } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, uploadProfilePic } from "./../../../redux/actions/auth";
import { getAllHobits } from "./../../../redux/actions/hobits";
import { getCookie } from "../../../utils/cookie";

function MyProfile({ user, hobits, logout, uploadProfilePic, getAllHobits }) {
  let histoty = useHistory();

  useEffect(() => {
    getAllHobits();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChangeImage = (file) => {
    const token = getCookie("jwt");
    uploadProfilePic(user.id, token, file);
  };

  const handleLogout = () => {
    logout();
    histoty.push("/");
  };

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
                src={`http://localhost:5000/images/${user.imageUrl}`}
                alt="myProfile__pic"
              />
              <form className="myProfile__uploadForm">
                <Tooltip title="Upload picture">
                  <Button
                    type="primary"
                    shape="circle"
                    className="myProfile__upload"
                    icon={<UploadOutlined style={{ fontSize: "24px" }} />}
                  />
                </Tooltip>
                <input
                  type="file"
                  className="changeProfile__pic"
                  onChange={(e) => handleChangeImage(e.target.files[0])}
                />
              </form>
            </div>
            <div className="myProfile__info">
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
            <div className="myProfile__info">
              <div className="myProfile__info--item">
                <Typography.Title level={5}>Interest</Typography.Title>
                <div
                  className="myProfile__info--show"
                  onClick={() => setIsModalVisible(true)}
                >
                  <Typography.Title level={5}>
                    {user.hobits.toString()}
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
                  <List.Item style={{ width: "100%" }}>
                    <Typography.Title level={5}>{item}</Typography.Title>
                  </List.Item>
                )}
              />
            </Modal>

            <Button
              type="primary"
              danger
              onClick={handleLogout}
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

MyProfile.propTypes = {
  logout: PropTypes.func.isRequired,
  uploadProfilePic: PropTypes.func.isRequired,
  getAllHobits: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  hobits: state.hobits,
});

export default connect(mapStateToProps, {
  logout,
  uploadProfilePic,
  getAllHobits,
})(MyProfile);
