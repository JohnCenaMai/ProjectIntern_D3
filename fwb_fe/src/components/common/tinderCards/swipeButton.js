import { Button, Tooltip } from "antd";
import { LikeOutlined, CloseOutlined } from "@ant-design/icons";
import React from "react";
import "./swipeButton.css";

function SwipeButtons() {
  return (
    <div className="swipeButtons">
      <Button
        shape="circle"
        className="swipeButtons__item"
        icon={
          <CloseOutlined style={{ fontSize: "32px", color: "#f215158c" }} />
        }
      />
      <Button
        shape="circle"
        className="swipeButtons__item"
        icon={<LikeOutlined style={{ fontSize: "32px", color: "#07cdea" }} />}
      />
    </div>
  );
}

export default SwipeButtons;
