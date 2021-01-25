import React, { Fragment, useEffect } from "react";
import { Row, Col, Typography } from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./match.css";
import TinderCards from "../../common/tinderCards/tinderCard";
import PropTypes from "prop-types";
import { getRandomUser, likePeople } from "./../../../redux/actions/matching";
import { connect } from "react-redux";

function Match({ randoms, getRandomUser, likePeople }) {
  useEffect(() => {
    getRandomUser();
  }, []);

  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <div className="match">
            <TinderCards randoms={randoms} likePeople={likePeople} />
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

Match.propTypes = {
  getRandomUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  randoms: state.matching.randoms,
});

export default connect(mapStateToProps, { getRandomUser, likePeople })(Match);
