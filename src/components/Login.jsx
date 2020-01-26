import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  writeText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  logIn = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
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
            <h1>Login</h1>
            <Form>
              <Form.Field>
                <label htmlFor="username">Username: </label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.writeText}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.writeText}
                />
              </Form.Field>
              <Button
                basic={true}
                color={"blue"}
                onClick={this.logIn}
                content={"Login"}
                disabled={
                  this.state.username.length === 0 ||
                  this.state.password.length === 0
                }
              />
            </Form>
          </Container>
        </div>
      );
    }
  }
}

const styleUlLoggedout = {
  display: "flex",
  backgroundColor: "#333",
  alignItems: "flex-end",
  justifyContent: "space-between",
  margin: "auto",
  padding: 20,
  flexDirection: "column"
};

export default Login;
