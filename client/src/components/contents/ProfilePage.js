import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import { Pie } from "react-chartjs-2"; //hara falta
import axios from "axios";
import CarrouselUser from "./CarrouselUser";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMovies: [],
      loggedInUser: {},
      friends: [this.props.userInSession.friends],
      friendName: "",
      userList: []
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
   
  }

  handleLogout = e => {
    this.props.logout();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFriendButton = event => {
    event.preventDefault();
    const friendName = this.state.friendName;
    //console.log(this.props.userInSession.friends)
    this.service
      .friends(friendName, this.props.userInSession)
      .then(response => {
        
        this.setState({
          friendName: "",
          friends: [...this.state.friends,friendName]
        });
        

        this.props.getUser(response);
      })
      .catch(error => {
        this.setState({

          error: true
        });
      });
  };

  onTextChange = e => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ userList: [] });
      } else {
        axios
          .get(
            "https://localhost:3000/api/auth/friends?username=" +
              this.state.friendName
          )
          .then(res => {
            console.log(res)
            debugger
            this.setState({
              userList: res.data.results
            });
          });
      }
    });
  };

  
  retrieveMovies = genre => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=3d561f8d0b8aac21ad2ca16cb83e0825&language=es&with_genres=${genre}`
      )
      .then(res => {
        this.setState({
          listMovies: res.data.results
        });
      });
  };
   getMaxGenres = object => {
    return Object.keys(object).filter(x => {
         return object[x] === Math.max.apply(null, 
         Object.values(object));
   });
};
  render() {
    const {favGenres} = this.props.userInSession;
    let highest = this.getMaxGenres(favGenres)
    let genresToPrint = highest.map(e => {
      return(
        
        <p>{e}</p>
        
      )
    })
   
    return (
      <div>
    <CarrouselUser listMovies={this.state.listMovies} />
    <h1>Your Favorite Genres are:</h1>
    {genresToPrint}
    <p>Add Friends</p>
    <FormControl component="fieldset" className="form-control">
          <FormLabel component="legend">FindUser</FormLabel>
          <TextField
            name="friendName"
            value={this.state.friendName}
            //onChange={e => this.handleChange(e)}
            onChange={this.onTextChange}
            floatingLabelFixed
          />
          <Button onClick={this.handleFriendButton} primary>
            ADD
          </Button>
        </FormControl>
        {this.state.userList.map(e => {
          return(
            <p>{e}</p>
          )
        })}

        <h3>Friends</h3>
        {this.state.friends.map(e => {
          return(
            <p>{e}</p>
          )
        })}
    </div>

    
    )
  }
}

// listMovies={this.state.listMovies}
