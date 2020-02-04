import React from "react";
import styled from "styled-components";

import Menu from "./Menu";
import FrontPageLineGraph from "./FrontPageLineGraph";
import Todos from "./Todos";
import BarGraph from "./BarGraph";

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
  if (endURL === "")
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
  if (endURL !== "")
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
        />
      </React.Fragment>
    );
}

export default Home;
