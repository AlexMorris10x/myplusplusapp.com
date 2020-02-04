import React, { useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

function Signup(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    redirectTo: null
  });

  const writeText = e => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const signUp = event => {
    const { username, password, confirmPassword } = state;
    event.preventDefault();
    if (
      username &&
      username.length > 0 &&
      password &&
      password.length > 0 &&
      confirmPassword &&
      confirmPassword.length > 0
    ) {
      axios
        .post("/auth/signup", {
          username: state.username,
          password: state.password,
          redirectTo: "/signup"
        })
        .then(response => {
          if (!response.data.errmsg) {
            props.login(state.username, state.password);
            setState({
              redirectTo: "/"
            });
          } else {
            console.log(response.data.errmsg);
          }
        });
    }
  };

  if (state.redirectTo) {
    return <Redirect to={{ pathname: state.redirectTo }} />;
  }
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
      <h1>Signup</h1>
      <form onSubmit={signUp}>
        Username:
        <input
          type="text"
          name="username"
          placeholder="type username..."
          value={state.username}
          onChange={writeText}
        />
        Password:
        <input
          type="password"
          name="password"
          placeholder="type password..."
          value={state.password}
          onChange={writeText}
        />
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          placeholder="retype password..."
          value={state.confirmPassword}
          onChange={writeText}
        />
        <Button>Sign Up</Button>
      </form>
    </React.Fragment>
  );
}

export default Signup;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;
