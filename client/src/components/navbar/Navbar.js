// navbar/Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
  };

  render() {
    if (this.props.userInSession) {
      return (
        <div id="navigator" className="Navigation">
          <nav>
            <ul>
              <li>Browse</li>
              <li>My List</li>
              <Link to="/movielist"><li>Popular List</li></Link>
              <li>Recent</li>
              <li>
                <a onClick={this.handleLogout}>Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="Navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/movielist">Movie List</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}
