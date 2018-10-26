import React, { Component } from "react";
import "../styles/App.scss";
import DialogPop from "./Dialog";
import AuthService from "../components/auth/AuthService";
import { Redirect } from "react-router-dom";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      close: true,
      redirect: false,
      loggedUser: this.props.userInSession
    };
    this.service = new AuthService();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedUser: nextProps["userInSession"] });
  }

  handleLike = e => {
    if (this.state.loggedUser !== undefined) {
      this.service.genre(this.state.loggedUser, "action").then(response => {
        this.setState({
          loggedUser: {
            ...this.state.loggedUser,
            favGenres: {
              ...this.state.loggedUser.favGenres,
              action: response.user.favGenres.action
            }
          }
        });
      });
    } else {
      this.setRedirect();
      this.renderRedirect();
      console.log("Not logged user");
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.setState({ close: false });
  };

  getMaxGenres = object => {
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null, Object.values(object));
    });
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
            name={this.props.title}
            score={this.props.score}
          />
        </div>
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <div className="favorite">
            <i
              className="material-icons"
              onClick={() => this.handleLike(this.props.all)}
            >
              favorite
            </i>
          </div>

          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
          <div className="search-icon">
            <i
              className="material-icons"
              onClick={() => this.handleClickOpen()}
            >
              add
            </i>
          </div>
        </div>
      </div>
    );
  }
}
