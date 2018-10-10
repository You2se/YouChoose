import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
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
    let BASE_IMG = "https://image.tmdb.org/t/p/w200/";
    return (
      <div className="search">
        <input
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
        />
        <div className="search-results">
        {this.state.movies.map(e => {
          if (e.poster_path !== null) {
            return (
              <div>
                {/* <Link to={`/movie/${e.id}`}>{e.title}</Link> */}
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

export default Search;
