import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from "./components/auth/Login"
import AuthService from './components/auth/AuthService';
import Navbar from "./new/Navbar"
import Random from "./new/Random"
import PopularMovies from "./new/PopularMovies"
import UserProfile from "./new/UserProfile"


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
    })
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
    render(){
      if(this.state.loggedInUser){
      return (
        <header>
       <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
       <Switch>
       <Route exact path='/' component={Random}/>
       <Route exact path='/popular' component={PopularMovies}/>
       <Route userInSession={this.state.loggedInUser} exact path='/profile' component={UserProfile}/>
       </Switch>
       </header>
       )
       }else{
         return (
         <header>
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            <Switch>
            <Route exact path='/' component={Random}/>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
              <Route exact path='/popular' component={PopularMovies}/>
              <Route userInSession={this.state.loggedInUser} exact path='/login' component={Login}/>
            </Switch>
       </header> 
      )
    }
  }
}