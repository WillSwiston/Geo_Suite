import React, { useState, useEffect } from "react";
import "./BorderQuiz.css";

/* Components */
import AutoComplete from "../../global_components/auto_complete/AutoComplete";
import NavHeader from "../../global_components/nav_header/NavHeader";
import LossCard from "../../global_components/loss_card/LossCard";

/* Constants */
import { Aliases } from "../../const/Aliases";
import { FlagKnowledgeList } from "../../const/FlagKnowledgeList.js";
import Countries from "../../json/lists/ISO_to_country_name.json";
import Borders from "../../json/Borders.json";
import CountryToISO from "../../json/lists/country_name_to_ISO.json";

/* Functions */
import Minify from "../../const/Minify";
import { findFlagUrlByIso3Code } from "country-flags-svg";
import { useParams } from "react-router-dom";

/* Assets  */
import GoldMedal from "../../assets/GoldMedal.png";
import SilverMedal from "../../assets/SilverMedal.png";
import BronzeMedal from "../../assets/BronzeMedal.png";

export default function FlagQuiz () {
  const [targetCountry, setTargetCountry] = useState(null);

  const [numAsked, setNumAsked] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);

  const [hasLost, setHasLost] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);

  const [correctChoice, setCorrectChoice] = useState("");
  const [correctISO, setCorrectISO] = useState("");
  const [first, setFirst] = useState("");
  const [third, setThird] = useState("");
  const [choiceList, setChoiceList] = useState([]);

  const params = useParams();

  useEffect(() => {
    generateTargetCountry();
  }, []);

  const showWrongCard = () => {
    setWrongGuess(true);
    const timeout = setTimeout(function () {
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
    // CountryToISO
    const candidates = Borders.filter(function (i, n) {
      return Borders[n].borders.length >= 4;
    });

    const firstRandomCountry = candidates[Math.floor(Math.random() * candidates.length)];
    const firstRandomISO = CountryToISO[firstRandomCountry.name];
    const firstRandomName = Countries[firstRandomISO];

    // We have a country with 4+ borders

    const targetCountryISO = firstRandomCountry.borders[Math.floor(Math.random() * firstRandomCountry.borders.length)];
    const targetCountryName = Countries[targetCountryISO];
    const targetCountry = Borders.filter(function (i, n) {
      return Borders[n].name === targetCountryName;
    });
    console.log(targetCountry);

    // We have the target country
    const candidateBorders = [];
    targetCountry[0].borders.forEach(elem => {
      if (elem !== firstRandomISO) {
        candidateBorders.push(elem);
      }
    });

    const thirdCountry = candidateBorders[Math.floor(Math.random() * candidateBorders.length)];
    const thirdCountryName = Countries[thirdCountry];
    let thirdCountryBorders = Borders.filter(function (i, n) {
      return Borders[n].name === thirdCountryName;
    });

    thirdCountryBorders = thirdCountryBorders[0].borders;
    // firstRandomCountry - name, borders
    // targetCountry[0] - name, borders
    // targetCountryISO - ISO
    // thirdCountryBorders - name, borders

    const totalSet = [];
    firstRandomCountry.borders.forEach(elem => {
      if (elem !== targetCountryISO) { totalSet.push(elem) }
    });

    thirdCountryBorders.forEach(elem => {
      if (elem !== targetCountryISO && !(totalSet.includes(elem))) { totalSet.push(elem) }
    });

    setFirst(firstRandomName);
    setThird(thirdCountryName);
    setCorrectChoice(targetCountry[0].name);
    setChoiceList(totalSet);
    setCorrectISO(targetCountryISO);
  };

  const onEnter = (text) => {
    text = Minify(text);
    const foundCountry = Aliases[text];
    if (foundCountry) {
      setNumAsked(numAsked + 1);
      if (foundCountry === correctISO) {
        // User has correctly guessed the country
        setNumCorrect(numCorrect + 1);
        generateTargetCountry();
      } else {
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
            Oops, not quite! The correct answer is <span>{Countries[correctISO]}</span>!
          </h1>
        </div>
        : ""}
      <NavHeader name="Border Quiz" />
      <div className="flag-quiz-header-wrapper">
        <h1>
          {first}
        </h1>
        <div className="border-choices">
          {choiceList ? choiceList.map(elem => <img key={elem} src={findFlagUrlByIso3Code(elem)} className="border-image"/>) : ""}
        </div>
        <h1>
          {third}
        </h1>
      </div>
      <div className="flag-quiz-autocomplete-wrapper">
        <AutoComplete disabled={wrongGuess} onEnter={onEnter} />
      </div>
      {hasLost
        ? <div>
          <LossCard fail={false} medalFunction={determineMedal()} medal={numAsked > 9 && getScore() >= 30} message="The correct country is " scoreMessage={getScoreMessage()} handleReset={handleReset} score={getScore()} correctAnswer={correctChoice} />
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

//    {choiceList ? choiceList.map(elem => <img key={elem} src={findFlagUrlByIso3Code(CountryToISO(elem))}/>) : ""}
// {choiceList ? choiceList.map(elem => <h1 key={elem}>{elem}</h1>) : ""}
