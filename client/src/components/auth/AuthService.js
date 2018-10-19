// auth/auth-service.js
import axios from "axios";

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL:`${process.env.REACT_APP_API_URL}/api/`,
      withCredentials: false
    });
  }

  signup = (username, password, genres, file) => {
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("genres", JSON.stringify(genres));

    return this.service
      .post("auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => response.data)
      .catch(e => console.log(e));
  };

  login = (username, password) => {
    return this.service
      .post("auth/login", { username, password })
      .then(response => response.data);
  };

  loggedin = () => {
    return this.service.get("auth/currentUser").then(response => response.data);
  };

  logout = () => {
    return this.service.get("auth/logout").then(response => response.data);
  };
  friendsGet = (friendName, user) => {
    //console.log(user)
    return this.service
      .get(`auth/friends/${friendName}`, { friendName, user })
      .then(response => response.data);
  };
  friends = (friendName, user, friendGenres, imgPath) => {
    return this.service
      .post("auth/friends", { friendName, user, friendGenres, imgPath })
      .then(response => response.data);
  };
  genre = (user, genreName) => {
    return this.service
      .post("auth/genres", {user, genreName })
      .then(response => response.data);
  };
}

