import React, { Component } from "react";
import axios from "axios";

class Random extends Component {
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
    let BASE_IMG = "https://image.tmdb.org/t/p/w200/";
    console.log("this is the state---> " + this.state.title);

    if (this.state.title !== undefined) {
      return (
        <div>
          <p>{this.state.title}</p>
          <img src={BASE_IMG + this.state.poster_path} alt="movie-detail" />
        </div>
      );
    } else {
      this.getRandomMovie()
      return <p>Page not found</p>;
    }
  }
}

export default Random;
