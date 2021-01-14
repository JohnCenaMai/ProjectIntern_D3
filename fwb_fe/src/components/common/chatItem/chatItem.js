import { Typography } from "antd";
import React, { useState } from "react";
import "./chatItem.css";

function ChatItem({ content, from, createdAt }) {
  // This is just a demo user
  const [user, setUser] = useState("khaclamvna@gmail.com");

  return (
    <div className={`chatItem ${user === from ? "myMessage" : ""}`}>
      <Typography.Text className="chatItem__from">{from}</Typography.Text>
      <Typography.Paragraph level={5} className="chatItem__message">
        {content}
      </Typography.Paragraph>
      <small className="chatItem__createdAt">{createdAt}</small>
    </div>
  );
}

export default ChatItem;
