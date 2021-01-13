import React from "react";
import { Avatar, Typography } from "antd";

function RecentChatItem() {
  return (
    <div className="recentChatItem">
      <Avatar size={64} />
      <div className="recentChatItem__infor">
        <Typography.Title level={4}>Last message</Typography.Title>
        <Typography.Text>Last message content</Typography.Text>
      </div>
    </div>
  );
}

export default RecentChatItem;
