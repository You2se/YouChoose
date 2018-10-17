import React, { Component } from "react";

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {loggedInUser: props.userInSession}
    
  }
  render(){
    console.log(this.state.loggedInUser.imgPath)
    return(
      <div className="UserProfile">
        <div className="User">
          <div className="name">{this.state.loggedInUser.username}</div>
          <div className="image">
            <img src={this.state.loggedInUser.imgPath} alt="profile"/>
          </div>
        </div>
      </div>
    )
  }
}