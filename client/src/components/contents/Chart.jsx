import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["Drama", "Comedy", "Action", "Animation"],
        datasets: [
          {
            label: "Genres of Movies",
            backgroundColor: ["red", "orange", "blue", "greenyellow"],
            borderColor: "rgb(, 0, 0)",
            data: [this.props.genresUser.drama, this.props.genresUser.comedy, this.props.genresUser.action, this.props.genresUser.animation],
            maintainAspectRatio: false
          }
        ]
      }
    };

  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, genresUser: nextProps["genresUser"] });
  }

  render(){
    return(
      <div className="chart">
      <Pie data={this.state.data} height={20} width={200} />
    </div>
    )
  }
}
