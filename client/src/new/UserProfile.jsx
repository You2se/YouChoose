import React, { Component } from "react";
import "../App.scss";
import Hero from "./Main";
import Friends from "./Friends";
import TitleList from "./TitleList";
import AuthService from "../components/auth/AuthService";
import { Link } from "react-router-dom";


export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMovies: [],
      loggedInUser: props.userInSession
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  getMaxGenres = object => {
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null, Object.values(object));
    });
  };

  render() {
    if (this.props.userInSession !== null) {
      const favGenres = this.props.userInSession.favGenres;
      let highest = this.getMaxGenres(favGenres);
      let genresToPrint = highest.map(e => {
        return <p>{e}</p>;
      });
      return (
        <div>
          <div className="user-search-container">
          <div>
            <h1>Your Favorite Genres are:</h1>
            {genresToPrint}
            </div>
            <Link to="/friends">Friends</Link>
          </div>
          <div>
            <Hero />
            <TitleList
              userInSession={this.state.loggedInUser}
              title="Top picks for Steve"
              url="discover/tv?sort_by=popularity.desc&page=1"
            />
            <TitleList
              title="Trending now"
              url="discover/movie?sort_by=popularity.desc&page=1"
            />
            <TitleList
              title="Most watched in Horror"
              url="genre/27/movies?sort_by=popularity.desc&page=1"
            />
            <TitleList
              title="Sci-Fi greats"
              url="genre/878/movies?sort_by=popularity.desc&page=1"
            />
            <TitleList
              title="Comedy magic"
              url="genre/35/movies?sort_by=popularity.desc&page=1"
            />
          </div>
        </div>
      );
    } else {
      return <p>Hola</p>;
    }
  }
}
