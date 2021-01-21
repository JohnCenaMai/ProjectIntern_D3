import React, { Fragment, useState } from "react";
import { Row, Col, Typography, Empty, Button, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  WechatOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "../../common/sidebar/sider";
import "./likes.css";

function Likes() {
  const [likes, setLikes] = useState([
    {
      userId: 80,
      username: "KhacLam",
      email: "khaclam@gmail.com",
      full_name: null,
      imageUrl: "image-1610933751135.jpeg",
      birthday: null,
      status: 0,
    },
    {
      userId: 92,
      username: "Son",
      email: "son@gmail.com",
      full_name: null,
      imageUrl: null,
      birthday: null,
      status: 2,
    },
  ]);

  return (
    <Fragment>
      <Row>
        <Col span={5}>
          <Sidebar />
        </Col>
        <Col span={19}>
          <Typography.Title level={3}>Likes</Typography.Title>
          <div className="likes">
            {likes.length > 0 ? (
              likes.map((like) => (
                <Card
                  className="likes__item"
                  hoverable
                  style={{ width: 240 }}
                  actions={[
                    <WechatOutlined key="chat" />,
                    <UserOutlined key="profile" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                  cover={
                    <img
                      alt={like.username}
                      className="like__itemImg"
                      src={
                        like.imageUrl
                          ? `http://localhost:5000/images/${like.imageUrl}`
                          : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
                      }
                    />
                  }
                >
                  <Card.Meta title={like.username} />
                  <Typography.Text>Lasdj</Typography.Text>
                </Card>
              ))
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

export default Likes;
