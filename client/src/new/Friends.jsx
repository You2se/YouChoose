import React, { Component } from "react";
import "../App.scss";
import AuthService from "../components/auth/AuthService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FriendList from "./FriendList"
import TitleList from "./TitleList"
import { Link } from "react-router-dom";

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [props.userInSession],
      friendName: "",
      userList: [],
      userGenres: {},

      friendsList: {
        amigo: { amigo: "", favGenres: "", imgPath:"" }
      },

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
    
    //let test = this.state.friends[0].friendsList.map(e =>  e.amigo.amigo)
    
   
      this.service
        .friends(
          friendName,
          this.props.userInSession,
          this.state.friendsList.amigo.favGenres,
          this.state.friendsList.amigo.imgPath
        )
        .then(response => {
          console.log("pasa", response.user)
          
          this.setState({
            ...this.state,
            friendName,
            ...this.state.friendsList,
            friendsList: response.user.friendsList,
            friends:[response.user]
          });
            
          this.props.getUser(response);
        })
        .catch(error => {
          console.log(error)
          this.setState({
            error: true
          });
        })
     
        
       
        
    
   //console.log(final)
  };

  onTextChange = e => {
    //const friendName = this.state.friendName;
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (this.state.friendName.length > 2 || val === "") {
        this.setState({ userList: [], userGenres: {} });
        this.service
          .friendsGet(val, this.props.userInSession)
          .then(response => {
            if(response.friend !== undefined)
            this.setState({
              ...this.state,
              userList: [...this.state.userList, response.friend.username],
              userGenres: response.friend.favGenres,
              friendName: val,
              ...this.state.friendsList,
              friendsList: {
                amigo: {
                  amigo: response.friend.username,
                  favGenres: response.friend.favGenres,
                  imgPath: response.friend.imgPath
                }
              }
            });
            
          });
      }
    });
  };

  getMaxGenres = object => {
    if(object){
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null, Object.values(object));
    });
  }
  };
  

  render() {
    let genresToPrintSearch, toPrint
    this.state.friends.map(e => {
      let highest = this.getMaxGenres(this.state.userGenres);
      
      genresToPrintSearch = highest.map(e => {
        return <span>,{e}</span>;
      });
    });
    if(this.state.friends.length>0){
    return (
      <div>
        
        <FormControl component="fieldset">
          <FormLabel component="legend"/>
          <div className="FriendSearch">
          <TextField
            placeholder="Search User Here"
            inputstyle={{ textAlign: "center", backgroundColor: "white" }}
            name="friendName"
            value={this.state.friendName}
            //onChange={e => this.handleChange(e)}
            onChange={this.onTextChange}
            
          />
            </div>
          <div className="Add-Button">
          <Button
            style={{ backgroundColor: "white" }}
            onClick={this.handleFriendButton}
            primary
            >
            ADD
          </Button>
          </div>
          
        </FormControl>

        <div className="Search-Result">
          <h4>SEARCH RESULTS</h4>

          {this.state.userList.map(e => {
            return (
              <>
                <span style={{fontSize:50}}>{e.charAt(0).toUpperCase() + e.substring(1)}</span> => Genre: {genresToPrintSearch}
              </>
            );
          })}
        </div>
        
          
          <FriendList userInSession={this.state.friends} />
        
          <TitleList
            userInSession={this.state.loggedInUser}
            title="Recommended Picks for you and your friends"
            url="discover/tv?sort_by=popularity.desc&page=1"
          />
        
      </div>
    )
        }else{
          return <p></p>
        }
  }
}
