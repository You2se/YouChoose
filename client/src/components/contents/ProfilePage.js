import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';



export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }
  

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    if (this.props) {
      return (
        <div>
        <p>This is the profile User site</p>
        </div>
      )
    } else {
      return (
       <p>You must be logged in to see this part</p>
      )
    }
  }
}

