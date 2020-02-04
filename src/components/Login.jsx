import React, { useState } from "react";
import Menu from "./Menu";
import styled from "styled-components";

function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const writeText = e => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const logIn = e => {
    e.preventDefault();
    props.login(state.username, state.password);
    setState({
      ...state
    });
  };

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
      <h1>Login</h1>
      <form>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={writeText}
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={writeText}
        />
        <Button onClick={logIn} />
      </form>
    </React.Fragment>
  );
}

export default Login;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
