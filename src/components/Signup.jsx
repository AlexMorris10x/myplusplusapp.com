import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, Form, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import styled from "styled-components";

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
    <div className="CustomForm">
      <ul style={styleUlLoggedout}>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </ul>
      <Container text>
        <h1>Signup</h1>
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
          <Form.Field>
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={writeText}
            />
          </Form.Field>
          <Button
            basic={true}
            color={"blue"}
            onClick={signUp}
            content={"Sign Up"}
            disabled={
              state.username.length === 0 ||
              state.password.length === 0 ||
              state.confirmPassword.length === 0
            }
          />
        </Form>
      </Container>
    </div>
  );
}

export default Signup;

const styleUlLoggedout = {
  display: "flex",
  backgroundColor: "#333",
  alignItems: "flex-end",
  justifyContent: "space-between",
  margin: "auto",
  padding: 20,
  flexDirection: "column"
};
