import React from "react";
import "./NavHeader.css";

/* Assets */
import Logo from "../../assets/GsLogo.png";
// TODO - Import icon to replace back-button

/* Functions */
import { Link } from "react-router-dom";

function NavHeader (props) {
  return (
    <div className="nav-header-wrapper">
      <div className="nav-header-grid-wrapper">
        <div></div>
        <div className="nav-header-title">{props.name}</div>
        <div className="nav-header-button-wrapper">
          <Link to="/">
            <img src={Logo} alt="" className="nav-header-logo" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavHeader;
