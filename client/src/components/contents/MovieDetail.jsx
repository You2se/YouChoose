import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.retrieveMovieDetails();
  }

  retrieveMovieDetails = () => {
    const { params } = this.props.match;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          params.id
        }?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es`
      )
      .then(res => {
        const movieDetail = res.data;
        this.setState(movieDetail);
        console.log(movieDetail);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let BASE_IMG = "https://image.tmdb.org/t/p/w200/";
    return (
      <React.Fragment>
        <div>
          <div>
            <b style={{ fontSize: 12 }}>Genres: </b>
            {this.state.genres !== undefined
              ? this.state.genres.map(e => {
                  return (
                    <small>
                      <span>{`${e.name} `}</span>
                    </small>
                  );
                })
              : ""}
          </div>
          <img
            src={BASE_IMG + this.state.poster_path}
            alt="movie-detail"
            style={{ maxWidth: 400, maxHeight: 400 }}
          />
        </div>
        <div>
          <div />
          <p style={{ fontSize: 12 }}>
            Release Date: <span>{this.state.release_date}</span>
          </p>
          <small>
            <b>Rating: </b>
            <span>{this.state.vote_average}</span>
            <span>/10 (</span>
            <span>{this.state.vote_count}</span>
            <span> votes)</span>
          </small>
          <h4>
            <a href={this.state.homepage} target="_blank">
              Official Site
            </a>
          </h4>
          <p style={{ fontSize: 22 }}>{this.state.overview}</p>
        </div>
      </React.Fragment>
    );
  }
}
