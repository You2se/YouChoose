// auth/auth-service.js
import axios from 'axios';

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/api/',
      withCredentials: false
    });
  }

  signup = (username, password, genres ) => {
    return this.service.post('auth/signup', {username, password, genres})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('auth/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('auth/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('auth/logout',)
    .then(response => response.data)
  }
  friendsGet = (friendName, user) => {
    //console.log(user)
    return this.service.get(`auth/friends/${friendName}`, {friendName, user})
    .then(response => response.data)
  }
friends = (friendName, user) => {
  console.log(user)
    return this.service.post('auth/friends', {friendName, user})
    .then(response => response.data)
  }
}

