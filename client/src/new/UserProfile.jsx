import React, { Component } from "react";
import "../App.css"
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
    //const friendName = this.state.friendName;
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ userList: [] });
      } else {
        this.service.friendsGet(val, this.props.userInSession)
                .then((response) => {
                  
                  console.log(response.friend.username)
                  
                    this.setState({
                        userList:[...this.state.userList, response.friend.username],
                        friendName: val
                    })
                })
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
    console.log(this.state.userList)
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
        <div style={{display:"flex"}}>
        <h1>Your Favorite Genres are:</h1>
        {genresToPrint}
        <div >
        <p>Add Friends</p>
        <FormControl component="fieldset">
              <FormLabel component="legend">FindUser</FormLabel>
              <TextField
                className="search-user"
                style={{backgroundColor:"white"}}
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
