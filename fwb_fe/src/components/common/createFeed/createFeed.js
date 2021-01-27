import React, { useState } from "react";
import "./createFeed.css";
import {
  Upload,
  Button,
  Row,
  Col,
  message,
  Divider,
  Typography,
  Input,
  Form,
} from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "./../../../redux/actions/post";
import { getCookie } from "./../../../utils/cookie";
import { useTranslation } from "react-i18next";

function CreateFeed({ addPost }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "" || file === null) {
      alert("Please write something and choose an image");
      return;
    }

    const token = getCookie("jwt");

    addPost(text, file, token);
    setText("");
  };

  return (
    <Row>
      <Col span={24} push={3}>
        <div className="createFeed">
          <Typography.Title level={3}>{t("create_feed")}</Typography.Title>
          <form onSubmit={(e) => handleSubmit(e)} className="createFeed__form">
            <Input.TextArea
              value={text}
              bordered={false}
              showCount
              maxLength={1000}
              rows={3}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("post_decription")}
            />
            <Divider />
            <div className="createFeed__form--action">
              <div className="upload-btn-wrapper">
                <button className="btn">{t("choose_an_image")}</button>
                <input
                  type="file"
                  name="myfile"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <button
                  className="createFeed__form--button postBtn"
                  type="submit"
                >
                  {t("post")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addPost })(CreateFeed);
