// auth/Signup.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "./AuthService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
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

  render() {
    return (
      <div>
        <h3>Please, login to our site</h3>

        <FormControl component="fieldset" className="form-control">
          <FormLabel component="legend">Username</FormLabel>
          <TextField
            name="username"
            hintText="Username"
            floatingLabelText="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            floatingLabelFixed
          />
          <FormLabel component="legend">Password</FormLabel>
          <TextField
            name="password"
            hintText="Password"
            floatingLabelText="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            floatingLabelFixed
          />
          <Button onClick={this.handleFormSubmit} primary>
            Login
          </Button>
        </FormControl>

        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}
