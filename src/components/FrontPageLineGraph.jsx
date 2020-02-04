import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  DiscreteColorLegend
} from "react-vis";
import styled from "styled-components";

function FrontPageLineGraph(props) {
  const graphMaker = () => {
    let count = 0;
    let smallArr = [];
    let bigArr = [];
    if (todos === undefined) todos = "";
    let todos = props.todos
      .filter(todo => todo.complete === true)
      .map(todo => {
        return dateConverter(todo.completeDate, todo.project, todo.projectName);
      })
      .sort((a, b) => a.completeDate - b.completeDate)
      .sort((a, b) => {
        const project1 = a.project.toLowerCase();
        const project2 = b.project.toLowerCase();
        if (project1 < project2) {
          return -1;
        }
        if (project1 > project2) {
          return 1;
        }
        return 0;
      });
    todos = todos.map((todo, index) => {
      if (index === todos.length - 1) {
        count++;
        smallArr.push({
          x: todo.completeDate,
          y: count,
          z: todo.projectName
        });
        bigArr.push(smallArr);
        return bigArr;
      }
      if (
        todo.project === todos[index + 1].project &&
        todo.completeDate === todos[index + 1].completeDate
      ) {
        count++;
      } else if (
        todo.project === todos[index + 1].project &&
        todo.completeDate !== todos[index + 1].completeDate
      ) {
        count++;
        smallArr.push({
          x: todo.completeDate,
          y: count,
          z: todo.projectName
        });
        count = 0;
      } else if (
        todo.project !== todos[index + 1].project &&
        todo.completeDate === todos[index + 1].completeDate
      ) {
        count++;
        smallArr.push({
          x: todo.completeDate,
          y: count,
          z: todo.projectName
        });
        bigArr.push(smallArr);
        smallArr = [];
        count = 0;
      }
    });
    todos = todos[todos.length - 1];
    return todos === undefined
      ? (todos = "")
      : todos.map((todo, index) => {
          return <LineSeries data={todo} style={{ fill: "none" }} />;
        });
  };

  const dateConverter = (completeDate, project, projectName) => {
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
    completeDate = completeDate.split(" ");
    let finalCompleteDate = [];
    if (completeDate[1] in months) {
      completeDate[1] = months[completeDate[1]];
    }
    finalCompleteDate.push(completeDate[1]);
    finalCompleteDate.push(completeDate[2]);
    finalCompleteDate =
      Number(finalCompleteDate[0] - 1) * 10 + Number(finalCompleteDate[1]);
    return {
      completeDate: finalCompleteDate,
      project: project,
      projectName: projectName
    };
  };

  const graphConstraints = () => {
    let startAndEnd = props.todos.sort(
      (a, b) => a.completeDate - b.completeDate
    );
    startAndEnd === undefined || startAndEnd.length === 0
      ? (startAndEnd = "")
      : (startAndEnd = [
          Number(startAndEnd[0].completeDate.split(" ")[2]) - 1,
          Number(
            startAndEnd[startAndEnd.length - 1].completeDate.split(" ")[2]
          ) + 5
        ]);
    return startAndEnd;
  };

  const graphLabels = () => {
    let arr = [];
    if (props.projects === undefined) props.projects = "";
    let labels = props.projects;
    labels.length === 0
      ? (labels = "")
      : (labels = labels.map((project, index) => {
          arr.push({ title: project.value });
          return arr;
        }));
    return labels === undefined || labels.length === 0
      ? (labels = [])
      : (labels = labels[labels.length - 1]);
  };

  return (
    <React.Fragment>
      {props.projects.length === 0 ? (
        <h1>Please add projects...</h1>
      ) : (
        <ChartWrapper>
          <h3>PROJECTS OVERVIEW</h3>
          <XYPlot xDomain={graphConstraints()} width={300} height={200}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis orientation="bottom" title="X Axis" />
            <YAxis orientation="left" title="Y Axis" />
            {graphMaker()}
            <LegendWrapper>
              <DiscreteColorLegend
                orientation="horizontal"
                items={graphLabels().reverse()}
              />
            </LegendWrapper>
          </XYPlot>
        </ChartWrapper>
      )}
    </React.Fragment>
  );
}
export default FrontPageLineGraph;

const ChartWrapper = styled.div`
  text-align: "center";
  background-color: #eee;
  margin: auto 10%;
  > div {
    margin: auto;
  }
`;

const LegendWrapper = styled.div`
  margin: auto;
  background: white;
`;
