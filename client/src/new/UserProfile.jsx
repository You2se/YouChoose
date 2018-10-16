import React, { Component } from "react";
import "../App.scss"
import Hero from "./Main"
import TitleList from "./TitleList"
import AuthService from "../components/auth/AuthService";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      listMovies: [],
      friends: [props.userInSession.friends],
      friendName: "",
      userList: [],
      loggedInUser: props.userInSession
     };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFriendButton = event => {
    event.preventDefault();
    const friendName = this.state.friendName;
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
            this.setState({
              userList: res.data.results
            });
          });
      }
    });
  };

   getMaxGenres = object => {
    return Object.keys(object).filter(x => {
         return object[x] === Math.max.apply(null, 
         Object.values(object));
         
   });
};
  render(){
  if(this.props.userInSession!==null){
    const favGenres = this.props.userInSession.favGenres;
    let highest = this.getMaxGenres(favGenres)
    let genresToPrint = highest.map(e => {
      return(
        <p>{e}</p>
        
      )
    })
      return (
        <div>
        <div>
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
        <div>
          <Hero />
          <TitleList userInSession={this.state.loggedInUser} title="Top picks for Steve" url='discover/tv?sort_by=popularity.desc&page=1'/>
          <TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1'/>
          <TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1'/>
          <TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1'/>
          <TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1'/>
        </div>
        </div>
         )}else{
          return (
            <p>Hola</p>
      )}
  }
}
