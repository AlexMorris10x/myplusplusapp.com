import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas
} from "react-vis";
import windowSize from "react-window-size";

class FrontPageLineGraph extends React.Component {
  state = {
    useCanvas: false
  };

  graphMaker = () => {
    let URL = window.location.href;
    URL = URL.split("/");
    const endURL = URL[URL.length - 1];

    let data = [];
    let count = 0;
    let todos = this.props.todos
      .filter(todo => todo.complete === true && todo.project === endURL)
      .map(todo => {
        return this.dateConverter(todo.completeDate);
      })
      .sort((a, b) => a - b);
    todos.map((todo, index) => {
      if (todo === todos[index + 1]) {
        count++;
      } else {
        count++;
        data.push({
          x: this.dateConverterLegible(todo),
          y:
            (count /
              this.props.todos.filter(todo => todo.project === endURL).length) *
            100
        });
        count = 0;
      }
      return data;
    });
    return data;
  };

  dateConverter = date => {
    const months = {
      Jan: "01",
      Feb: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      Aug: "08",
      Sept: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };
    date = date.split(" ");
    let finalDate = [];
    finalDate.push(date[3]);
    if (date[1] in months) {
      date[1] = months[date[1]];
    }
    finalDate.push(date[1]);
    finalDate.push(date[2]);
    return finalDate.join("");
  };

  dateConverterLegible = date => {
    const months = {
      ["0,1"]: "Jan",
      ["0,2"]: "Feb",
      ["0,3"]: "March",
      ["0,4"]: "April",
      ["0,5"]: "May",
      ["0,6"]: "June",
      ["0,7"]: "July",
      ["0,8"]: "August",
      ["0,9"]: "Sept",
      ["1,0"]: "Oct",
      ["1,1"]: "Nov",
      ["1,2"]: "Dec"
    };
    date = date.split("");
    let year = date.splice(0, 4).join("");
    let month = months[date.splice(0, 2)];
    let day = date.splice(0, 2).join("");
    let legibleDate = `${month} ${day}, ${year}`;
    return legibleDate;
  };

  render() {
    const { useCanvas } = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <React.Fragment>
        <div style={styleChart}>
          <h3>PROGRESS METER</h3>
          <XYPlot
            xType="ordinal"
            width={
              this.props.windowWidth < 850 ? this.props.windowWidth * 0.8 : 800
            }
            height={300}
            xDistance={1000}
            yDomain={[0, 100]}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <BarSeries
              className="vertical-bar-series-example"
              data={this.graphMaker()}
            />
          </XYPlot>
        </div>
      </React.Fragment>
    );
  }
}
export default windowSize(FrontPageLineGraph);

const styleChart = {
  textAlign: "center",
  display: "inline-block",
  marginRight: 6,
  backgroundColor: "#eee",
  marginTop: 20
};
