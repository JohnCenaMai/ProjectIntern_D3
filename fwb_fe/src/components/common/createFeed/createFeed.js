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

function CreateFeed({ addPost }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "" || file === null) {
      alert("Please write something");
    }

    const token = getCookie("jwt");

    addPost(text, file, token);
    setText("");
  };

  return (
    <Row>
      <Col span={24} push={3}>
        <div className="createFeed">
          <Typography.Title level={3}>How do you feel now?</Typography.Title>
          <form onSubmit={(e) => handleSubmit(e)} className="createFeed__form">
            <Input.TextArea
              value={text}
              bordered={false}
              showCount
              maxLength={1000}
              rows={3}
              onChange={(e) => setText(e.target.value)}
              placeholder="Let's help people know more about this"
            />
            <Divider />
            <div className="createFeed__form--action">
              <div className="upload-btn-wrapper">
                <button className="btn">Upload a file</button>
                <input
                  type="file"
                  name="myfile"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <button className="createFeed__form--button discardBtn">
                  Discard
                </button>
                <button
                  className="createFeed__form--button postBtn"
                  type="submit"
                >
                  Post
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
