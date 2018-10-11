import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class PopularMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      listMovies: [],
      activeStep: 0,
      num: 1,
      open: false,
      open2: false,
      open3: false,
      scroll: "paper"
    };
  }

  componentDidMount = () => {
    this.retrieveAllMovies(this.state.num);
  };

  handleClickOpen = (params, scroll) => () => {
    if (params === 1) this.setState({ open: true, scroll });
    if (params === 2) this.setState({ open2: true, scroll });
    else if (params === 3) this.setState({ open3: true, scroll });
  };

  handleClose = params => {
    if (params === 1) this.setState({ open: false });
    else if (params === 2) this.setState({ open2: false });
    else if (params === 3) this.setState({ open3: false });
  };

  handleNext = () => {
    if (this.state.activeStep < 17) {
      this.setState(prevState => ({
        activeStep: prevState.activeStep + 1
      }));
    } else {
      this.retrieveAllMovies(this.state.num + 1);
      this.setState(prevState => ({
        activeStep: (prevState.activeStep = 0),
        num: this.state.num + 1
      }));
    }
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  retrieveAllMovies = num => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es&page=${num}`
      )
      .then(res => {
        this.setState({
          listMovies: res.data.results
        });
      });
  };

  render() {
    const { activeStep } = this.state;
    let maxSteps = this.state.listMovies.length - 2;
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
                <Typography variant="h6" gutterBottom>
                  {this.state.listMovies[activeStep].title}
                </Typography>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  scroll={this.state.scroll}
                  aria-labelledby="scroll-dialog-title1"
                >
                  <DialogTitle
                    style={{ textAlign: "center" }}
                    id="scroll-dialog-title1"
                  >
                    {this.state.listMovies[activeStep].title}
                  </DialogTitle>
                  <DialogContent>
                    <img
                      src={
                        BASE_IMG + this.state.listMovies[activeStep].poster_path
                      }
                      alt=""
                    />
                    <DialogContentText>
                      {this.state.listMovies[activeStep].overview}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.handleClose(1)} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </Typography>
            </Paper>
            <Paper square elevation={0}>
              <Typography>
                <Typography variant="h6" gutterBottom>
                  {this.state.listMovies[activeStep + 1].title}
                </Typography>
                <Dialog
                  open={this.state.open2}
                  onClose={this.handleClose2}
                  scroll={this.state.scroll}
                  aria-labelledby="scroll-dialog-title2"
                >
                  <DialogTitle
                    style={{ textAlign: "center" }}
                    id="scroll-dialog-title2"
                  >
                    {this.state.listMovies[activeStep + 1].title}
                  </DialogTitle>
                  <DialogContent>
                    <img
                      src={
                        BASE_IMG +
                        this.state.listMovies[activeStep + 1].poster_path
                      }
                      alt=""
                    />
                    <DialogContentText>
                      {this.state.listMovies[activeStep + 1].overview}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.handleClose(2)} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </Typography>
            </Paper>

            <Paper square elevation={0}>
              <Typography>
                <Typography variant="h6" gutterBottom>
                  {this.state.listMovies[activeStep + 2].title}
                </Typography>
                <Dialog
                  open={this.state.open3}
                  onClose={this.handleClose3}
                  scroll={this.state.scroll}
                  aria-labelledby="scroll-dialog-title3"
                >
                  <DialogTitle
                    style={{ textAlign: "center" }}
                    id="scroll-dialog-title3"
                  >
                    {this.state.listMovies[activeStep + 2].title}
                  </DialogTitle>
                  <DialogContent>
                    <img
                      src={
                        BASE_IMG +
                        this.state.listMovies[activeStep + 2].poster_path
                      }
                      alt=""
                    />
                    <DialogContentText>
                      {this.state.listMovies[activeStep + 2].overview}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.handleClose(3)} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </Typography>
            </Paper>
          </div>
          <div className="images">
            <img
              src={BASE_IMG + this.state.listMovies[activeStep].poster_path}
              alt=""
              onClick={this.handleClickOpen(1, "paper")}
            />

            <img
              src={BASE_IMG + this.state.listMovies[activeStep + 1].poster_path}
              alt=""
              onClick={this.handleClickOpen(2, "paper")}
            />

            <img
              src={BASE_IMG + this.state.listMovies[activeStep + 2].poster_path}
              alt=""
              onClick={this.handleClickOpen(3, "paper")}
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
                disabled={activeStep === maxSteps}
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
          <p>
            {" "}
            <span>Page:</span>
            {this.state.num}
          </p>
        </div>
      );
    } else {
      return <p>NOPASA</p>;
    }
    //console.log(this.state.listMovies)
  }
}
