import React, { useState } from "react";
import Menu from "./Menu";
import styled from "styled-components";

function Signup(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const writeText = e => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const signUpLocal = e => {
    e.preventDefault();
    props.signUp(state.username, state.password);
    setState({
      username: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <React.Fragment>
      <Menu loggedIn={props.loggedIn} />
      <h1>Signup</h1>
      <form onSubmit={e => signUpLocal(e)}>
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
