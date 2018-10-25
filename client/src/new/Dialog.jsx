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
             <a href="https://es.hboespana.com/" target="_blank"><img className="hbo" src="" alt="hbo logo"/></a>
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
