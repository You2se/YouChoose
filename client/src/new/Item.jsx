import React, { Component } from "react";
import "../App.scss"
import DialogPop from "./Dialog"

export default class Item extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      close:true
    }
  }
 
  handleClickOpen = (params, scroll) => () => {
    if (params === 1) this.setState({ open: true, scroll });
    if (params === 1) this.setState({ close: false, scroll });
  };

  render() {
  return(
      <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'} }>
      <DialogPop open={this.state.open} close={this.state.close} title={this.props.name} score={this.props.score} overview={this.props.overview} backdrop={this.props.backdrop}/>
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <i className="material-icons">favorite</i>
          <i onClick={this.handleClickOpen(1, "paper")} className="material-icons search-icon">search</i>
          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
        </div>
      </div>
    )
  }
}


 