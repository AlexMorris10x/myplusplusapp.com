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
      <Menu logout={props.logout} loggedIn={props.loggedIn} />
      <h1>Login</h1>
      <form onSubmit={logIn}>
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
        <Button>Log In</Button>
      </form>
    </React.Fragment>
  );
}

export default Login;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;
