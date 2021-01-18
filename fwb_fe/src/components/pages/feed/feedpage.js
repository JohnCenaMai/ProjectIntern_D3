import React, { Fragment, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./feedPage.css";
import FeedItem from "../../common/feedItem/feedItem";
import CreateFeed from "../../common/createFeed/createFeed";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "./../../../redux/actions/post";

function FeedPage({ getPosts, posts: { posts } }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <Row>
        <Col span={5}>
          <Sidebar />
        </Col>
        <Col span={12}>
          <div className="feedPage">
            <div className="feedPage__container">
              <CreateFeed />
              {posts.length === 0 ? (
                <div className="feedPage--noFeeds">
                  <img src="https://howzuapp.com/web/static/media/no-visiters-premium.3898f035.png" />
                </div>
              ) : (
                <div className="feedPage--content">
                  {posts.map((post) => (
                    <FeedItem key={post.id} post={post} />
                  ))}
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

FeedPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(FeedPage);
