import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
class App extends Component {
  state = {
    loggedIn: true,
    user: "null"
  };

  componentDidMount = () => {
    axios.get("/auth/user").then(response => {
      if (!!response.data.user) {
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        this.setState({
          loggedIn: true,
          user: "null"
        });
      }
    });
  };

  logout = event => {
    event.preventDefault();
    axios.post("/auth/logout").then(response => {
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  };

  login = (username, password) => {
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        }
      });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Route
          path="/"
          render={() => (
            <Home
              user={this.state.user}
              logout={this.logout}
              loggedIn={this.state.loggedIn}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => <Login login={this.login} />}
        />
        <Route
          exact
          path="/signup"
          render={() => <Signup login={this.login} />}
        />
      </div>
    );
  }
}

export default App;
