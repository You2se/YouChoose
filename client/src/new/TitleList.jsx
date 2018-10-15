import React, { Component } from "react";
import "../App.css"

export default class TitleList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      mounted: false
    }
  }

  loadContent () {
    var requestUrl ='https://api.themoviedb.org/3/' + this.props.url + '&api_key=166624c030b91c943c397020f20525b4';
    fetch(requestUrl).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        data: data
      })
    }).catch((err) => {
        console.log("There has been error");
      })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.url !== this.props.url && nextProps.url !== ''){
      this.setState({
        url: nextProps.url,
        mounted: true
      }, function () {
        this.loadContent();
      })   
    }
  }

  componentDidMount(){
    if(this.props.url !== '') {
      this.loadContent();
      this.setState({
        mounted:true
      })
    }
  }

  render() {
    let titles = '';
    if(this.state.data.results){
      titles = this.state.data.results.map((title, i) => {
        if(i < 5){
          var name = '';
          var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if(!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
            <Item key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop}/>
          )
        } else {
          return (
            <div key={title.id}></div>
          )
        }
      })
    }

    return(
      <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">
            {titles}
          </div>
        </div>
      </div>
    )
  }
}

export class Item extends Component {
  render() {
    return(
      <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'} }>
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <i className="material-icons">favorite</i>
          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
        </div>
      </div>
    )
  }
}

 