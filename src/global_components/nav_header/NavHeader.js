import React from "react";
import "./NavHeader.css";

import { Link } from "react-router-dom";

function NavHeader(props) {
  return (
    <div className="nav-header-wrapper">
      <div className="nav-header-grid-wrapper">
        <div className="nav-header-button-wrapper">
          <Link to="/">
            <button className="hollow">Back</button>
          </Link>
        </div>
        <div className="nav-header-title">{props.name}</div>
      </div>
    </div>
  );
}

export default NavHeader;
