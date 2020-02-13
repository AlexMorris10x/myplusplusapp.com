import React, { useState } from "react";
import Menu from "./Menu";
import styled from "styled-components";

function Signup(props: any): any {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const writeText = (e: any) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const submitSignUp = (e: any) => {
    e.preventDefault();
    props.signUp(e, state.username, state.password);
    setState({
      username: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <React.Fragment>
      <Menu loggedIn={props.loggedIn} projects={props.projects} />
      <h1>Signup</h1>
      <FormWrapper onSubmit={e => submitSignUp(e)}>
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
        Confirm Password:
        <InputWrapper
          type="password"
          name="confirmPassword"
          placeholder="retype password..."
          value={state.confirmPassword}
          onChange={writeText}
        />
        <SignUpButton>Sign Up</SignUpButton>
      </FormWrapper>
    </React.Fragment>
  );
}

export default Signup;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
`;

const InputWrapper = styled.input`
  margin: 10px;
  padding: 2px;
  border: 1.2px solid black;
  border-radius: 10px;
`;

const SignUpButton = styled.button`
  margin: 20px auto;
  font-size: 0.8em;
  color: white;
  background: #4065b4;
  border: 2px solid black;
  border-radius: 10px;
`;
