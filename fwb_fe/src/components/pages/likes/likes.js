import React, { Fragment, useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Empty,
  Button,
  List,
  Skeleton,
  Avatar,
  message,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  WechatOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "../../common/sidebar/sider";
import "./likes.css";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getReceivedLikes,
  getSentLikes,
  acceptLike,
  rejectLike,
} from "./../../../redux/actions/matching";

function Likes({
  sentLikes,
  acceptLike,
  rejectLike,
  getSentLikes,
  receiveLikes,
  getReceivedLikes,
}) {
  useEffect(() => {
    getSentLikes();
    getReceivedLikes();
  }, []);

  const accept = (id) => {
    acceptLike(id);
    message.success("You accept this like!");
  };

  const reject = (id) => {
    rejectLike(id);
    message.warning("You rejected this like!");
  };

  return (
    <Fragment>
      <Row>
        <Col span={5}>
          <Sidebar />
        </Col>
        <Col span={19}>
          <div className="receiveLikes">
            <Typography.Title level={3} style={{ width: "80%" }}>
              Receive ({receiveLikes.length})
            </Typography.Title>
            {receiveLikes.length > 0 ? (
              <List
                className="receiveLikes__list"
                itemLayout="horizontal"
                dataSource={receiveLikes}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => accept(item.userId)}
                      >
                        Accept
                      </Button>,
                      <Button
                        type="primary"
                        onClick={() => reject(item.userId)}
                      >
                        Reject
                      </Button>,
                    ]}
                  >
                    <Skeleton avatar title={false} loading={false} active>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={
                              item.imageUrl
                                ? `http://localhost:5000/images/${item.imageUrl}`
                                : "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg"
                            }
                          />
                        }
                        title={<a href="https://ant.design">{item.username}</a>}
                        description={`You received this like at ${moment(
                          item.created_at
                        ).format("DD-MM-YYYY")}`}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
            ) : (
              <Empty />
            )}
          </div>
          <div className="likes">
            <Typography.Title level={3} style={{ width: "80%" }}>
              Sent
            </Typography.Title>
            {sentLikes.length > 0 ? (
              <List
                className="likes__list"
                itemLayout="horizontal"
                dataSource={sentLikes}
                renderItem={(item) => (
                  <List.Item>
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={
                              item.imageUrl
                                ? `http://localhost:5000/images/${item.imageUrl}`
                                : "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg"
                            }
                          />
                        }
                        title={<a href="https://ant.design">{item.username}</a>}
                        description={`You sent a like for this user ${moment(
                          item.created_at
                        ).format("DD-MM-YYYY")}`}
                      />
                      <div>Pending...</div>
                    </Skeleton>
                  </List.Item>
                )}
              />
            ) : (
              <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg">
                <Button>Create now</Button>
              </Empty>
            )}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}
Likes.propTypes = {};

const mapStateToProps = (state) => ({
  sentLikes: state.matching.likes,
  receiveLikes: state.matching.receives,
});

export default connect(mapStateToProps, {
  getReceivedLikes,
  acceptLike,
  rejectLike,
  getSentLikes,
})(Likes);
