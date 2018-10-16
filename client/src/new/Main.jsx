import React, { Component } from "react";
import "../App.scss"

export default class Hero extends Component {
  render() {
    return(
      <div id="hero"  className="Hero">
        <div className="content">
        <h2>My Profile Page </h2>
          <img className="logo" src="https://www.pngarts.com/files/1/Deadpool-Free-PNG-Image.png" alt="narcos background"/>
          <div className="button-wrapper">
            <HeroButton primary={true} text="Random Movie" href="/random"/>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    )
  }
}

class HeroButton extends Component {
  render() {
    return(
      <a href={this.props.href} className="Button" data-primary={this.props.primary}>{this.props.text}</a>
    )
  }
}

