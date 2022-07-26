import React from "react";

import "./LossCard.css";
import Confetti from "react-confetti";

export default function LossCard(props) {
  const getMessage = () => {
    if (props.gaveUp) {
      return "You gave up!";
    }
    if (props.fail) {
      return "Sorry, that's not correct.";
    }
  };

  const getColors = () => {
    if (props.medalFunction[2] === "Gold") {
      return ["#FAFAD2", "#EEE8AA", "#F0E68C", "#DAA520", "#FFD700"];
    }

    if (props.medalFunction[2] === "Silver") {
      return ["#c0c0c0", "#f8f8ff", "f5f5f5", "#dcdcdc"];
    }

    if (props.medalFunction[2] === "Bronze") {
      return ["b08d57", "#E3AF66", "#A37E49"];
    }
  };

  const getNumberOfPieces = () => {
    if (props.medalFunction[2] === "Gold") {
      return 1000;
    }

    if (props.medalFunction[2] === "Silver") {
      return 500;
    }

    if (props.medalFunction[2] === "Bronze") {
      return 250;
    }
  };

  return (
    <div className="loss-card-wrapper">
      <div className="loss-card-inner-wrapper">
        <div className="loss-card-medal-wrapper">
          {props.medal ? <img className="medal-animate-in" src={props.medalFunction[0]} /> : ""}
          {props.medal ? <h1>{props.medalFunction[1]}</h1> : ""}
          {props.medal
            ? <Confetti
              width={window.screen.width}
              height={window.screen.height}
              recycle={false}
              tweenDuration={10000}
              numberOfPieces={getNumberOfPieces()}
              colors={getColors()}
            />
            : ""}
        </div>
        <div className="loss-card-title">
          {getMessage()}
          <br />
          {props.message}<span className="loss-card-country-name">{props.correctAnswer}</span>!
        </div>
        <br />
        <div className="loss-card-subtitle">
          {props.scoreMessage}{props.score}.
        </div>
        <button onClick={props.handleReset} className="hollow">{props.overrideReset ? props.overrideReset : "Reset"}</button>
      </div>
    </div>
  );
}
