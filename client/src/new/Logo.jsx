import React, { Component } from "react";
import "../App.scss"
import {Link} from "react-router-dom";

export default class Logo extends Component {
  render() {
    return (
      <Link to="/">
      <div id="logo" className="Logo">
      </div>
      </Link>
    );
  }
}