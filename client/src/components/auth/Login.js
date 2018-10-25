import React, { Component } from "react";
import AuthService from "./AuthService";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", redirect: false };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });
        this.setRedirect();
        this.props.getUser(response);
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/profile" />;
    }
  };

  render() {
    return (
      <div>
        <h3>Please, login to our site:</h3>
        <div className="login">
            <form onSubmit={this.handleFormSubmit}>
            <input className="login-username" type="text" name="username" placeholder="Username" value={this.state.username} onChange={e => this.handleChange(e)} /> 
              
            <input className="login-password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
            <input className="login-button" type="submit" value="Log In" />
            </form>
            <div>
              {this.renderRedirect()}
            </div>
               
        </div>

        <h1 className="login-error">{this.state.error ? "Invalid Credentials" : ""}</h1>
      </div>
    );
  }
}
