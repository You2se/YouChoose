import React, { Component } from "react";
import "../App.scss";
import AuthService from "../components/auth/AuthService";
import TitleList from "./TitleList"

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      loggedInUser: props.userInSession
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }


  render() {
    return (
      <div>
          
        <div>
        </div>
        <div>
          <TitleList
            title="This are your last seen movies"
            url="genre/35/movies?sort_by=popularity.desc&page=1"
          /> */}
        </div>
      </div>
    );
  }
}
