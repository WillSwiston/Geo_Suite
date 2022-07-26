import React, { useState } from "react";
import "./MainScreen.css";

/* Components */
import GameSelect from "../game_select/GameSelect.js";

/* Assets */
import GeoSuiteLogo from "./assets/GeoSuiteLogo.png";

function MainScreen() {
  const [open, setOpen] = useState(false);

  return (
    <div className="main-screen-wrapper">
    <img src={GeoSuiteLogo} alt="" />
      <div className="main-screen-inner-wrapper">
        {open ? <GameSelect /> : ""}
      </div>
      <div className="main-screen-play-wrapper">
      <h1 className="main-screen-title">Welcome to GeoSuite!</h1>
        {!open ? <button onClick={() => setOpen(true)} className="menu"></button> : ""}
      </div>
      {open ? <button onClick={() => setOpen(false)} className="button-close"></button> : ""}
    </div>
  );
}

export default MainScreen;
