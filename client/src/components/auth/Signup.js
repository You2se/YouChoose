// auth/Signup.js
import React, { Component } from "react";
import AuthService from "./AuthService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      genres: {
        action: Number,
        drama: Number,
        comedy: Number
      }
    };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          error: false
        });
        this.props.getUser(response.user);
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
      console.log("aqui entra")
      event.checked=
      this.setState({
        action: 1
      })
    this.setState({ [name]: value });
  };

  render() {
    const { action, drama, comedy } = this.state;
    return (
      <div>
        <h3>Welcome!, create your account next:</h3>
        <br />
        <br />
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

          <br />
          <br />
          <FormGroup>
            <FormLabel component="legend">Select Genres</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  onClick={e => this.handleChange(e)}
                  value="action"
                />
              }
              label="Action"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={drama}
                  //onChange={this.handleChange('jason')}
                  value="drama"
                />
              }
              label="Drama"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={comedy}
                  //onChange={this.handleChange('antoine')}
                  value="comedy"
                />
              }
              label="Comedy"
            />
          </FormGroup>

          <Button onClick={this.handleFormSubmit} primary>
            Submit
          </Button>
        </FormControl>

        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}
