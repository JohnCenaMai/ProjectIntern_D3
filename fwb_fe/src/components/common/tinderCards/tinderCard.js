import { Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { Button, Tooltip } from "antd";
import { LikeOutlined, CloseOutlined } from "@ant-design/icons";
import "./tinderCards.css";
import PropTypes from "prop-types";
import { getRandomUser, likePeople } from "./../../../redux/actions/matching";
import { connect } from "react-redux";

function TinderCards({ randoms, getRandomUser, likePeople }) {
  useEffect(() => {
    getRandomUser();
  }, []);

  console.log(randoms);
  const [people, setPeople] = useState(randoms);

  const handleSwipe = (direction, userId) => {
    switch (direction) {
      case "right":
        likePeople(userId);
        break;

      default:
        break;
    }
  };

  return (
    <Fragment>
      {people.map((person) => (
        <TinderCard
          onSwipe={(direction) => handleSwipe(direction, person.userId)}
          key={person.username}
          preventSwipe={["down"]}
          className="swipe"
        >
          <div
            className="card"
            style={{
              backgroundImage: `url('${
                person.imageUrl
                  ? `http://localhost:5000/images/${person.imageUrl}`
                  : "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg"
              }')`,
            }}
          >
            <Typography.Title level={3}>{person.username}</Typography.Title>
          </div>
        </TinderCard>
      ))}
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
    </Fragment>
  );
}

TinderCards.propTypes = {
  getRandomUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  randoms: state.matching.randoms,
});

export default connect(mapStateToProps, { getRandomUser, likePeople })(
  TinderCards
);
