import React, { Fragment, useState } from "react";
import "antd/dist/antd.css";
import { Row, Col, Avatar, Typography } from "antd";
import Sidebar from "../../common/sidebar/sider";
import Header from "../../common/header/header";
import "./feedPage.css";
import FeedItem from "../../common/feedItem/feedItem";
import CreateFeed from "../../common/createFeed/createFeed";

function FeedPage() {
  const [feeds, setFeeds] = useState([]);

  return (
    <Fragment>
      <Row>
        <Col span={5}>
          <Sidebar />
        </Col>
        <Col span={12}>
          <div className="feedPage">
            <h1>Feeds</h1>

            <div className="feedPage__container">
              <CreateFeed />
              {feeds.length === 0 ? (
                <div className="feedPage--noFeeds">
                  <img src="https://howzuapp.com/web/static/media/no-visiters-premium.3898f035.png" />
                </div>
              ) : (
                <div className="feedPage--content">
                  <FeedItem />
                  <FeedItem />
                  <FeedItem />
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col span={7}></Col>
      </Row>
    </Fragment>
  );
}

export default FeedPage;
