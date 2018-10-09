import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

// import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
// import ProjectDetails from './components/projects/ProjectDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/auth/AuthService';
import Contents from './components/contents/Contents'
import PopularMovies from './components/contents/PopularMovies'

class App extends Component {

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
    this.fetchUser()

    if(this.state.loggedInUser){
      return (
        <div className="App">
          <header className="App-header">
          <h2>MAIN PAGE</h2>
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            <Contents></Contents>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
          <h2>MAIN PAGE</h2>
          <Link to="/movielist">FilmList</Link>
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            <Switch>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
              <Route exact path='/movielist' component={PopularMovies}/>
            </Switch>
          </header>
        </div>
      );
    }
  }
}

export default App;