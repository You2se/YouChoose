import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

export default class Search extends Component {
  state = {
    searchText: "",
    movies: [],
    recommendations: []
  };

  onTextChange = e => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ movies: [] });
      } else {
        axios
          .get(
            "https://api.themoviedb.org/3/search/movie?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=en-US&include_adult=false&query=" +
              this.state.searchText
          )
          .then(res => {
            console.log(res.data.results);
            this.setState({
              movies: res.data.results
            });
            console.log(this.state.movies);
          });
      }
    });
  };

  render() {
    let BASE_IMG = "https://image.tmdb.org/t/p/w300/";
    return (
      <div className="search">
      <i class="material-icons">search</i>
        <TextField
            name="searchText"
            value={this.state.searchText}
            onChange={this.onTextChange}
            hintStyle={{ textAlign: "center", width: "100%" }}
            hintText="Search for movies"
            placeholder="Search Movies Here"
            inputStyle={{ textAlign: "center", backgroundColor: "white" }}
            autocomplete="section-name"
          />
        <div className="search-results">
          {this.state.movies.map(e => {
            if (e.poster_path !== null) {
              return (
                <div>
                  <img src={BASE_IMG + e.poster_path} alt="search-poster" />
                </div>
              );
            } else {
              return "";
            }
          })}
        </div>
      </div>
    );
  }
}

