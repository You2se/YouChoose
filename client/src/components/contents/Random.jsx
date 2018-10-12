import React, { Component } from "react";
import axios from "axios";
import Search from "../main/Search";
import { Link } from "react-router-dom";
import {Pie} from 'react-chartjs-2';


export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["Action", "Comedy", "Drama", "Animation"],
        datasets: [{
        label: "Genres of Movies",
        backgroundColor: [
          "red",
          "orange",
          "blue",
          "greenyellow",
        ],
        borderColor: 'rgb(, 0, 0)',
        data: [10, 10, 5, 2],
        maintainAspectRatio: false,
        }]
    },
      pageNum: 1,
      countButton: 0
    };
  }
  componentWillMount() {
    this.getRandomMovie();
  }

  getRandomMovie = () => {
    let randNum = Math.floor(Math.random() * (500 - 100)) + 100;
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
        console.log(movieDetail);
        this.setState(movieDetail);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let BASE_IMG = "https://image.tmdb.org/t/p/w400/";

    if (
      this.state.title !== undefined &&
      this.state.poster_path !== undefined
    ) {
      return (
        <div className="random">
          <div>
            <div>
               < Pie data={this.state.data}
          height={20}
          width={100}/>
           
            </div>
            <div className="random-img">
              <img className="image-ran" src={BASE_IMG + this.state.poster_path} alt="movie-detail" />
              <div className="txt-img">
                <div className="text">
                <Link to={`/movie/${this.state.id}`}>{this.state.title}</Link>
                 {this.state.overview}
                </div>
              </div>
            </div>
          </div>
          <div className="button">
            <button onClick={this.getRandomMovie}>Another Random Movie</button>
            <button onClick={() => this.getMovieByGenre(28)}>
              Action Movies
            </button>
            <button onClick={() => this.getMovieByGenre(18)}>
              Drama Movies
            </button>
            <button onClick={() => this.getMovieByGenre(35)}>
              Comedy Movies
            </button>
            <button onClick={() => this.getMovieByGenre(16)}>
              Animation Movies
            </button>
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
