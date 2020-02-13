import React, { useState } from "react";
import Menu from "./Menu";
import styled from "styled-components";

function Login(props: any): any {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const writeText = (e: any) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const submitLogIn = (e: any) => {
    e.preventDefault();
    props.login(e, state.username, state.password);
    setState({
      username: "",
      password: ""
    });
  };

  return (
    <React.Fragment>
      <Menu loggedIn={props.loggedIn} projects={props.projects} />
      <h1>Login</h1>
      <FormWrapper onSubmit={e => submitLogIn(e)}>
        Username:
        <InputWrapper
          type="text"
          name="username"
          placeholder="type username..."
          value={state.username}
          onChange={writeText}
        />
        Password:
        <InputWrapper
          type="password"
          name="password"
          placeholder="type password..."
          value={state.password}
          onChange={writeText}
        />
        <LogInButton>Log In</LogInButton>
      </FormWrapper>
    </React.Fragment>
  );
}

export default Login;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
`;

const InputWrapper = styled.input`
  margin: 10px;
  padding: 2px;
  border-radius: 10px;
`;

const LogInButton = styled.button`
  margin: 20px auto;
  font-size: 0.8em;
  color: white;
  background: #4065b4;
  border: 2px solid black;
  border-radius: 10px;
`;
