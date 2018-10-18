import React, { Component } from "react";
import "../App.scss";

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: props.userInSession,
      //list: props.list
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, friendsList: nextProps["userInSession"] });
    this.forceUpdate();
  }

  getMaxGenres = object => {
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null, Object.values(object));
    });
  };

  render() {
    
    let genre;
    // let amigo = this.state.friendsList.map((e)=>{
    //   return e.map((ele)=>{
    //    
    //       return (
    //         <div>
    //       <p>{ele.amigo.amigo}</p>
    //      <p>{genre.map((e)=>{
    //         return e
    //       })}</p> 
    //       </div>
    //       )
    //   })
    // })
    let amigo =
    
    this.state.friendsList.map(e => {
     if(e.friendsList !== undefined) {
      return e.friendsList.map(ele => {
        genre = this.getMaxGenres(ele.amigo.favGenres)
        
        return(
            <div> 
            <p>{ele.amigo.amigo}</p>
            <p>{genre.map((e)=>{
             return e
             })}</p>
            </div>
        )
      })
    }
    else {
      return <p>No tienes amigos</p>
    }     
  })
    
    
    return (
    <div>
    {amigo}
    </div>
    )
  }
}