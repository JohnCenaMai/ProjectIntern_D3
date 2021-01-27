import React, { Fragment, useState } from "react";
import { Layout, Image, Typography } from "antd";
import "./sider.css";
import { Menu, Row, Col, Avatar } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  AppstoreFilled,
  LoadingOutlined,
  EyeFilled,
  LikeFilled,
  StarFilled,
  HeartFilled,
  MessageFilled,
  EllipsisOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const { SubMenu } = Menu;
const { Sider } = Layout;

const ButtonPayment = styled.button`
  display: inline-block;
  outline: none;
  color: white;
  background-color: #ff2e68;
  font-size: 1em;
  margin: 3%;
  padding: 6%;
  border: 2px solid #ff4081;
  border-radius: 32px;
  width: 94%;
  cursor: pointer;
`;

function Sidebar({ user, appbarColor, textColor }) {
  const { t } = useTranslation();
  const [color, setColor] = useState("black");

  return (
    <Fragment>
      <Layout>
        <Sider>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            // onMouseUp={ChangeColorText}
            mode="inline"
            style={{
              backgroundColor: appbarColor,
              color: textColor,
              width: "20vw",
              overflowX: "hidden",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <Menu.Item style={{ textAlign: "center", marginBottom: "2rem" }}>
              <Link to="/find-near-you">
                <img
                  style={{ width: "150px" }}
                  alt="logo"
                  src="https://howzuapp.com/web/static/media/logo-c-64.60b36bd1.png"
                />
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/me" style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  style={{
                    backgroundColor: color,
                    verticalAlign: "middle",
                  }}
                  size="medium"
                  src={
                    user === null
                      ? ""
                      : `http://localhost:5000/images/${user.imageUrl}`
                  }
                ></Avatar>
                <Typography.Title
                  level={5}
                  style={{ paddingLeft: "1rem", margin: "0" }}
                >
                  {user === null ? "" : user.username}
                </Typography.Title>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SearchOutlined />}>
              <Link to="/find-new-people">{t("find_new_people")}</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
              <Link to="/suggest">{t("suggested")}</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<MessageFilled />}>
              <Link to="/message">{t("messages")}</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<HeartFilled />}>
              <Link to="/feeds">{t("feeds")}</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<HeartFilled />}>
              <Link to="/">{t("matches")}</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<LikeFilled />}>
              <Link to="/likes">{t("likes")}</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<SettingOutlined />}>
              <Link to="/settings">{t("settings")}</Link>
            </Menu.Item>

            {user !== null && user.role === "free" && (
              <ButtonPayment>
                <Link to="/payment" style={{ color: "white" }}>
                  {t("become_a_premium_member")}
                </Link>
              </ButtonPayment>
            )}
          </Menu>
        </Sider>
      </Layout>
    </Fragment>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  appbarColor: state.settings.appbarColor,
  textColor: state.settings.textColor,
});

export default connect(mapStateToProps, {})(Sidebar);
