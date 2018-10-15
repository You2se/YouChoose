import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import AuthService from "../components/auth/AuthService";
import Logo from "./Logo";
import Search from "./Search";
import Profile from "./Profile";

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
        <nav className="Navigation">
          <Logo />
          <Search />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
            <li>

              <Link to="/popular">Popular List</Link>
            </li>
            <li>
              <a href="/" onClick={this.handleLogout}>Logout</a>
            </li>
          </ul>
          <Profile />
        </nav>
      );
    } else {
      return (
        <div>
          <nav className="Navigation">
            <Logo />
            <Search />
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/popular">Popular List</Link>
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
