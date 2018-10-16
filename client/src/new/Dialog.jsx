import React, { Component } from "react";
import "../App.scss";
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
  handleClose = params => {
    if (params === 1) this.setState({ open: false });
   
  };

  render() {
    return (
      <Paper square elevation={0}>
        <Typography>
          <Dialog
            open={this.state.open}
            onClose={this.props.close}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title1"
            className="card"
          >
            <DialogTitle
              style={{ textAlign: "center" }}
              id="scroll-dialog-title1"
            >
              {this.props.name}
            </DialogTitle>
            <DialogContent>
             <img src={this.props.backdrop} alt=""/>
              <DialogContentText>{this.props.overview}
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
    );
  }
}
