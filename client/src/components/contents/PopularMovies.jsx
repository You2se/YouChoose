import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class PopularMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      listMovies: []
    };
  }
  componentDidMount = () => {
    this.retrieveAllMovies();
  };

  retrieveAllMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es&page=1"
      )
      .then(res => {
        console.log(res);
        this.setState({
          listMovies: res.data.results
        });
        console.log(res.data);
      });
  };

  render() {
    let BASE_IMG ='https://image.tmdb.org/t/p/w200/';
    return (
      <div>
        <img src={BASE_IMG + "wwemzKWzjKYJFfCeiB57q3r4Bcm.png"} alt=""/>
        {this.state.listMovies.map((movie, index) => {
          return (
            <div> 
            <img src={BASE_IMG+ movie.poster_path}  alt=""/>
              <p>{movie.title}</p>
              <p style={{fontSize:15}}>{movie.overview}</p>
              <br></br>
            </div>
          );
        })}
      </div>
    );
  }
}
