import React from "react";
import "./Popup.css";

/* Functions */
import { findFlagUrlByIso3Code } from "country-flags-svg";

/* Constants */
import Countries from "../../json/lists/ISO_to_country_name.json";

function Popup (props) {
  return (
    <div className="popup-wrapper">
      {props.popupOptions.includes("Name") ? <div>{Countries[props.feature.properties.ISO_A3]}</div> : ""}
      {props.popupOptions.includes("Flag") ? <img src={findFlagUrlByIso3Code(props.feature.properties.ISO_A3)} alt="" /> : ""}
    </div>
  );
}

export default Popup;
