import React, { useState } from "react";
import "./createFeed.css";
import { Upload, Button, message, Divider, Typography, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function CreateFeed() {
  const [fileList, updateFileList] = useState([]);

  const props = {
    fileList,
    beforeUpload: (file) => {
      console.log(file);
      if (file.type !== "image/png" || file.type !== "image/jpeg") {
        message.error(`${file.name} is not a image file`);
      }

      return file.type === "image/png" || file.type === "image/jpeg";
    },
    onChange: (info) => {
      console.log(info.fileList);
      updateFileList(info.fileList.filter((file) => !!file.status));
    },
  };

  return (
    <div className="createFeed">
      <Typography.Title level={3}>How do you feel now?</Typography.Title>
      <form className="createFeed__form">
        <Input.TextArea
          bordered={false}
          showCount
          maxLength={1000}
          rows={3}
          placeholder="Let's help people know more about this"
        />
        <Divider />
        <div className="createFeed__form--action">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload png only</Button>
          </Upload>
          <div>
            <button className="createFeed__form--button discardBtn">
              Discard
            </button>
            <button className="createFeed__form--button postBtn">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateFeed;
