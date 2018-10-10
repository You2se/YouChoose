import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class PopularMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      listMovies: [],
      activeStep: 0
    };
  }
  componentDidMount = () => {
    this.retrieveAllMovies();
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 3
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 3
    }));
  };

  retrieveAllMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es&page=1"
      )
      .then(res => {
        this.setState({
          listMovies: res.data.results
        });
      });
  };

  render() {
    const { activeStep } = this.state;
    let maxSteps = this.state.listMovies.length;
    let BASE_IMG = "https://image.tmdb.org/t/p/w400/";

    if (this.state.listMovies.length > 0) {
      return (
        <div>
          <Typography variant="h4" gutterBottom>
            Popular Movies
          </Typography>
          <div className="names">
            <Paper square elevation={0}>
              <Typography>
                <Link to={`/movie/${this.state.listMovies[activeStep].id}`}>
                  {this.state.listMovies[activeStep].title}
                </Link>
              </Typography>
            </Paper>
            <Paper square elevation={0}>
              <Typography>
                <Link to={`/movie/${this.state.listMovies[activeStep + 1].id}`}>
                  {this.state.listMovies[activeStep + 1].title}
                </Link>
              </Typography>
            </Paper>
            <Paper square elevation={0}>
              <Typography>
                <Link to={`/movie/${this.state.listMovies[activeStep + 2].id}`}>
                  {this.state.listMovies[activeStep + 2].title}
                </Link>
              </Typography>
            </Paper>
          </div>
          <div className="images">
            <img
              src={BASE_IMG + this.state.listMovies[activeStep].poster_path}
              alt=""
            />

            <img
              src={BASE_IMG + this.state.listMovies[activeStep + 1].poster_path}
              alt=""
            />

            <img
              src={BASE_IMG + this.state.listMovies[activeStep + 2].poster_path}
              alt=""
            />
          </div>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={this.handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {/* {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={this.handleBack}
                disabled={activeStep === 0}
              >
                {/* {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
                Back
              </Button>
            }
          />
        </div>
      );
    } else {
      return <p>NOPASA</p>;
    }
    //console.log(this.state.listMovies)
  }
}
