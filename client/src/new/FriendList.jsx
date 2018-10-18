import React, { Component } from "react";
import "../App.scss";
import TitleList from "./TitleList"

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: this.props.userInSession,
      //list: props.list
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, friendsList: nextProps["userInSession"] });
    
  }

  getMaxGenres = object => {
    return Object.keys(object).filter(x => {
      return object[x] === Math.max.apply(null, Object.values(object));
    });
  };

  render() {
    //console.log(this.props.userInSession)
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
    
    
    let amigo = this.state.friendsList.map(e => {
      //console.log(e)
     if(e.friendsList !== undefined) {
      return e.friendsList.map(ele => {
        
        genre = this.getMaxGenres(ele.amigo.favGenres)
        
        return(
            <div> 
            <div><span>User:{ele.amigo.amigo}</span> ProfileImage:<img style={{width:40, height:40}}src={ele.amigo.imgPath} alt="" /> </div>
            <p>{genre.map((e)=>{
             return e
             })}</p>
              <TitleList
            userInSession={this.state.loggedInUser}
            title="Recommended Picks for you and your friends"
            url="discover/tv?sort_by=popularity.desc&page=1"
          />
            </div>
          
           
          
        )
      })
    }
    return(<p></p>)     
  })
    
    
    return (  
    <div>
    {amigo}
    </div>
    )
  }
}