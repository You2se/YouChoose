import React, { Component } from "react";
const axios = require("axios");

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: "" };
  }

  render() {
   
    return this.state.movies.forEach(e => {
      return <p>{e}</p>;
    });
  }
}

export default MovieList;
