import React, { useState, useRef } from "react";
import "./Instructions.css";

/* Assets */
import Legend from "../assets/geo_detective_legend.png";

export default function Instructions (props) {
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionRef = useRef();

  const handlePress = async () => {
    const instruction = showInstructions;
    await setShowInstructions(!showInstructions);
    if (instruction) {
      props.closeScroll.current.scrollIntoView({ behavior: "smooth" });
    } else {
      instructionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="geography-detective-instructions-wrapper">
      <div className="geod-expander-wrapper">
        <button className="hollow" onClick={() => handlePress()}>Instructions {showInstructions ? "▲" : "▼"}</button>
      </div>
      {showInstructions
        ? <div ref={instructionRef} className="geography-detective-inner-instructions-wrapper">
          <div className="geography-detective-subtitle">
            A random country has been chosen and it&apos;s your job to find it!
          </div>
          <h1 className="geod-instruction-block">
            Type in the name of a country then press enter or click &quot;Submit&quot;. If you don&apos;t know the name of a country, click on it to see its information.<br />
          </h1>
          <h1 className="geod-instruction-block">
            Based on the color of the country you entered and the legend below, you can figure out how far away it is from the target country.<br /><br />
            To help you out, countries that border the target country will be colored <strong>red</strong>.
          </h1>
          <img className="geod-instruction-img" src={Legend} alt="" />
          <h1 className="geod-instruction-block">
            Having trouble finding the target country? Try a lower difficulty! Each difficulty adds more countries to the potential pool.
          </h1>
          <h1 className="geod-instruction-block">
            Can&apos;t find the target country? Click &quot;Give Up&quot; to end the game.<br />
          </h1>
        </div>
        : ""}
    </div>
  );
}
