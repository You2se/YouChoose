import React, { Component } from "react";
import "../App.scss"
import DialogPop from "./Dialog"

export default class Item extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      close:true,
      loggedUser: props.userInSession
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedUser:nextProps["userInSession"] });
  }

 handleLike = (e) => {
   let num = 1;
console.log(this.state.loggedUser.favGenres.action)
let action=this.state.loggedUser.favGenres.action;
this.setState({
  loggedUser:{...this.loggedUser,action:this.state.loggedUser.favgenres.action+1}
  })
}
  handleClickOpen = () => {
     this.setState({ open: true});
     this.setState({ close: false});
  };

  render() {
  return(
      <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'} }>
       <div className="model">   
          <DialogPop open={this.state.open} close={this.state.close} title={this.props.name} score={this.props.score} overview={this.props.overview} backdrop={this.props.backdrop}/>
          </div>
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <i className="material-icons favorite" onClick={()=>this.handleLike(this.props.all)}>favorite</i>
          {/* <i className="material-icons search-icon" onClick={()=>this.handleClickOpen()}>search</i> */}
          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
        </div>
      </div>
    )
  }
}


 