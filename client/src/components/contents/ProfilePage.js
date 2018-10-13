import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import axios from "axios";
import CarrouselUser from "./CarrouselUser";
import Chart from "./Chart"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMovies: {
        drama: 5,
        action:10,
        animation:5,
        comedy:8
      }
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
  };

  render() {
    return (
      <div>
        <Chart genresUser={this.state.listMovies}/>
        <h1>Your Movies</h1>
        <div>
          <h4>Action: </h4>
          <CarrouselUser listMovies={28} />
        </div>
        <div>
          <h4>Drama: </h4>
          <CarrouselUser listMovies={18} />
        </div>
        <div>
          <h4>Comedy: </h4>
          <CarrouselUser listMovies={35}/>
        </div>
      </div>
    );
  }
}

// listMovies={this.state.listMovies}
