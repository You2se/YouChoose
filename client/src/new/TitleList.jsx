import React, { Component } from "react";
import "../App.scss";
import Item from "./Item";

export default class TitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: null,
      data: [],
      mounted: false,
      imageNum: 0,
      imageIndex: 5
    };
  }

  loadContent() {
    var requestUrl =
      "https://api.themoviedb.org/3/" +
      this.props.url +
      "&api_key=166624c030b91c943c397020f20525b4";
    fetch(requestUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(err => {
        console.log("There has been error");
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, genres: nextProps["userInSession"] });

    if (nextProps.url !== this.props.url && nextProps.url !== "") {
      this.setState(
        {
          url: nextProps.url,
          mounted: true
        },
        function() {
          this.loadContent();
        }
      );
    }
  }

  componentDidMount() {
    if (this.props.url !== "") {
      this.loadContent();
      this.setState({
        mounted: true
      });
    }
  }

  nextMovie() {
    this.setState({
      imageNum: this.state.imageNum + 1,
      imageIndex: this.state.imageIndex + 1
    });
  }
  previousMovie() {
    this.setState({
      imageNum: this.state.imageNum - 1,
      imageIndex: this.state.imageIndex - 1
    });
  }

  render() {
    let titles = "";
    let imageNum = this.state.imageNum;
    let imageIndex = this.state.imageIndex;
    if (this.state.data.results) {
      titles = this.state.data.results.map((title, i) => {
        if (i < imageNum) {
          return "";
        }
        if (i < imageIndex) {
          var name = "";
          var backDrop =
            "http://image.tmdb.org/t/p/original" + title.backdrop_path;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }
          return (
            <Item
              key={title.id}
              title={name}
              score={title.vote_average}
              overview={title.overview}
              backdrop={backDrop}
            />
          );
        } else {
          return <div key={title.id} />;
        }
      });
    }

    return (
      <div
        ref="titlecategory"
        className="TitleList"
        data-loaded={this.state.mounted}
      >
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">{titles}</div>
        </div>
        <button onClick={() => this.previousMovie()}>Previous</button>
        <button onClick={() => this.nextMovie()}>Next</button>
      </div>
    );
  }
}
