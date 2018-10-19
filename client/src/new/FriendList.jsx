import React, { Component } from "react";
import "../styles/App.scss";
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
            <div> 
            <div className="FriendList">
              <div>
                <p className="friend-name">{ele.amigo.amigo.charAt(0).toUpperCase() + ele.amigo.amigo.substring(1)}</p>
                <img className="User-Image" style={{width:40, height:40}}src={ele.amigo.imgPath} alt="" /> 
                </div>
            </div>
            <div>
            <p className="FriendsGenre">{genre.map((e)=>{
             return e.charAt(0).toUpperCase() + e.substring(1) + ","
             })}</p>
             </div>
             <br></br>
            </div>
            
              
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