import React, { useState, useEffect, useRef } from "react";
import "./PixelatedFlagQuiz.css";
import { useParams } from "react-router-dom";

/* Components */
import NavHeader from "../../global_components/nav_header/NavHeader";
import AutoComplete from "../../global_components/auto_complete/AutoComplete";
import Tile from "./Tile";
import LossCard from "../../global_components/loss_card/LossCard.js";

/* Constants */
import { Aliases } from "../../const/Aliases";
import { FlagKnowledgeList } from "../../const/FlagKnowledgeList.js";
import Countries from "../../json/lists/ISO_to_country_name";

/* Functions */
import Minify from "../../const/Minify";
import { findFlagUrlByIso3Code } from "country-flags-svg";

const NUM_ROWS = 4;
const NUM_COLUMNS = 4;
let hidden = [];

export default function FlagQuiz () {
  const [targetCountry, setTargetCountry] = useState(null);
  const [hasLost, setHasLost] = useState(false);
  const [tileCoordinates, setTileCoordinates] = useState(null);
  const [blockSize, setBlockSize] = useState(0);
  const [dimensions, setDimensions] = useState(null);
  const [divide, setDivide] = useState(0);
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState(0);
  const [revealed, setRevealed] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [choices, setChoices] = useState([]);

  const FlagRef = useRef();

  const params = useParams();

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (FlagRef.current) {
      divideFlag();
    }
  }, [divide]);

  const generateTargetCountry = () => {
    let tempChoices = choices;

    if (targetCountry === null) {
      const initialSlice = FlagKnowledgeList.slice(0, getRange(params.dif));
      setChoices(initialSlice);
      tempChoices = initialSlice;
    }

    const rand = Math.floor(Math.random() * tempChoices.length);
    const newISO = tempChoices[rand];
    tempChoices = tempChoices.filter(item => item !== newISO);
    const image = findFlagUrlByIso3Code(newISO);
    setImage(image);
    setTargetCountry(newISO);

    if (tempChoices.length === 0) {
      setChoices(FlagKnowledgeList.slice(0, getRange(params.dif)));
      return;
    }
    setChoices(tempChoices);
  };

  const getRange = (difficulty) => {
    if (difficulty === "Easy") {
      return 10;
    }
    if (difficulty === "Medium") {
      return 30;
    }
    if (difficulty === "Hard") {
      return 100;
    }
    if (difficulty === "Impossible") {
      return 197;
    }
  };

  const onEnter = (text) => {
    text = Minify(text);
    const foundCountry = Aliases[text];
    if (foundCountry) {
      if (foundCountry === targetCountry) {
        setPoints(points + scoreFunct(revealed - 1));
        setTileCoordinates(null);
        resetHidden();
        setTargetCountry(null);
        generateTargetCountry();
        setRevealed(1);
      } else {
        handleLoss();
      }
      return true;
    }
    return false;
  };

  const handleLoss = () => {
    setGameOver(true);
    hidden = [];
    setHasLost(true);
  };

  const exitCard = () => {
    setGameOver(false);
  };

  const handleReset = () => {
    setGaveUp(false);
    setGameOver(false);
    setPoints(0);
    setHasLost(false);
    generateTargetCountry();
    startGame();
    setRevealed(1);
  };

  const divideFlag = () => {
    const dimensions = [FlagRef.current.width, FlagRef.current.height];
    setDimensions(dimensions);
    // const blockSize = [dimensions[0] / NUM_COLUMNS, dimensions[1] / NUM_ROWS];
    const blockSize = [parseInt(dimensions[0] / NUM_COLUMNS), parseInt(dimensions[1] / NUM_ROWS)];
    setBlockSize(blockSize);
    const tileLocations = [];
    for (let xCoord = 0; xCoord < NUM_COLUMNS; ++xCoord) {
      for (let yCoord = 0; yCoord < NUM_ROWS; ++yCoord) {
        tileLocations.push([xCoord * blockSize[0], yCoord * blockSize[1]]);
      }
    }
    setTileCoordinates(tileLocations);
  };

  const startGame = () => {
    resetHidden();
    generateTargetCountry();
  };

  const resetHidden = () => {
    hidden = [];
    for (let i = 0; i < NUM_ROWS; ++i) {
      for (let j = 0; j < NUM_COLUMNS; ++j) {
        hidden.push(i * NUM_COLUMNS + j);
      }
    }
    const randIndex = Math.floor(Math.random() * hidden.length);
    hidden.splice(randIndex, 1);
  };

  const pruneRandom = () => {
    if (hidden.length === NUM_ROWS * NUM_COLUMNS) return;
    if (hidden.length > 0) {
      const randIndex = Math.floor(Math.random() * hidden.length);
      hidden.splice(randIndex, 1);
    }
    setRevealed(revealed + 1);
  };

  const giveUp = () => {
    setGaveUp(true);
    handleLoss();
  };

  const scoreFunct = (x) => {
    let actualValue = parseInt(1000 * Math.exp(-1 * (x / 5)));
    actualValue += actualValue % 25 === 0 ? 0 : 25 - (actualValue % 25);
    return actualValue;
  };

  return (
    <div className="pixel-flag-wrapper">
      <NavHeader name="Pixelated Flags" />
      <h1 className="correct-answer">
        {gameOver ? <LossCard overrideReset="Close" gaveUp={gaveUp} message="The correct answer is " scoreMessage="You had a score of " score={points} handleReset={exitCard} correctAnswer={Countries[targetCountry]} /> : ""}
      </h1>
      <div className="pixel-flag-header-wrapper">
        <h1 className="pixel-flag-points">
          {"Points: " + points}
        </h1>
        {targetCountry
          ? <img onLoad={() => setDivide(divide + 1)} src={image} alt="" className="pixel-flag-flag" ref={FlagRef} />
          : ""}
        <div className="tile-wrapper" style={{ width: blockSize[0] * NUM_COLUMNS, height: "calc(30vh + 2em)" }}>
          {tileCoordinates
            ? [...Array(NUM_COLUMNS * NUM_ROWS)].map(function render (elem, index) {
              if (!(hidden.includes(index))) {
                return (
                  <Tile blank={false} coordinates={tileCoordinates[index]} blockSize={blockSize} image={image} dimensions={dimensions} />
                );
              }
              return (
                <Tile key={elem} blank={true} coordinates={tileCoordinates[index]} blockSize={blockSize} dimensions={dimensions} />
              );
            })
            : ""}
        </div>
      </div>

      <div className="pixel-flag-reveal-next-wrapper">
        {tileCoordinates ? <button className="hollow pixel-flag-reveal-next" onClick={() => pruneRandom()}>Reveal Next</button> : ""}
      </div>
      <div className="pixel-flag-input-wrapper">
        <AutoComplete disabled={hasLost} onEnter={(text) => onEnter(text)} />
      </div>
      <div className="pixel-flag-button-wrapper">
        {hasLost ? <button className="hollow light" onClick={() => handleReset()}>Reset</button> : ""}
        {tileCoordinates && !hasLost ? <button className="hollow light" onClick={() => giveUp()}>Give Up</button> : ""}
      </div>
    </div>
  );
}
