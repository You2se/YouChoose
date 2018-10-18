import React, { Component } from "react";
import "../App.scss";
import { Link } from "react-router-dom";

export const SubNavbar = () => {
return(
  <nav className="Subnavbar">
  <ul>
    <li><Link to="/friends">Friends</Link></li>
    <li><Link to="/recommendations">Recommendations</Link></li>
  </ul>
  </nav>
)
}