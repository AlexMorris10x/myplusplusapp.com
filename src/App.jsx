import React, { Component } from "react";
import axios from "axios";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
class App extends Component {
  state = {
    user: "",
    loggedIn: true,
    redirectTo: ""
  };

  componentDidMount = () => {
    axios.get("/auth/user").then(response => {
      if (response.data.user) {
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
          user: null,
          redirectTo: "/login"
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
          this.setState({
            loggedIn: true,
            user: response.data.user,
            redirectTo: "/"
          });
        }
      });
  };

  render() {
    if (this.state.redirectTo) {
      return (
        <React.Fragment>
          <Redirect to={{ pathname: this.state.redirectTo }} />
          {window.location.reload()}
        </React.Fragment>
      );
    } else
      return (
        <div style={styleContainer}>
          <Switch>
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
          </Switch>
        </div>
      );
  }
}

const styleContainer = {
  textAlign: "center"
};

export default App;
