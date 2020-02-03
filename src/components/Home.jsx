import React from "react";
import windowSize from "react-window-size";
import styled from "styled-components";
import Menu from "./Menu";
import FrontPageLineGraph from "./FrontPageLineGraph";
import Projects from "./Projects";
import Todos from "./Todos";
import BarGraph from "./BarGraph";
// import { Redirect, Link } from "react-router-dom";
// import { connect } from "react-redux";

function Home(props) {
  let URL = window.location.href;
  URL = URL.split("/");
  const endURL = URL[URL.length - 1];
  if (props.error)
    return (
      <div>
        <h3>ERROR HAPPENED</h3>
        <h5>{props.error}</h5>
      </div>
    );
  if (props.loading === true)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  if (props.loggedIn === false) {
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          username={props.username}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          moveProject={props.moveProject}
          projectText={props.projectText}
          writeProject={props.writeProject}
        />
        <div>
          <h1>Welcome To PlusPlus!</h1>
          <h1>
            Your path to incremental improvement. It's easy to get started:
          </h1>
          <h1>1. Create your account</h1>
          <h1>2. Create your projects and todos</h1>
          <h1>3. Complete your todos and watch your progress increase</h1>
        </div>
      </React.Fragment>
    );
  }
  if (endURL === "" && props.windowWidth > 1200)
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          username={props.username}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          projectText={props.projectText}
          writeProject={props.writeProject}
          moveProject={props.moveProject}
        />
        <div>
          <div>
            <Projects
              logout={props.logout}
              loggedIn={props.loggedIn}
              projects={props.projects}
              username={props.username}
              addProject={props.addProject}
              deleteProject={props.deleteProject}
              projectText={props.projectText}
              writeProject={props.writeProject}
              // moveProject={moveProject}
            />
          </div>
          <div>
            {props.projects.length === 0 ? (
              <h1>Please add projects...</h1>
            ) : (
              <FrontPageLineGraph
                todos={props.todos}
                projects={props.projects}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  if (endURL === "" && props.windowWidth < 1200)
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          username={props.username}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          projectText={props.projectText}
          writeProject={props.writeProject}
          moveProject={props.moveProject}
        />
        <div>
          {props.projects.length === 0 ? (
            <h1>Please add projects...</h1>
          ) : (
            <FrontPageLineGraph todos={props.todos} projects={props.projects} />
          )}
        </div>
      </React.Fragment>
    );
  if (endURL !== "" && props.windowWidth > 1200)
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          username={props.username}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          projectText={props.projectText}
          writeProject={props.writeProject}
          moveProject={props.moveProject}
        />
        <div>
          <div>
            <Projects
              logout={props.logout}
              loggedIn={props.loggedIn}
              projects={props.projects}
              username={props.username}
              addProject={props.addProject}
              deleteProject={props.deleteProject}
              projectText={props.projectText}
              writeProject={props.writeProject}
              moveProject={props.moveProject}
            />
          </div>
          <div>
            <BarGraph todos={props.todos} />
            <Todos
              projects={props.projects}
              todos={props.todos}
              username={props.username}
              addTodo={props.addTodo}
              deleteTodo={props.deleteTodo}
              completeTodo={props.completeTodo}
              todoText={props.todoText}
              writeTodo={props.writeTodo}
              moveTodo={props.moveTodo}
            />
          </div>
        </div>
      </React.Fragment>
    );
  if (endURL !== "" && props.windowWidth < 1200)
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          username={props.username}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          projectText={props.projectText}
          writeProject={props.writeProject}
          moveProject={props.moveProject}
        />
        <BarGraph todos={props.todos} />
        <Todos
          projects={props.projects}
          todos={props.todos}
          username={props.username}
          addTodo={props.addTodo}
          deleteTodo={props.deleteTodo}
          completeTodo={props.completeTodo}
          todoText={props.todoText}
          writeTodo={props.writeTodo}
          // moveTodo={moveTodo}
        />
      </React.Fragment>
    );
}

export default windowSize(Home);
// export default connect(mapStateToProps)(Home);

// const mapStateToProps = state => {
//   console.log(state);
// };

// const StyleWrapper = styled.div`
//   display: flex;
// `;

// const StyleLineGraph = styled.div``;

// const StyleProject = styled.div`
//   margin: 30px;
//   border: 1.5px solid;
//   backgroundcolor: "lightgrey";
//   // height: "93vh";
//   width: 300px;
//   margin: "auto";
//   position: "fixed";
// `;
// const StyleFrontPageLineGraph = styled.div`
//   margin: "auto",
//   marginLeft: 400px
// `;

// style={{
//   margin: 30,
//   border: "1.5px solid black",
//   backgroundColor: "lightgrey",
//   height: "93vh",
//   width: 300,
//   margin: "auto",
//   position: "fixed"
