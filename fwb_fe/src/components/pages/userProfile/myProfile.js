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
import {
  logout,
  uploadProfilePic,
  loadUser,
} from "./../../../redux/actions/auth";
import store from "./../../../redux/store";
import { getAllHobits } from "./../../../redux/actions/hobits";
import { updateUserHobits } from "./../../../redux/actions/auth";
import { getCookie } from "../../../utils/cookie";

function MyProfile({
  user,
  hobits,
  logout,
  uploadProfilePic,
  loadUser,
  getAllHobits,
  updateUserHobits,
}) {
  let histoty = useHistory();

  useEffect(() => {
    getAllHobits();
    loadUser();
  }, []);

  const [userHobit, setUserHobit] = useState([...user.hobits]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const checkInclude = (el) => {
    return userHobit.includes(el);
  };

  const handleChangeImage = (file) => {
    const token = getCookie("jwt");
    uploadProfilePic(user.id, token, file);
  };

  const handleLogout = () => {
    logout();
    histoty.push("/");
  };

  const handleOK = () => {
    updateUserHobits(user.id, userHobit);
    setIsModalVisible(false);
  };

  const handleHobitClick = (item) => {
    if (checkInclude(item)) {
      setUserHobit(userHobit.filter((el) => item !== el));
    } else {
      setUserHobit([...userHobit, item]);
    }
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
              onOk={() => handleOK()}
              onCancel={() => setIsModalVisible(false)}
            >
              {hobits.map((hobit) => (
                <div
                  key={hobit}
                  className="hobitItem"
                  onClick={() => handleHobitClick(hobit)}
                >
                  <Typography.Title level={5}>{hobit}</Typography.Title>
                  {checkInclude(hobit) && (
                    <CheckOutlined
                      style={{ color: "#ff2e68", fontSize: "18px" }}
                    />
                  )}
                </div>
              ))}
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
  updateUserHobits: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  hobits: state.hobits,
});

export default connect(mapStateToProps, {
  logout,
  uploadProfilePic,
  getAllHobits,
  loadUser,
  updateUserHobits,
})(MyProfile);
