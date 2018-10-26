import axios from "axios";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class Search extends Component {
  state = {
    searchText: "",
    movies: [],
    recommendations: [],
    search: false
  };

  onTextChange = e => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ movies: [] });
      } else {
        if(this.state.searchText.length > 2){
        axios
          .get(
            "https://api.themoviedb.org/3/search/movie?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es&include_adult=false&query=" +
              this.state.searchText
          )
          .then(res => {
            this.setState({
              movies: res.data.results,
              search: true
            });
          });
      }}
    });
  };

  render() {
    let titles = "";
    let backDrop = "";
    let name = "";
    if (this.state.movies) {
      titles = this.state.movies.map((title, i) => {
        if (i < 5) {
          name = "";
          backDrop = "http://image.tmdb.org/t/p/original" + title.backdrop_path;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
            <div
              className="Item"
              style={{ backgroundImage: "url(" + backDrop + ")" }}
            >
              <div className="overlay">
                <div className="title">{name}</div>
                <div className="rating">{title.vote_average} / 10</div>
                <div className="plot">{title.overview}</div>
              </div>
            </div>
          );
        } else {
          return <div key={title.id} />;
        }
      });
    }
    return (
      <div className="Search-bar">
        <div className="Search">
          <i className="material-icons">search</i>
          <TextField
            name="searchText"
            underlinestyle={{display: 'none'}}
            value={this.state.searchText}
            onChange={this.onTextChange}
            hintstyle={{ textAlign: "center", width: "100%" }}
            hinttext="Search for movies"
            placeholder="Search Movies Here"
            inputstyle={{ textAlign: "center", backgroundColor: "white" }}
            autoComplete="section-name"
          />
        </div>
        <div
          ref="titlecategory"
          className="TitleList search-items "
          data-loaded={true}
        >
          <div className="titles-wrapper">{titles}</div>
        </div>
      </div>
    );
  }
}
