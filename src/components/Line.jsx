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
import styled from "styled-components";

export default class Line extends React.Component {
  state = {
    useCanvas: false
  };

  graphMaker = () => {
    let data = [];
    let count = 0;
    let todos = this.props.todos
      .filter(todo => todo.complete === true)
      .map(todo => {
        return this.dateConverter(todo.completeDate);
      })
      .sort((a, b) => a - b);
    todos.map((todo, index) => {
      if (todo === todos[index + 1]) {
        count++;
      } else {
        count++;
        data.push({ x: todo, y: (count / this.props.todos.length) * 100 });
        count = 0;
      }
      return data;
    });
    return data;
  };

  dateConverter = date => {
    const months = {
      Jan: 1,
      Feb: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      Aug: 8,
      Sept: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12
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

  render() {
    const { useCanvas } = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <Chart>
        <XYPlot
          xType="ordinal"
          width={600}
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
      </Chart>
    );
  }
}

const Chart = styled.div`
  text-align: center;
  display: inline-block;
  margin-right: 6px;
  background-color: #eee;
`;
