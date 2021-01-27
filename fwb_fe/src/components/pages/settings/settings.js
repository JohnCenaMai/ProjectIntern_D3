import React, { Fragment, useState } from "react";
import { Row, Col, Typography, Carousel, Button, Switch, Select } from "antd";
import Sidebar from "../../common/sidebar/sider";
import { LeftOutlined } from "@ant-design/icons";
import "./settings.css";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toogleDarkMode } from "./../../../redux/actions/settings";
import i18next from "i18next";

const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  vi: { label: "Vietnamese", dir: "ltr", active: false },
};

function Settings({ isDarkMode, toogleDarkMode, appbarColor, textColor }) {
  let history = useHistory();
  // const [language, setLanguage] = useState("")
  const selected = localStorage.getItem("i18nextLng") || "en";

  const handleChangeTheme = () => {
    toogleDarkMode();
  };

  const onLanguageChange = (val) => {
    console.log(val);
    i18next.changeLanguage(val);
  };

  return (
    <Fragment>
      <Row>
        <Col
          span={19}
          push={5}
          style={{ background: appbarColor, color: textColor }}
        >
          <Typography.Title
            style={{ cursor: "pointer" }}
            level={4}
            onClick={() => history.goBack()}
          >
            <LeftOutlined style={{ marginRight: "1rem" }} />
            Settings
          </Typography.Title>
          <div className="settings">
            <div className="settings__container">
              <div className="settings__section">
                <Typography.Title level={4} className="settings__sectionTitle">
                  Theme
                </Typography.Title>
                <div className="settings__sectionItem">
                  <Typography.Text>Dark/Light theme</Typography.Text>
                  <Switch
                    defaultChecked={isDarkMode}
                    onChange={handleChangeTheme}
                  />
                </div>
                <div className="settings__sectionItem">
                  <Typography.Text>Language</Typography.Text>
                  <Select
                    value={selected}
                    style={{ width: 120 }}
                    onChange={(val) => onLanguageChange(val)}
                  >
                    {Object.keys(languageMap)?.map((item) => (
                      <Select.Option value={item}>
                        {languageMap[item].label}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

Settings.propTypes = { toogleDarkMode: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
  isDarkMode: state.settings.isDarkMode,
  appbarColor: state.settings.appbarColor,
  textColor: state.settings.textColor,
});

export default connect(mapStateToProps, { toogleDarkMode })(Settings);
