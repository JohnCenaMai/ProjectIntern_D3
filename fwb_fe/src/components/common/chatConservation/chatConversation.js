import { message } from "antd";
import React, { useState, useEffect, useRef } from "react";
import ChatItem from "../chatItem/chatItem";
import "./chatConversation.css";

function ChatConversation() {
  const [messages, setMessages] = useState([
    {
      content: "Hello",
      from: "khaclam2409@gmail.com",
      createdAt: "12-12-2020",
    },
    {
      content:
        "This approach won't cover all browsers, and will be very specific to the browser's version you are working with during the development.",
      from: "khaclamvna@gmail.com",
      createdAt: "12-12-2021",
    },
    {
      content:
        "This approach won't cover all browsers, and will be very specific to the browser's version you are working with during the development.",
      from: "khaclamvna@gmail.com",
      createdAt: "12-12-2021",
    },
    {
      content: "Hello",
      from: "khaclam2409@gmail.com",
      createdAt: "12-12-2020",
    },
    {
      content: "Hello",
      from: "khaclam2409@gmail.com",
      createdAt: "12-12-2020",
    },
    {
      content: "Hello",
      from: "khaclam2409@gmail.com",
      createdAt: "12-12-2020",
    },
  ]);

  return (
    <div className="chatConversation">
      {messages.map((message) => (
        <ChatItem
          content={message.content}
          from={message.from}
          createdAt={message.createdAt}
        />
      ))}
    </div>
  );
}

export default ChatConversation;
