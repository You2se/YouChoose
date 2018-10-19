import React, { Component } from "react";
import "../styles/App.scss";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class DialogPop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      open:false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, open: nextProps["open"] });
  }
  handleClose = () => {
    this.setState({ open: false });
   
  };

  render() {
    return(
      <Paper square elevation={0}>
        <Typography>
          <Dialog
            open={this.state.open}
            onClose={() => this.handleClose()}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title1"
            className="card"
          >
            <DialogTitle
              style={{ textAlign: "center" }}
              id="scroll-dialog-title1"
            >
              <h1>{this.props.name}</h1>
            </DialogTitle>
            <DialogContent>
             <img className="model-img" src={this.props.backdrop} alt=""/>
             <p className="dialog-score">Rating: {this.props.score}/10</p>
            <p className="dialog-score see" >Watch on:</p>
             <a href="https://www.netflix.com" target="_blank"><img className="netflix" src="https://mbtskoudsalg.com/images/netflix-envelope-png-6.png" alt="netflix logo"/></a>
             <a href="https://es.hboespana.com/" target="_blank"><img className="hbo" src="https://png2.kisspng.com/show/1b8527e4c5acccfd37746949c19cdeb9/L0KzQYm3VsMxN5ZAipH0aYP2gLBuTfxwb5CygNR4LX7yh37vgv8udJDsh58AYkO7QrToVcI4bmVqT5CBOUK3Roq4VME2O2E5SKo6MEG0RoSATwBvbz==/kisspng-logo-hbo-now-hbo-logo-5b382ca527f4e7.6924691415304081011637.png" alt="hbo logo"/></a>
              <DialogContentText>{this.props.overview}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Typography>
      </Paper>
    );
  }
}
