import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
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
    <div className="CustomForm">
      <UlLoggedOut>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </UlLoggedOut>
      <div>
        <h1>Signup</h1>
        <form>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={writeText}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={writeText}
          />
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={writeText}
          />
          <button
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
        </form>
      </div>
    </div>
  );
}

export default Signup;

const UlLoggedOut = styled.div`
  display: flex;
  background-color: #333";
  align-items: flex-end;
  justify-content: space-between;
  margin: auto;
  padding: 20;
  flex-direction: column;
`;
