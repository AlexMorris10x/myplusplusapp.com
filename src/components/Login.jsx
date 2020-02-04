import React, { useState } from "react";
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
      <UlLoggedOut>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </UlLoggedOut>
      <div>
        <h1>Login</h1>
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
          <Button
            basic={true}
            color={"blue"}
            onClick={logIn}
            content={"Login"}
            disabled={
              state.username.length === 0 || state.password.length === 0
            }
          />
        </form>
      </div>
    </div>
  );
}

export default Login;

const UlLoggedOut = styled.div`
  display: flex;
  background-color: #333;
  align-items: flex-end;
  justify-content: space-between;
  margin: auto;
  padding: 20px;
  flex-direction: column;
`;

const Button = styled.button`
  // background: ${props => (props.primary ? "palevioletred" : "white")};
  // color: ${props => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
