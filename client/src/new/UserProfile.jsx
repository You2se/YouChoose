import React, { Component } from "react";
import "../App.css"
import Hero from "./Main"
import TitleList from "./TitleList"
import AuthService from "../components/auth/AuthService";



export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null
    }
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  render(){
      return (
        <div>
          <Hero />
          <TitleList title="Top picks for Steve" url='discover/tv?sort_by=popularity.desc&page=1'/>
          <TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1'/>
          <TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1'/>
          <TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1'/>
          <TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1'/>
        </div>
      )
    
    
  }
}
