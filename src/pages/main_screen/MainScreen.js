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

    <div className="main-screen-play-wrapper">
      <h1>The interactive platform for learning geography!</h1>
      {!open ? <button onClick={() => setOpen(true)} className="menu"></button> : ""}
      {open ? <button onClick={() => setOpen(false)} className="button-close"></button> : ""}
    </div>

    {open ? <GameSelect /> : ""}
    </div>
  );
}

export default MainScreen;
