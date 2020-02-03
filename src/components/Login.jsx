import React, { useState } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
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
    <div className="CustomForm">
      <styleUlLoggedout>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </styleUlLoggedout>
      <Container text>
        <h1>Login</h1>
        <Form>
          <Form.Field>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={state.username}
              onChange={writeText}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={writeText}
            />
          </Form.Field>
          <Button
            basic={true}
            color={"blue"}
            onClick={logIn}
            content={"Login"}
            disabled={
              state.username.length === 0 || state.password.length === 0
            }
          />
        </Form>
      </Container>
    </div>
  );
}

export default Login;

const styleUlLoggedout = styled.div`
  display: flex;
  background-color: #333;
  align-items: flex-end;
  justify-content: space-between;
  margin: auto;
  padding: 20px;
  flex-direction: column;
`;
