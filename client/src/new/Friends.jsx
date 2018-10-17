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
      friendListGenres: {},
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
    if(!this.state.friends.includes(friendName)) {
    this.service
      .friends(friendName, this.props.userInSession)
      .then(response => {
      //   this.setState({
      //     friendListGenres: {
      //         ...this.state.friendListGenres,
      //         action:action
      //     },
      //     friendName: "",
      //     friends: [...this.state.friends, friendName],
      // })
     
        console.log("pasa-noesta")
        this.setState({
          ...this.state,
          friendName: "",
          friends: [...this.state.friends, friendName],
        });
       

        
        this.props.getUser(response);
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
    }
    else alert("User Already in your friendList")
  };

  onTextChange = e => {
    //const friendName = this.state.friendName;
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {

        if (this.state.friendName.length > 2 || val ==="") {
          this.setState({ userList: [],  userGenres: {}});
          this.service
            .friendsGet(val, this.props.userInSession)
            .then(response => {
              this.setState({
                ...this.state,
                userList: [...this.state.userList, response.friend.username],
                userGenres: response.friend.favGenres,
                friendName: val
              });
              console.log(response.friend.favGenres)
              
            });
        }
    });
  };

  getMaxGenres = object => {
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null, Object.values(object));
    });
  };

  render() {
    console.log(this.state.friendListGenres.action)
    let genresToPrintSearch;
    this.state.friends.map(e => {
      let highest = this.getMaxGenres(this.state.userGenres);
      genresToPrintSearch = highest.map(e => {
      return <span>{e},</span>
      })})

    
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
          <Button
            style={{ backgroundColor: "white" }}
            onClick={this.handleFriendButton}
            primary
          >
            ADD
          </Button>
        </FormControl>

        <div>
          <h4>SEARCH RESULTS</h4>
          {this.state.userList.map(e => {
            return (
              <>
                <span>{e}</span> => Genres: {genresToPrintSearch}
              </>
            );
          })}
        </div>
        <div>
          <h3>Friends</h3>
        {this.state.friends} 
        {/* <span>{genresToPrintSearch},</span> */}
        {/* {this.state.friends.map(e => {
        let highest = this.getMaxGenres(this.state.userGenres)
        let genresToPrintSearch = highest.map(e => {
          return <p>{e}</p>
        })
        return (
          <div>
        <p>{e}</p>
        <span>{genresToPrintSearch},</span>
        </div>
        )
      })} */}
        
          
        </div>
      </div>
    );
  }

  }
