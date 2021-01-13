import { Typography } from "antd";
import React, { Fragment, useState } from "react";
import TinderCard from "react-tinder-card";
import "./tinderCards.css";

function TinderCards() {
  const [people, setPeople] = useState([
    {
      name: "Nancy",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/180506_%EB%AA%A8%EB%AA%A8%EB%9E%9C%EB%93%9C_%EC%84%9C%EB%93%A0%EC%96%B4%ED%83%9D_%ED%8C%AC%EB%AF%B8%ED%8C%85_%281%29.jpg",
    },
    {
      name: "Bill Gate",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/21/Meeting_with_Bill_Gates_-_Nov._8%2C_2019_%2849054512147%29_%28cropped%29.jpg",
    },
  ]);

  const handleSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  return (
    <Fragment>
      {people.map((person) => (
        <TinderCard
          onSwipe={handleSwipe}
          key={person.name}
          preventSwipe={["up", "down"]}
          className="swipe"
        >
          <div
            className="card"
            style={{ backgroundImage: `url(${person.imageUrl})` }}
          >
            <Typography.Title level={3}>{person.name}</Typography.Title>
          </div>
        </TinderCard>
      ))}
    </Fragment>
  );
}

export default TinderCards;
