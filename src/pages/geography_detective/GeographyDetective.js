import React, { useState, useEffect, useRef } from "react";
import "./GeographyDetective.css";

/* Components */
import MapElement from "../../global_components/map_element/MapElement";
import WinBanner from "./win_banner/WinBanner";
import NavHeader from "../../global_components/nav_header/NavHeader";
import AutoComplete from "../../global_components/auto_complete/AutoComplete";
import Instructions from "./instructions/Instructions.js";

/* Constants */
import { Aliases } from "../../const/Aliases";
import { SmallCountries } from "../../const/small_countries.js";
import Distances from "../../json/lists/distances.json";
import { FlagKnowledgeList } from "../../const/FlagKnowledgeList.js";
import { useParams } from "react-router-dom";
import Countries from "../../json/lists/ISO_to_country_name.json";

/* Functions */
import ComputeColor from "./ComputeColor";
import Minify from "../../const/Minify";

let userGuesses = {};
function GeographyDetective() {
  const [key, setKey] = useState(0);
  const [targetISO, setTargetISO] = useState(null);
  const [hasWon, setHasWon] = useState(false);
  const [guessCounter, setGuessCounter] = useState(0);
  const [smallCountries, setSmallCountries] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [choices, setChoices] = useState([]);

  const counterRef = useRef();
  const params = useParams();

  useEffect(() => {
    generateTargetCountry();
  }, []);

  const getUpperBound = (difficulty) => {
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

  const generateTargetCountry = async() => {
    let tempChoices = choices;

    if (choices.length === 0) {
      const slice = FlagKnowledgeList.slice(0, getUpperBound(params.dif));
      await setChoices(slice);
      tempChoices = slice;
    }

    const rand = Math.floor(Math.random() * tempChoices.length);
    const newISO = tempChoices[rand];
    tempChoices = tempChoices.filter(item => item !== newISO);

    setTargetISO(newISO);

    setChoices(tempChoices);
  };

  // (feature, layer) to access layer.
  const countryStyle = (feature) => {
    const featureISO = feature.properties.ISO_A3;

    if (smallCountries && SmallCountries.indexOf(featureISO) !== -1) {
      const hasNotBeenGuessed = userGuesses[featureISO] === undefined;
      const color = hasNotBeenGuessed ? "var(--map-small-country-background)" : userGuesses[featureISO];

      return {
        fillColor: color,
        fillOpacity: "1",
        color: color,
        weight: "3"
      };
    }

    if (featureISO in userGuesses) {
      return {
        fillColor: userGuesses[featureISO],
        fillOpacity: "1",
        color: "var(--map-element-background)",
        weight: "1"
      };
    }

    return {
      fillColor: "var(--map-country-background)",
      fillOpacity: "1",
      color: "var(--map-element-background)",
      weight: "1"
    };
  };

  const onEnter = (text) => {
    const enteredText = Minify(text);
    const enteredISO = Aliases[enteredText];

    if (!enteredISO || userGuesses[enteredISO] !== undefined) return 0;

    setGuessCounter(guessCounter + 1);
    const candidate1 = Distances[enteredISO][targetISO];
    const candidate2 = Distances[targetISO][enteredISO];
    const distance = candidate1 === undefined ? candidate2 : candidate1;

    // Safe to assume it searched for distance to itself
    if (distance === undefined) {
      setHasWon(true);
      setGameOver(true);
      userGuesses[enteredISO] = "var(--geography-detective-won-color)";
      setKey(key + 1);
      return 1;
    }

    userGuesses[enteredISO] = ComputeColor(distance);
    setKey(key + 1);
    return 1;
  };

  const handleReset = () => {
    if (!(gameOver)) return;
    setHasWon(false);
    setGameOver(false);
    setKey(0);
    generateTargetCountry();
    userGuesses = {};
    setGuessCounter(0);
    counterRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSmallCountries = () => {
    setKey(key + 1);
    setSmallCountries(!smallCountries);
  };

  const handleGiveUp = () => {
    setGameOver(true);
  };

  return (
    <div className="geography-detective-wrapper">
      <NavHeader name="Geography Detective" />
      <div ref={counterRef} className="geography-detective-guess-counter-wrapper">
        Guesses: {guessCounter}
      </div>
      <MapElement popupFeatures={["Name", "Flag"]} geoJSONKey={key} countryStyle={countryStyle} />
      <AutoComplete disabled={gameOver} onEnter={(text) => onEnter(text)} />
      <div className="geography-detective-button-wrapper">
        {!gameOver ? <button className="hollow light" onClick={() => handleGiveUp()}>Give up</button> : ""}
        <button className="hollow light" onClick={() => counterRef.current.scrollIntoView({ behavior: "smooth" })}>Scroll Into View</button>
        <button onClick={() => toggleSmallCountries()} className="hollow light">Toggle Small Countries</button>
      </div>
      {targetISO && gameOver ? <WinBanner reset={handleReset} ISO={targetISO} guesses={guessCounter} name={Countries[targetISO]} hasWon={hasWon} /> : ""}
      <Instructions closeScroll={counterRef} />
    </div>
  );
}

export default GeographyDetective;
