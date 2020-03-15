import React from "react";
import Menu from "./Menu";
import FrontPageLineGraph from "./FrontPageLineGraph";
import styled from "styled-components";
import Todos from "./Todos";
import BarGraph from "./BarGraph";
import axios from "axios";
import { setState, store } from "../store";
import useSharedState from "use-simple-shared-state";
import { orderProjects } from "../helpers";
import { Generic } from "../types";

function Home(props: any): any {
  const [state] = useSharedState(store, [(s: Generic) => s]);

  let orderedProjects = orderProjects(state.projects);
  ////
  // creates new project to list
  const addProject = (e: any, projectText: string) => {
    e.preventDefault();
    const project = {
      username: state.username,
      text: projectText,
      order: null
    };
    createProjectOrderVal(orderedProjects, project);
    if (project.text && project.text.length > 0) {
      axios
        .post("/project/addProject", project)
        .then(res => {
          if (res.data) {
            let project = res.data;
            const projects = [...state.projects, project];
            setState({ ...state, projects });
          }
        })
        .catch(() => setState({ ...state }));
    }
  };

  const createProjectOrderVal = (projects: any[], project: any) => {
    if (projects.length === 0) return;
    let previousProject = projects[0]._id;
    project.order = previousProject;
    return project;
  };

  if (props.error) return <h1>error happened...</h1>;
  if (props.loading === true) {
    return (
      <>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          deleteProject={props.deleteProject}
          moveProject={props.moveProject}
        />
        <h1>loading...</h1>
      </>
    );
  }

  if (props.endURL === "" && props.loggedIn === false) {
    return (
      <>
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
      </>
    );
  }

  if (props.endURL === "") {
    return (
      <>
        <Menu
          logout={props.logout}
          loggedIn={props.loggedIn}
          projects={props.projects}
          addProject={props.addProject}
          deleteProject={props.deleteProject}
          moveProject={props.moveProject}
        />
        <FrontPageLineGraph todos={props.todos} projects={props.projects} />
      </>
    );
  }

  if (props.endURL !== "")
    return (
      <>
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
      </>
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
