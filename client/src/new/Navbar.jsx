import React, { Component } from "react";
import "../styles/App.scss";
import { Link } from "react-router-dom";
import AuthService from "../components/auth/AuthService";
import Logo from "./Logo";
import Search from "./Search";
import Profile from "./Profile";
import { SubNavbar } from "./SubNavbar";

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
        <div>
        <nav className="Navigation">
          <Logo />
          <Search />
          <ul>
            <li>
              <Link to="/random">Random</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
            <li>

              <Link to="/popular">Popular List</Link>
            </li>
            <li>
              <Link to="/" onClick={this.handleLogout}>Logout</Link>
            </li>
          </ul>
          <Profile userInSession={this.state.loggedInUser}/>
          
        </nav>
        <div className="SubNavigation">
          <SubNavbar/>
        </div>
       </div>
        
      );
    } else {
      return (
        <div>
          <nav className="Navigation">
            <Logo />
            <Search />
            <ul>
              <li>
                <Link to="/random">Random</Link>
              </li>
              <li>
                <Link to="/popular">Popular List</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
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
