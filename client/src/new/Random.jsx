import React, { Component } from "react";
import axios from "axios";
import AuthService from "../components/auth/AuthService";

export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      countButton: 0
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  componentWillMount() {
    this.getRandomMovie();
  }

  getRandomMovie = () => {
    let randNum = Math.floor(Math.random() * (500 - 100)) + 100;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${randNum}?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&.scssage=es`
      )
      .then(res => {
        const movieDetail = res.data;
        this.setState(movieDetail);
      })
      .catch(err => {});
  };

  getMovieByGenre = genre => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es&with_genres=${genre}&page=${
          this.state.pageNum
        }`
      )
      .then(res => {
        if (this.state.countButton === 2) {
          this.setState({
            pageNum: this.state.pageNum + 1
          });
        }
        let random = Math.floor(Math.random() * 21);
        const movieDetail = res.data.results[random];
        this.setState(movieDetail);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getMovieByYear = year => {
    axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&primary_release_year=${year}`
    ).then(res => {
      if(res!==undefined){
      let random = Math.floor(Math.random() * 21);
      const movieDetail = res.data.results[random];
      this.setState(movieDetail);
      }else{
        this.getMovieByYear(year)
      }
    }).catch(err => {
      console.log(err);
    });

  }

  render() {
    let BASE_IMG = "https://image.tmdb.org/t/p/w400/";
    let posterPath = "";
    if (
      this.state.title !== undefined &&
      this.state.poster_path !== undefined
    ) {
      posterPath = this.state.poster_path;
      return (
        <div className="Random">
          <div
            className="Item Random-pic"
            style={{ backgroundImage: "url(" + BASE_IMG + posterPath + ")" }}
          >
            <div className="overlay">
            <div className="background">
              <div className="name">{this.state.title}</div>
              <div className="random-descript">{this.state.overview}</div>
              </div>
            </div>
          </div>
          <div className="btn">
            <button className="button" onClick={this.getRandomMovie}>
              Another Random Movie
            </button>
            <button
              className="button second"
              onClick={() => this.getMovieByGenre(28)}
            >
              Action Movies
            </button>
            <button
              className="button third"
              onClick={() => this.getMovieByGenre(18)}
            >
              Drama Movies
            </button>
            <button
              className="button fourth"
              onClick={() => this.getMovieByGenre(35)}
            >
              Comedy Movies
            </button>
            <button
              className="button fifth"
              onClick={() => this.getMovieByGenre(16)}
            >
              Animation Movies
            </button>
            <button
              className="button sixth"
              onClick={() => this.getMovieByYear(2018)}
            >
              Movie of 2018
            </button>
            <button
              className="button seventh"
              onClick={() => this.getMovieByYear(2017)}
            >
              Movie of 2017
            </button>
            <button
              className="button eigth"
              onClick={() => this.getMovieByYear(2016)}
            >
              Movie of 2016
            </button>
            <button
              className="button nine"
              onClick={() => this.getMovieByYear(2015)}
            >
              Movie of 2015
            </button>

          </div>
        </div>
      );
    } else {
      this.getRandomMovie();
      return <p />;
    }
  }
}
