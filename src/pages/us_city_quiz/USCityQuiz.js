import React, { useState, useEffect } from "react";
import "./USCityQuiz.css";

/* Components */
import NavHeader from "../../global_components/nav_header/NavHeader";
import AutoComplete from "../../global_components/auto_complete/AutoComplete";
import MapElement from "../../global_components/map_element/MapElement";

/* Constants */
import CityNames from "../../json/lists/us_city_population.json";
import Top5 from "../../json/lists/top_5_each_state.json";
import Regions from "../../json/lists/united_states_regions.json";

/* Functions */
import Minify from "../../const/Minify";

let hints = {};
export default function USCities(props) {
  const [currentCity, setCurrentCity] = useState();
  const [currentState, setCurrentState] = useState();
  const [points, setPoints] = useState(0);
  const [jsonKey, setJsonKey] = useState(0);

  useEffect(() => {
    generateCity();
  }, []);

  const generateCity = () => {
    hints = {};
    // const randomIndex = Math.floor(Math.random() * 1000);
    // const randomEntry = Object.keys(CityNames)[randomIndex];
    // console.log(CityNames[randomEntry].state);
    // setCurrentCity(CityNames[randomEntry]);
    // hints.population = CityNames[randomEntry].population;
    const randomIndex = Math.floor(Math.random() * 50);
    const randomState = Object.keys(Top5)[randomIndex];
    const randomStateCities = Top5[randomState];
    const randomCityIndex = Math.floor(Math.random() * 5);
    const randomCity = Object.keys(randomStateCities)[randomCityIndex];

    setCurrentCity(randomCity);
    setCurrentState(randomState);
    hints.population = Top5[randomState][randomCity];

    setJsonKey(jsonKey + 1);
  };

  const addHint = () => {
    const keys = Object.keys(hints);
    switch (keys.length) {
      case 1:
        hints.test = "another";
        setJsonKey(jsonKey + 1);
        break;
      case 2:
        break;
      default:
        break;
    }
  };

  const onEnter = (text) => {
    if (text.toLowerCase() === currentState.toLowerCase()) {
      generateCity();
      console.log("NICE");
      return true;
    } else {
      console.log(currentCity.state);
    }
  };

  const countryStyle = (feature, layer) => {
    if (Regions[feature.properties.name] === Regions[currentState]) {
      return {
        fillColor: "var(--map-country-background)",
        fillOpacity: "1",
        color: "var(--map-element-background)",
        weight: "1"
      };
    } else {
      return {
        fillColor: "var(--map-country-background)",
        fillOpacity: "0.2",
        color: "var(--map-element-background)",
        weight: "1"
      };
    }
  };

  return (
    <div className="us-cities-wrapper">
      <NavHeader name="US City Quiz" />
      <div className="us-cities-title">
        Which state is this city in?
      </div>
      <div className="us-cities-point-wrapper">
        Points: {points}
      </div>
      <div className="us-cities-name-wrapper">
        {currentCity}
      </div>
      <div className="us-cities-hint-wrapper">
        Hints:
        <br/>
        {hints.population ? "Population: " + hints.population : ""}
        <br/>
        <button className="hollow light chevron" onClick={() => addHint()}>Another Hint</button>
      </div>
      {Object.keys(hints).length > 1
        ? <div className="us-cities-map-wrapper">
          <MapElement geoJSONKey={jsonKey} data="states" countryStyle={countryStyle} mapCenter={[40, -100]} mapZoom={3} width="30vw" height="20vh" />
        </div>
        : ""
      }
      <AutoComplete override="states" onEnter={onEnter}/>
    </div>
  );
}
