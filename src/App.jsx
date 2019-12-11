import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Home from "./components/Home";
import DisplayLinks from "./components/DisplayLinks";
class App extends Component {
  state = {
    loggedIn: false,
    user: null
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
          loggedIn: false,
          user: null
        });
      }
    });
  };

  _logout = event => {
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

  _login = (username, password) => {
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
      <div className="App">
        <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
        <Route
          path="/projects"
          render={() => <Home user={this.state.user} />}
        />
        <Route
          exact
          path="/"
          render={() => <LoginForm _login={this._login} />}
        />
        <Route exact path="/signup" component={SignupForm} />
      </div>
    );
  }
}

export default App;
