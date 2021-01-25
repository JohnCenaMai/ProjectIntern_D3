import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Typography, Image, Spin, Button, message } from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./viewUser.css";
import { GlobalOutlined } from "@ant-design/icons";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserProfile } from "./../../../redux/actions/auth";
import { likePeople } from "./../../../redux/actions/matching";
import { useHistory, useParams } from "react-router";

function ViewUser({ profile, getUserProfile, likePeople }) {
  const { id } = useParams();
  let history = useHistory();
  const [btnText, setBtnText] = useState("Like");
  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    getUserProfile(id);
  }, []);

  const sendLike = (id) => {
    likePeople(id);
    setBtnText("Liked");
    setBtnState(true);
    message.success("Like sent");
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
          <div className="viewProfile">
            {profile ? (
              <Row>
                <Col span={6}>
                  <Image
                    className="viewProfile__image"
                    src={`http://localhost:5000/images/${profile.imageUrl}`}
                  />
                  <Typography.Title level={4} style={{ marginTop: "1rem" }}>
                    Birthday: {profile.birthday}
                  </Typography.Title>
                  <Typography.Title level={4}>
                    Gender:{" "}
                    {profile.gender === 0
                      ? "Male"
                      : profile.gender === 1
                      ? "Female"
                      : "Other"}
                  </Typography.Title>
                </Col>
                <Col span={18}>
                  <div style={{ padding: "0 2rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Title level={2} style={{ margin: "0" }}>
                        @{profile.username}
                      </Typography.Title>
                      <Typography.Text>
                        <GlobalOutlined style={{ marginRight: "1rem" }} />
                        {profile.region}, {profile.country}
                      </Typography.Text>
                    </div>
                    <Typography.Title level={5} style={{ fontSize: ".8rem" }}>
                      {profile.full_name}
                    </Typography.Title>
                    <Typography.Title level={5} style={{ fontSize: ".8rem" }}>
                      Email: {profile.email}
                    </Typography.Title>
                    <Typography.Title level={5} style={{ fontSize: ".7rem" }}>
                      Short bio: {profile.desctiption}
                    </Typography.Title>
                    <Typography.Title level={5} style={{ fontSize: ".7rem" }}>
                      Hobits: {profile.hobits.toString()}
                    </Typography.Title>
                    <div className="viewProfile__btnContainer">
                      <Button
                        className="viewProfile__btn"
                        type="primary"
                        onClick={() => history.push("/message")}
                      >
                        Send message
                      </Button>
                      <Button
                        className="viewProfile__btn"
                        type="primary"
                        disabled={btnState}
                        onClick={() => sendLike(profile.id)}
                      >
                        {btnText}
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <div>
                <Spin />
              </div>
            )}
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

ViewUser.propTypes = {};

const mapStateToProps = (state) => ({
  profile: state.auth.viewProfile,
});

export default connect(mapStateToProps, { getUserProfile, likePeople })(
  ViewUser
);
