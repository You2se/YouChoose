import React, { Component } from "react";
import axios from "axios";
import Search from "../main/Search";
import { Link } from "react-router-dom";

export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.getRandomMovie();
  }

  getRandomMovie = () => {
    let randNum = Math.floor(Math.random() * (800 - 100)) + 100;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${randNum}?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es`
      )
      .then(res => {
        const movieDetail = res.data;
        this.setState(movieDetail);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let BASE_IMG = "https://image.tmdb.org/t/p/w400/";

    if (this.state.title !== undefined) {
      return (
        <div>
          <div>
         
            <div>
              <Link to={`/movie/${this.state.id}`}>{this.state.title}</Link>
            </div>
            <div class="overme">{this.state.overview}</div>
            <img src={BASE_IMG + this.state.poster_path} alt="movie-detail" />
           
          </div>
          <div>
            <button onClick={this.getRandomMovie}>Another Random Movie</button>
          </div>
          <Link to="/search">Search Movies</Link>
        </div>
      );
    } else {
      this.getRandomMovie();
      return <p />;
    }
  }
}
