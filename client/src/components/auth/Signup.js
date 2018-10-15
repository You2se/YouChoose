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
      genres: [
        { type: "action", bool: false },
        { type: "drama", bool: false },
        { type: "comedy", bool: false },
        { type: "adventure", bool: false },
        { type: "animation", bool: false },
        { type: "crimen", bool: false },
        { type: "documental", bool: false },
        { type: "family", bool: false },
        { type: "history", bool: false },
        { type: "fantasy", bool: false },
        { type: "terror", bool: false },
        { type: "music", bool: false },
        { type: "mistery", bool: false },
        { type: "romance", bool: false },
        { type: "scifi", bool: false },
        { type: "tvshow", bool: false },
        { type: "belic", bool: false },
        { type: "western", bool: false },
        { type: "suspense", bool: false }
      ]
    };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const genres = this.state.genres;
    if(this.state.genres) {
      genres.map((e,i, arr) => {
        if(e.bool ===true) {
        arr.splice(i, 1, { type: e.type, bool: 1 });
            this.setState({ genres: arr });
            
      } else {
        arr.splice(i, 1, { type: e.type, bool: 0 });
            this.setState({ genres: arr });

      }
      })
      console.log(genres)
    }
    this.service
      .signup(username, password, this.state.genres)
      .then(response => {
        console.log(response.data);
        this.setState({
          username: "",
          password: "",
          error: false,
         genres: [
            { type: "action", bool: false },
            { type: "drama", bool: false },
            { type: "comedy", bool: false },
            { type: "adventure", bool: false },
            { type: "animation", bool: false },
            { type: "crimen", bool: false },
            { type: "documental", bool: false },
            { type: "family", bool: false },
            { type: "history", bool: false },
            { type: "fantasy", bool: false },
            { type: "terror", bool: false },
            { type: "music", bool: false },
            { type: "mistery", bool: false },
            { type: "romance", bool: false },
            { type: "scifi", bool: false },
            { type: "tvshow", bool: false },
            { type: "belic", bool: false },
            { type: "western", bool: false },
            { type: "suspense", bool: false }
          ]
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
    this.setState({ [name]: value });
  };

  render() {

    return (
      <div>
        <h3>Welcome!, create your account next:</h3>
        <br />
        <br />

        <FormControl component="fieldset" className="form-control">
          <FormLabel component="legend">
            <p className="register-label-user">Username</p>
          </FormLabel>
          <TextField
            className="username-textfield"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <FormLabel className="label-password" component="legend">
            <p className="register-label-password">Password</p>
          </FormLabel>
          <TextField
            className="password-textfield"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />

          <br />
          <br />

          <FormGroup>
            <FormLabel component="legend">
              <p>Select Genres</p>
            </FormLabel>
            {this.state.genres.map((el, index, arr) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={el.bool}
                      onChange={event => {
                        arr.splice(index, 1, { type: el.type, bool: !el.bool });
                        this.setState({ genres: arr });
                      }}
                      value="action"
                    />
                  }
                  label={el.type}
                />
              );
            })}
          </FormGroup>
        </FormControl>
        <Button onClick={this.handleFormSubmit} primary="true">
          Submit
        </Button>

        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}
