import React, { Component } from "react";
import "../App.scss";
import DialogPop from "./Dialog";
import AuthService from "../components/auth/AuthService";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      close: true,
      loggedUser: this.props.userInSession
    };
    this.service = new AuthService();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedUser: nextProps["userInSession"] });
  }

  handleLike = e => {
    if (this.state.loggedUser !== undefined) {
      this.setState({
        loggedUser: {
          ...this.state.loggedUser,
          favGenres: {
            ...this.state.loggedUser.favGenres,
            action: this.state.loggedUser.favGenres.action + 1
          }
        }
      });
      this.service.genre(
        this.state.loggedUser,
        "action"
      );
    } else {
      console.log("not logged user");
    }
  };
  handleClickOpen = () => {
    this.setState({ open: true });
    this.setState({ close: false });
  };

  render() {
    return (
      <div
        className="Item"
        style={{ backgroundImage: "url(" + this.props.backdrop + ")" }}
      >
        <div className="model">
          <DialogPop
            open={this.state.open}
            close={this.state.close}
            title={this.props.name}
            score={this.props.score}
            overview={this.props.overview}
            backdrop={this.props.backdrop}
          />
        </div>
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <i
            className="material-icons favorite"
            onClick={() => this.handleLike(this.props.all)}
          >
            favorite
          </i>
          {/* <i className="material-icons search-icon" onClick={()=>this.handleClickOpen()}>search</i> */}
          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
        </div>
      </div>
    );
  }
}
