import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import "../../App.css"
import Navbar from '../navbar/Navbar';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import AuthService from '../auth/AuthService';
import Profile from '../contents/ProfilePage'
import PopularMovies from '../contents/PopularMovies'
import MovieDetail from '../contents/MovieDetail'
import Search from './Search'
import Random from '../contents/Random'

class Main extends Component {

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

  render() {
    console.log(this.state.loggedInUser)
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <header className="App-header">
          <h2>MAIN PAGE</h2>
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            <Profile userInSession={this.state.loggedInUser}></Profile>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
          <Link to="/"><h2>MAIN PAGE</h2></Link>
          <Link to="/movielist">FilmList</Link>
          
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            <Random/>
            <Search />
            <Switch>
            <Route exact path='/' component={Random}/>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
              <Route exact path='/movielist' component={PopularMovies}/>
              <Route userInSession={this.state.loggedInUser} exact path='/profile' component={Profile}/>
              <Route path={`/movie/:id`} component={MovieDetail}/>
            </Switch>
          </header>
        </div>
      );
    }
  }
}

export default Main;