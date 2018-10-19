import React, { Component } from "react";
import "../styles/App.scss";
import TitleList from "./TitleList";
import AuthService from "../components/auth/AuthService";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      loggedInUser: props.userInSession
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }


  render() {
    return (
      <div>
        <div>
          <TitleList
            userInSession={this.state.loggedInUser}
            title="Top Picks for you"
            url="discover/tv?sort_by=popularity.desc&page=1"
          />
          <TitleList
            title="Trending now"
            url="discover/movie?sort_by=popularity.desc&page=1"
          />
          <TitleList
            title="Horror Movies"
            url="genre/27/movies?sort_by=popularity.desc&page=1"
          />
          <TitleList
            title="Sci-Fi Movies"
            url="genre/878/movies?sort_by=popularity.desc&page=1"
          />
          <TitleList
            title="Comedy Movies"
            url="genre/35/movies?sort_by=popularity.desc&page=1"
          />
        </div>
      </div>
    );
  }
}