import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import { Pie } from "react-chartjs-2"; //hara falta
import axios from "axios";
import CarrouselUser from "./CarrouselUser"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMovies: [],
      loggedInUser: {}
    };

    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
    console.log(this.state.loggedInUser)
   
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
   getMaxGenres = object => {
    return Object.keys(object).filter(x => {
         return object[x] == Math.max.apply(null, 
         Object.values(object));
   });
};
  render() {
    console.log(this.props.userInSession)
    const {favGenres} = this.props.userInSession;
    let highest = this.getMaxGenres(favGenres)
    let genresToPrint = highest.map(e => {
      return(
        
        <p>{e}</p>
        
      )
    })
   
    
    
    //console.log(this.state.listMovies)
    return (
      <div>
    <CarrouselUser listMovies={this.state.listMovies} />
    <h1>Your Favorite Genres are:</h1>
    {genresToPrint}
    </div>
    
    )
  }
}
