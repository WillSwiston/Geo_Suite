import React, { useEffect, useRef } from "react";
import "./WinBanner.css";

/* Functions */
import { findFlagUrlByIso3Code } from "country-flags-svg";

/* Constants */
import Capitals from "../../../json/lists/ISO_to_capital_name.json";
import Data from "world-countries-population-data";

function WinBanner (props) {
  const bannerRef = useRef();

  useEffect(() => {
    bannerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const getCapitalName = () => {
    const result = Capitals[props.ISO];
    if (typeof result === "object") {
      return formatCapitals(result);
    }

    return result;
  };

  const formatCapitals = (capitals) => {
    let totalString = "";
    for (let i = 0; i < capitals.length; ++i) {
      totalString += capitals[i] + ", ";
    }
    return totalString.substring(0, totalString.length - 2);
  };

  const getPopulation = () => {
    const population = Data.getPopulationByCountryCode(props.ISO);
    if (!population) {
      return "Unknown";
    }
    const currentPopulation = parseInt(population[2020]).toLocaleString("en-US");
    return currentPopulation;
  };

  const generateWinBanner = () => {
    let totalString = "";
    if (props.hasWon) {
      if (props.guesses === 1) {
        totalString += "Wow! You guessed the correct country first try!\n";
      } else {
        totalString += "You guessed the target country in " + props.guesses + " attempts!";
      }
    } else {
      return "You gave up!";
    }

    return totalString;
  };

  return (
    <div ref={bannerRef} className="win-banner-wrapper">
      <div className="win-banner-card">
        <div className="win-banner-text-wrapper">
          {generateWinBanner()}
        </div>
        <img src={findFlagUrlByIso3Code(props.ISO)} alt="" />
        <div className="win-banner-country-name">
          {props.name}
        </div>
        <hr className="geography-detective-hr" />
        <div className="win-banner-country-info">
          <ul>
            <li>Population: {getPopulation()}</li>
            <li>Capital(s): {getCapitalName()}</li>
          </ul>
        </div>
        <button onClick={props.reset} className="hollow">Reset</button>
      </div>
    </div>
  );
}

export default WinBanner;
