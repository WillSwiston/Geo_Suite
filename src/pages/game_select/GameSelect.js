import React from "react";
import "./GameSelect.css";

/* Functions */
import { Link } from "react-router-dom";

/* Constants */
import { CardList } from "./const/CardList";

export default function GameSelect() {
  return (
    <div className="game-select-wrapper">
      <button className="button-close"></button>
      <div className="game-select-card-wrapper">
        {CardList.map((key, index) =>
        <div className="game-select-value-option" key={index} style={{ "--background-color": key.backgroundColor }} >
            <h1 className="game-select-card-title">
              {key.name}
            </h1>
            <div className="game-select-image-wrapper">
              <img src={key.img} alt="" />
            </div>
            <h1 className="game-select-subtitle">
              {key.subtitle}
            </h1>
            <h2 className="game-select-instructions">
              {key.instructions}
            </h2>
            <div className="game-select-button-wrapper">
              {key.diffLevels
                ? key.diffLevels.map(elem => {
                  return (
                    <Link key={elem} to={key.link + "/" + elem}>
                      <button className="hollow light">{elem}</button>
                    </Link>
                  );
                })
                : <Link to={key.link}>
                  <button className="hollow light">Play!</button>
                </Link>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
