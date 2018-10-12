import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import CarrouselUser from "./CarrouselUser"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMovies: [],
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  componentDidMount = () => {
    this.retrieveMovies(18);
  };

  handleLogout = e => {
    this.props.logout();
  };

  
  retrieveMovies = genre => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es&with_genres=${genre}`
      )
      .then(res => {
        this.setState({
          listMovies: res.data.results
        });
      });
  };
  render() {
    console.log(this.state.listMovies)
    return <CarrouselUser listMovies={this.state.listMovies} />;
  }
}
