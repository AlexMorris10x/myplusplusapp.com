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
import windowSize from "react-window-size";

class FrontPageLineGraph extends React.Component {
  graphMaker = () => {
    let count = 0;
    let smallArr = [];
    let bigArr = [];
    // let data = [];
    // let cumulitiveCount = 0;
    let URL = window.location.href;
    URL = URL.split("/");
    const endURL = URL[URL.length - 1];
    // if (todos === undefined) todos = "";
    let todos = this.props.todos
      .filter(todo => todo.complete === true)
      .map(todo => {
        return this.dateConverter(
          todo.completeDate,
          todo.project,
          todo.projectName
        );
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
    // .map((todo, index) => {
    //   if (todos[index + 1] === undefined) {
    //     todos[index + 1] = todos[index];
    //     count++;
    //     smallArr.push({
    //       x: todo.completeDate,
    //       y: count,
    //       z: todo.projectName
    //     });
    //     bigArr.push(smallArr);
    //     smallArr = [];
    //   }
    //   if (
    //     todo.project === todos[index + 1].project &&
    //     todo.completeDate === todos[index + 1].completeDate
    //   ) {
    //     count++;
    //   } else if (
    //     todo.project === todos[index + 1].project &&
    //     todo.completeDate !== todos[index + 1].completeDate
    //   ) {
    //     count++;
    //     smallArr.push({
    //       x: todo.completeDate,
    //       y: count,
    //       z: todo.projectName
    //     });
    //     count = 0;
    //   } else if (todo.project !== todos[index + 1].project) {
    //     count++;
    //     smallArr.push({
    //       x: todo.completeDate,
    //       y: count,
    //       z: todo.projectName
    //     });
    //     bigArr.push(smallArr);
    //     smallArr = [];
    //     count = 0;
    //   }
    //   return bigArr;
    // })
    // .map((todo, index) => {
    //   return <LineSeries data={[todo[index]]} style={{ fill: "none" }} />;
    // });
  };

  // console.log(todos);

  // @ TODO [[{}],[{}],[{}]]
  // return an array of objects to go through

  // todos.map((todo, index) => {
  //   todos[index + 1] === undefined
  //     ? (todos[index + 1] = "")
  //     : (todos[index + 1] = todos[index + 1]);
  //   if (todo.projectName === todos[index + 1].projectName) {
  //     if (todo.completeDate === todos[index + 1].completeDate) {
  //       count++;
  //       cumulitiveCount++;
  //     } else {
  //       data.push({
  //         x: todo.projectDate,
  //         y: cumulitiveCount / this.projectLength(todo.project)
  //       });
  //       count = 0;
  //     }
  //   } else {
  //     // console.log("new item");
  //   }
  //   <LineSeries
  //   data={[
  //     { x: 16, y: 2 },
  //     { x: 17, y: 3 },
  //     { x: 18, y: 5 },
  //     { x: 19, y: 50 }
  //   ]}
  //   style={{ fill: "none" }}
  // />

  // console.log(todo.projectName);
  // this.projectLength();
  // console.log(todo);
  //   if (todo === todos[index + 1]) {
  //     count++;
  //   } else {
  //     count++;
  //     data.push({
  //       x: this.dateConverterLegible(todo),
  //       y:
  //         (count /
  //           this.props.todos.filter(todo => todo.project === endURL).length) *
  //         100
  //     });
  //     count = 0;
  //   }
  //   return data;
  // });
  // return data;
  // });

  dateConverter = (completeDate, project, projectName) => {
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

  projectLength = project => {
    let todoLength = this.todos.filter(todo => todo.project === project);
    return todoLength.length;
  };

  // dateConverterLegible = date => {
  //   const months = {
  //     ["0,1"]: "Jan",
  //     ["0,2"]: "Feb",
  //     ["0,3"]: "March",
  //     ["0,4"]: "April",
  //     ["0,5"]: "May",
  //     ["0,6"]: "June",
  //     ["0,7"]: "July",
  //     ["0,8"]: "August",
  //     ["0,9"]: "Sept",
  //     ["1,0"]: "Oct",
  //     ["1,1"]: "Nov",
  //     ["1,2"]: "Dec"
  //   };
  //   date = date.split("");
  //   let year = date.splice(0, 4).join("");
  //   let month = months[date.splice(0, 2)];
  //   let day = date.splice(0, 2).join("");
  //   let legibleDate = `${month} ${day}, ${year}`;
  //   return legibleDate;
  // };
  render() {
    return (
      <div style={styleChart}>
        <h1>{this.graphMaker()}</h1>
        {/* <h1>{this.graphMaker()}</h1> */}
        <div>
          <h3>PROJECTS OVERVIEW</h3>
          <XYPlot
            width={
              this.props.windowWidth < 850 ? this.props.windowWidth * 0.8 : 800
            }
            height={300}
          >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis orientation="bottom" title="X Axis" />
            <YAxis orientation="left" title="Y Axis" />
            {/* <LineSeries
              data={[
                { x: 16, y: 2 },
                { x: 17, y: 3 },
                { x: 18, y: 5 },
                { x: 19, y: 50 }
              ]}
              style={{ fill: "none" }}
            />
            <LineSeries
              data={[
                { x: 17, y: 1 },
                { x: 17, y: 2 },
                { x: 18, y: 3 },
                { x: 19, y: 4 }
              ]}
              style={{ fill: "none" }}
            />
            <LineSeries
              data={[
                { x: 16, y: 20 },
                { x: 17, y: 30 },
                { x: 18, y: 40 },
                { x: 19, y: 50 }
              ]}
              style={{ fill: "none" }}
            /> */}
          </XYPlot>
          <DiscreteColorLegend
            orientation="horizontal"
            items={[{ title: "123" }, { title: "hihi" }, { title: "marco" }]}
            style={{ display: "inline-flex", margin: 10 }}
          />
        </div>
      </div>
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
