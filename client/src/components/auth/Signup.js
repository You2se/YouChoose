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
        action: false,
        drama:  false,
        comedy: false
      }
      
    };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    
    const { action, drama, comedy} = this.state.genres
    if(this.state.genres) {
      if(this.state.genres.action === true) {
        console.log("pasa action")
        this.setState({
          genres: { action: 1, drama, comedy, }})
      }
      else if(this.state.genres.drama === true) {
        console.log("pasa drama")
        this.setState({
          genres: {action, drama: 1, comedy}
        })
       }
       else if(this.state.genres.comedy === true) {
        console.log("pasa comedy")
         this.setState({
           genres: {action,drama,comedy:1}
         })
       }
    }
    this.service
      .signup(username, password, this.state.genres)
      .then(response => {
        console.log(response.data)
        this.setState({
          username: "",
          password: "",
          error: false,
          genres: { 
            action: false,
            drama: false,
            comedy: false
          }
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
    //this.setState({genres: {action: 1}})
    
  };
  
  render() {
    console.log(this.state.genres)
    const { action, drama, comedy } = this.state.genres;
    //console.log(action)
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
                  checked={action}
                  onChange={() => this.setState({genres: {
                    action : !action,
                    drama,
                    comedy,
                  }})}
                  value="action"
                />
              }
              label="Action"
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={drama}
                  onChange={() => this.setState({genres: {
                    action,
                    drama : !drama,
                    comedy
                  }})}
                  value="drama"
                />
              }
              label="Drama"
            />
            
          <FormControlLabel
              control={
                <Checkbox
                checked={comedy}
                  onChange={() => this.setState({genres: {
                    action,
                    drama,
                    comedy : !comedy,

                  }})}
                  value="comedy"
                />
              }
              label="Comedy"
            />
          </FormGroup>
          
    

        </FormControl>
          <Button onClick={this.handleFormSubmit} primary>
            Submit
          </Button>

        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}