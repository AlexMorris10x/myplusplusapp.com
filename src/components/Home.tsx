import React from "react";
import Menu from "./Menu";
import FrontPageLineGraph from "./FrontPageLineGraph";
import styled from "styled-components";
import Todos from "./Todos";
import BarGraph from "./BarGraph";

function Home(props: any): any {
  if (props.error) return <h1>error happened...</h1>;
  if (props.loading === true) {
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          moveProject={props.moveProject}
        />
        <h1>loading...</h1>
      </React.Fragment>
    );
  }

  if (props.endURL === "" && props.loggedIn === false) {
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          moveProject={props.moveProject}
        />
        {/* <HomePageWrapper>
          <div onClick={(e: any) => props.login(e, "test", "test")}>
            click me!
          </div>
        </HomePageWrapper> */}
      </React.Fragment>
    );
  }

  if (props.endURL === "") {
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          moveProject={props.moveProject}
        />
        <FrontPageLineGraph todos={props.todos} projects={props.projects} />
      </React.Fragment>
    );
  }

  if (props.endURL !== "")
    return (
      <React.Fragment>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          moveProject={props.moveProject}
        />
        <BarGraph todos={props.todos} endURL={props.endURL} />
        <Todos
          projects={props.projects}
          todos={props.todos}
          addTodo={props.addTodo}
          deleteTodo={props.deleteTodo}
          completeTodo={props.completeTodo}
          moveTodo={props.moveTodo}
          endURL={props.endURL}
          projectName={props.projectName}
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
