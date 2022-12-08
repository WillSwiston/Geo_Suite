import React, { useState, useEffect } from "react";
import "./LanguageQuiz.css";

/* Components */
import NavHeader from "../../global_components/nav_header/NavHeader.js";

/* Constants */
import { useParams } from "react-router-dom";
import Translations from "./translations.json";
import { Legend } from "./LangCodeToName.js";

export default function LanguageQuiz (props) {
  const [targetText, setTargetText] = useState("");
  const [choices, setChoices] = useState([]);
  const [streak, setStreak] = useState(0);

  const params = useParams();

  useEffect(() => {
    generateTargetLanguage();
  }, []);

  const generateTargetLanguage = () => {
    const translationChoices = Translations;
    const translationIndicies = Object.keys(Translations);
    const translationLength = translationIndicies.length;
    const choiceList = [];

    const pool = [];
    const threshold = 0.9;

    if (params.dif === "Hard") {
      const randomIndex = translationIndicies[Math.floor(Math.random() * translationLength)];
      const option = [Translations[randomIndex], randomIndex];
      const chosenFamily = option[0].family;

      for (const entry in Translations) {
        if (Translations[entry].family === chosenFamily || Math.random() > threshold) {
          pool.push([Translations[entry], entry]);
        }
      }
    }

    if (params.dif === "Easy") {
      const randomIndex = translationIndicies[Math.floor(Math.random() * translationLength)];
      const option = [Translations[randomIndex], randomIndex];

      for (const entry in Translations) {
        pool.push([Translations[entry], entry]);
      }
    }

    const poolLength = pool.length;

    while (choiceList.length < 4) {
      const candidateChoice = pool[Math.floor(Math.random() * poolLength)];
      if (!(choiceList.includes(candidateChoice))) {
        choiceList.push(candidateChoice);
      }
    }

    const randomIndex = Math.floor(Math.random() * choiceList.length);
    setTargetText(choiceList[randomIndex][0].translation);
    setChoices(choiceList);
  };

  const handleChoice = (choice) => {
    if (choice[0].translation === targetText) {
      generateTargetLanguage();
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="language-quiz-wrapper">
      <NavHeader name="Language Quiz" />
      <div className="language-quiz-streak">
        Streak: {streak}
      </div>
      <div className="language-quiz-text">
        {targetText}
      </div>
      <div className="language-quiz-button-wrapper">
        {choices ? choices.map(elem => <button className="hollow light" key={elem} onClick={() => handleChoice(elem)}>{Legend[elem[1]]}</button>) : ""}
      </div>
    </div>
  );
}
