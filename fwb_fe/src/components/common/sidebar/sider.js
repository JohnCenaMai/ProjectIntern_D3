import React, { Fragment, useState } from "react";
import { Layout, Image } from "antd";
import "./sider.css";
import { Menu, Row, Col, Avatar } from "antd";
import { Link } from "react-router-dom";
import {ButtonPayment} from './styles'
import {
  AppstoreFilled,
  LoadingOutlined,
  EyeFilled,
  LikeFilled,
  StarFilled,
  HeartFilled,
  MessageFilled,
  EllipsisOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar() {
  const [color, setColor] = useState("black");

  return (
    <Fragment>
      <Layout>
        <Sider>
          <Menu
            // defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            // onMouseUp={ChangeColorText}
            mode="inline"
            style={{
              width: "20vw",
              overflowX: "hidden",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <Menu.Item>
              <Row>
                <Image
                  style={{ width: "150px", marginLeft: "50%" }}
                  src="https://howzuapp.com/web/static/media/logo-c-64.60b36bd1.png"
                />
              </Row>
            </Menu.Item>
            <Menu.Item>
              <Link to="/me">
              <Row>
                <Col span={6}>
                  <Avatar
                    style={{ backgroundColor: color, verticalAlign: "middle" }}
                    size="medium"
                  ></Avatar>
                </Col>
                <Col span={12}>Sơn Đặng Cao</Col>
              </Row>
              </Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<LoadingOutlined />}>
              <Link to="/find-near-you"> People near you</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SearchOutlined />}>
              Find new people
            </Menu.Item>
            <Menu.Item key="3" icon={<EyeFilled />}>
              Visitors
            </Menu.Item>
            <Menu.Item key="4" icon={<MessageFilled />}>
              <Link to="/message">Message</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<HeartFilled />}>
              <Link to="/feeds">Feeds</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<HeartFilled />}>
              <Link to="/matches">Matches</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<StarFilled />}>
              Super Likes
            </Menu.Item>
            <Menu.Item key="8" icon={<LikeFilled />}>
              Likes
            </Menu.Item>
            <Menu.Item key="9" icon={<EllipsisOutlined />}>
              Help
            </Menu.Item>
            <SubMenu
              style={{ fontSize: "17px" }}
              key="sub1"
              icon={<AppstoreFilled />}
              title="Multi Language"
            >
              <Menu.Item key="10">English</Menu.Item>
              <Menu.Item key="11">Vietnam</Menu.Item>
              <Menu.Item key="12">China</Menu.Item>
            </SubMenu>
            <ButtonPayment>Become a Premium Member</ButtonPayment>
          </Menu>
        </Sider>
      </Layout>
    </Fragment>
  );
}

export default Sidebar;
