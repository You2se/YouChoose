import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import {Pie} from 'react-chartjs-2';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: {
        labels: ["Action", "Comedy", "Drama", "Animation"],
        datasets: [{
        label: "Genres of Movies",
        backgroundColor: 'rgb(33, 150, 243)',
        borderColor: 'rgb(, 0, 0)',
        data: [10, 20, 5, 2],
        maintainAspectRatio: false,
        }]
    },
    loggedInUser: null };
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
        < Pie data={this.state.data}
          height={20}
          width={100}/>
        </div>
      )
    } else {
      return (
       <p>You must be logged in to see this part</p>
      )
    }
  }
}

