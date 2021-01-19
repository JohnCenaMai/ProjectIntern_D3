import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  DatePicker,
  Alert,
  Radio,
  Button,
  message,
} from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./editProfile.css";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import moment from "moment";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { editProfile, loadUser } from "./../../../redux/actions/auth";
import { connect } from "react-redux";
import { getCookie } from "../../../utils/cookie";
import store from "./../../../redux/store";

function EditProfile({ user, editProfile, loadUser, alerts }) {
  const [username, setUsername] = useState(user.username);
  const [fullname, setFullname] = useState(user.full_name);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [birthday, setBirthday] = useState(user.birthday);
  const [country, setCountry] = useState(user.country);
  const [region, setRegion] = useState(user.region);

  const handleSave = () => {
    const token = getCookie("jwt");
    editProfile(
      user.id,
      token,
      username,
      fullname,
      email,
      birthday,
      gender,
      description,
      country,
      region
    );
    message.success("Profile Updated!");
  };

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
              <Form.Item label="Username" name="username">
                <Input
                  placeholder="Username"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Full name" name="full_name">
                <Input
                  placeholder="Full name"
                  defaultValue={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input
                  placeholder="Email"
                  disabled
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Birthday" name="age">
                <DatePicker
                  onChange={(date, dateString) => setBirthday(dateString)}
                  defaultValue={moment(birthday, "YYYY/MM/DD")}
                />
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                <Radio.Group
                  defaultValue={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <Radio value={0}>Male</Radio>
                  <Radio value={1}>Female</Radio>
                  <Radio value={2}>Other</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="About you" name="bio">
                <Input.TextArea
                  placeholder="Bio"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Location">
                <CountryDropdown
                  value={country}
                  className="locationSelect"
                  onChange={(val) => setCountry(val)}
                />
                <RegionDropdown
                  country={country}
                  value={region}
                  className="locationSelect"
                  onChange={(val) => setRegion(val)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="editProfile__btn"
                  type="primary"
                  onClick={handleSave}
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

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  alerts: state.alert,
});

export default connect(mapStateToProps, { editProfile, loadUser })(EditProfile);
