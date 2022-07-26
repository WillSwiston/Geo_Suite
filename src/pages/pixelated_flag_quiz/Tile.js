import React from "react";
import "./PixelatedFlagQuiz.css";

export default function Tile(props) {
  const tileStyle = props.blank
    ? {
      width: props.blockSize[0],
      height: props.blockSize[1],
      transform: "translate(" + props.coordinates[0] + "px, " + props.coordinates[1] + "px)",
      background: "grey",
      "box-shadow": "inset 0 0 10px"
    }
    : {
      width: props.blockSize[0],
      height: props.blockSize[1],
      transform: "translate(" + props.coordinates[0] + "px, " + props.coordinates[1] + "px)",
      "background-image": "url(\"" + props.image + "\")",
      "background-repeat": "no-repeat",
      "background-size": props.dimensions[0] + "px " + props.dimensions[1] + "px",
      "background-position": props.coordinates[0] * -1 + "px " + props.coordinates[1] * -1 + "px"
    };
  return (
    <div style={{ ...tileStyle }} />
  );
};
