import React, { Component } from "react";
import "../App.css"
import Navbar from "./Navbar"
import Logo from "./Logo"
import Hero from "./Main"
import TitleList from "./TitleList"
import AuthService from "../components/auth/AuthService";
import Login from "../components/auth/Login"


export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm:"",
      searchUrl:"",
      loggedInUser: null
    }
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleKeyUp (event) {
    if(event.key === 'Enter' && this.state.searchTerm !== ""){
      var searchUrl =  "search/multi?query=" + this.state.searchTerm + "&api_key=166624c030b91c943c397020f20525b4";
      this.setState({
        searchUrl: searchUrl
      })
    }
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
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
