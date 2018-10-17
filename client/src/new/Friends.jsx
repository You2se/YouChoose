import React, { Component } from "react";
import "../App.scss";
import AuthService from "../components/auth/AuthService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [props.userInSession.friends],
      friendName: "",
      userList: [],
      userGenres: {},
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
          friends: [...this.state.friends, friendName]
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
        if(this.state.friendName.length > 2){
        this.service
          .friendsGet(val, this.props.userInSession)
          .then(response => {
            console.log(response.friend.username);

            this.setState({
              userList: [...this.state.userList, response.friend.username],
              userGenres: response.friend.favGenres,
              friendName: val
            });
          });
      }}
    });
  };

  getMaxGenres = object => {
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null, Object.values(object));
    });
  };

  render() {
      
    return (
      <div>
      <p>Add Friends</p>
      <FormControl component="fieldset">
        <FormLabel component="legend">FindUser</FormLabel>
        <TextField
          className="search-user"
          style={{ backgroundColor: "white" }}
          name="friendName"
          value={this.state.friendName}
          //onChange={e => this.handleChange(e)}
          onChange={this.onTextChange}
          floatingLabelFixed
        />
        <Button style={{backgroundColor:"white"}} onClick={this.handleFriendButton} primary>
          ADD
        </Button>
        
      </FormControl>

      <div>
      <h4>SEARCH RESULTS</h4>
      {this.state.userList.map(e => {
        return (
          <>
        <p>{e}</p>
        
        </>
        )
        
      })}
      </div>
      <div>
      <h3>Friends</h3>
      {this.state.friends.map(e => {
        let highest = this.getMaxGenres(this.state.userGenres)
        let genresToPrintSearch = highest.map(e => {
          return <span>{e}</span>
        })
        return (
          <div>
        <p>{e}</p>
        <div>{genresToPrintSearch}</div>
        </div>
        )
      })}
      </div>
    </div>
    );
  }
}
