import React, { useState, useEffect } from "react";
import "./FlagQuiz.css";

/* Components */
import AutoComplete from "../../global_components/auto_complete/AutoComplete";
import NavHeader from "../../global_components/nav_header/NavHeader";
import LossCard from "../../global_components/loss_card/LossCard";

/* Constants */
import { Aliases } from "../../const/Aliases";
import { FlagKnowledgeList } from "../../const/FlagKnowledgeList.js";
import Countries from "../../json/lists/ISO_to_country_name.json";

/* Functions */
import Minify from "../../const/Minify";
import { findFlagUrlByIso3Code } from "country-flags-svg";
import { useParams } from "react-router-dom";

/* Assets  */
import GoldMedal from "../../assets/GoldMedal.png";
import SilverMedal from "../../assets/SilverMedal.png";
import BronzeMedal from "../../assets/BronzeMedal.png";

export default function FlagQuiz() {
  const [targetCountry, setTargetCountry] = useState(null);

  const [numAsked, setNumAsked] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);

  const [hasLost, setHasLost] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);

  const [choices, setChoices] = useState([]);
  const [correctChoice, setCorrectChoice] = useState("");

  const params = useParams();

  useEffect(() => {
    generateTargetCountry();
  }, []);

  const showWrongCard = () => {
    setWrongGuess(true);
    const timeout = setTimeout(function() {
      setWrongGuess(false);
      clearTimeout(timeout);
      generateTargetCountry();
    }, 2000);
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

    setTargetCountry(newISO);

    if (tempChoices.length === 0) {
      setChoices(FlagKnowledgeList.slice(0, getRange(params.dif)));
      return;
    }
    setChoices(tempChoices);
  };

  const onEnter = (text) => {
    text = Minify(text);
    const foundCountry = Aliases[text];
    if (foundCountry) {
      setNumAsked(numAsked + 1);
      if (foundCountry === targetCountry) {
        // User has correctly guessed the country
        setNumCorrect(numCorrect + 1);
        generateTargetCountry();
      } else {
        setCorrectChoice(targetCountry);
        showWrongCard();
      }
      return true;
    }
    return false;
  };

  const handleLoss = () => {
    setHasLost(true);
  };

  const handleReset = () => {
    setNumAsked(0);
    setNumCorrect(0);
    setHasLost(false);
    generateTargetCountry();
  };

  const getScore = () => {
    if (numAsked === 0) return 0;
    const asPercent = numCorrect / numAsked * 100;
    return Math.round(asPercent);
  };

  const determineMedal = () => {
    const percentage = getScore();
    if (percentage > 80) {
      return [GoldMedal, "Congrats on the gold!", "Gold"];
    } else if (percentage > 50) {
      return [SilverMedal, "Congrats on the silver medal!", "Silver"];
    } else if (percentage > 30) {
      return [BronzeMedal, "You got a bronze medal!", "Bronze"];
    }
  };

  const getScoreMessage = () => {
    if (numAsked < 10) {
      return "Keep answering questions for a medal. You had a percentage of ";
    }
    const percentage = getScore();
    if (percentage > 80) {
      return "Holy smokes! You had a correct percentage of ";
    } else if (percentage > 50) {
      return "Good job, you had a correct percentage of ";
    } else if (percentage > 30) {
      return "Solid work, you had a correct percentage of ";
    }
    return "Good try, you had a correct percentage of ";
  };

  return (
    <div className="flag-quiz-wrapper">
      {wrongGuess === true
        ? <div className="flag-quiz-correct-answer">
          <h1 className="flag-quiz-correct-answer-card">
            Oops, not quite! The correct answer is <span>{Countries[correctChoice]}</span>!
          </h1>
        </div>
        : ""}
      <NavHeader name="Flag Quiz" />
      <div className="flag-quiz-header-wrapper">
        <h1 className="flag-quiz-streak">
          {numAsked > 9 ? "You have gotten " + getScore() + "% correct!" : `Guess ${10 - numAsked} more flags to see rank!`}
        </h1>
        {targetCountry ? <img src={findFlagUrlByIso3Code(targetCountry)} alt="" /> : ""}
      </div>
      <div className="flag-quiz-autocomplete-wrapper">
        <AutoComplete disabled={wrongGuess} onEnter={onEnter} />
      </div>
      {hasLost
        ? <div>
          <LossCard fail={false} medalFunction={determineMedal()} medal={numAsked > 9 && getScore() >= 30} message="The correct country is " scoreMessage={getScoreMessage()} handleReset={handleReset} score={getScore()} correctAnswer={Countries[targetCountry]} />
        </div>
        : ""}
      <div className="flag-quiz-footer">
        <div className="flag-quiz-footer-inner-wrapper">
          <button className="hollow" onClick={() => handleLoss()}>End</button>
        </div>
      </div>
    </div>
  );
}
