import React, { Component } from "react";
import AuthService from "./AuthService";
import { Redirect } from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "",redirect: false };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.setRedirect();
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

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/profile' />
    }
  }


  render() {
    return (
      <div>
        <h3>Please, login to our site:</h3>
        <div className="login">
        <FormControl component="fieldset" className="form-control">
          <TextField
            name="username"
            placeholder="Username"
            floatinglabeltext="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            floatingLabelFixed
          />
          <TextField
            name="password"
            placeholder="Password"
            floatinglabeltext="password"

            type="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            floatingLabelFixed
            />
            <div>
            {this.renderRedirect()}
          <Button onClick={this.handleFormSubmit} primary>
            Login
          </Button>
          </div>
        </FormControl>
        </div>

        <h1>{this.state.error ? "Username or Password incorrect" : ""}</h1>
      </div>
    );
  }
}
