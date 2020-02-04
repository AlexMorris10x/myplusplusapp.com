import React from "react";
import Menu from "./Menu";
import FrontPageLineGraph from "./FrontPageLineGraph";
import Todos from "./Todos";
import BarGraph from "./BarGraph";
import styled from "styled-components";

function Home(props) {
  let URL = window.location.href;
  URL = URL.split("/");
  const endURL = URL[URL.length - 1];
  if (props.error) return <h1>error happened...</h1>;
  if (props.loading === true) return <h1>loading...</h1>;
  if (props.loggedIn === false) {
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          projectText={props.projectText}
          writeProject={props.writeProject}
        />
        <HomePageWrapper>
          Welcome To PlusPlus!
          <br />
          Your path to incremental improvement. It's easy to get started:
          <br />
          1. Create your account
          <br />
          2. Create your projects and todos
          <br />
          3. Complete your todos and watch your progress increase
        </HomePageWrapper>
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
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          projectText={props.projectText}
          writeProject={props.writeProject}
        />
        <FrontPageLineGraph todos={props.todos} projects={props.projects} />
      </React.Fragment>
    );
  if (endURL !== "")
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          projectText={props.projectText}
          writeProject={props.writeProject}
        />
        <BarGraph todos={props.todos} />
        <Todos
          projects={props.projects}
          todos={props.todos}
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

const HomePageWrapper = styled.div`
  margin: 20px auto;
  padding: 30px;
  border-style: solid;
  border-width: 1.5px;
  text-align: center;
  font-size: 2em;
  color: black;
`;
