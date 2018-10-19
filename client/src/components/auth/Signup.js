import React, { Component } from "react";
import AuthService from "./AuthService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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
      ],
      photo: {}
    };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const genres = this.state.genres;
    const file = this.state.file;
    if (this.state.genres) {
      genres.map((e, i, arr) => {
        if (e.bool === true) {
          arr.splice(i, 1, { type: e.type, bool: 1 });
          this.setState({ genres: arr });
        } else {
          arr.splice(i, 1, { type: e.type, bool: 0 });
          this.setState({ genres: arr });
        }
      });
    }

    this.service
      .signup(username, password, this.state.genres, file)
      .then(response => {
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
          ],
          file: null
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

  handleUploadFile = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h3>Welcome! Create your account next:</h3>
        <br />
        <br />
        <div className="sign-up">
          <FormControl component="fieldset" className="form-control">
            <TextField
              placeholder="username"
              className="text-field"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
            <TextField
              placeholder="password"
              type="password"
              className="text-field"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
            <span>Upload your profile Picture</span>
            <input
              type="file"
              name="photo"
              className="pic-load"
              onChange={e => this.handleUploadFile(e)}
            />
            <br />
            <br />

            <FormGroup>
              <FormLabel component="legend">
                <p>Select Genres That You Like The Most</p>
              </FormLabel>
              <div >
                {this.state.genres.map((el, index, arr) => {
                  return (
                    <FormControlLabel
                      control={
                        <Radio
                          checked={el.bool}
                          onChange={event => {
                            arr.splice(index, 1, {
                              type: el.type,
                              bool: !el.bool
                            });
                            this.setState({ genres: arr });
                          }}
                          className="check-genre"
                          value="action"
                        />
                      }
                      label={el.type}
                    />
                  );
                })}
              </div>
            </FormGroup>
          </FormControl>
        </div>
        <div className="submit-btn">
        <Button  onClick={this.handleFormSubmit} primary="true">
          Submit
        </Button>
        </div>
        <h1>{this.state.error ? "Something went wrong, try againw" : ""}</h1>
      </div>
    );
  }
}
