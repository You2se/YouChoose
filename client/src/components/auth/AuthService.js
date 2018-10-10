// auth/auth-service.js
import axios from 'axios';

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/api/auth',
      withCredentials: false
    });
  }

  signup = (username, password) => {
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

