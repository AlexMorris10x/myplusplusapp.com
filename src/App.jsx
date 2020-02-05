import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
// import { connect } from "react-redux";

function App() {
  const [state, setState] = useState({
    error: null,
    loading: true,
    loggedIn: false,
    redirectTo: "",
    projects: [],
    todos: []
  });

  useEffect(() => {
    axios
      .all([
        axios.get("/auth/user"),
        axios.get("/project/getProject"),
        axios.get("/todo/getTodo")
      ])
      .then(
        axios.spread((userRes, projectRes, todoRes) => {
          let username = "";
          userRes.data.user === null
            ? (userRes = "")
            : (username = userRes.data.user.username.toLowerCase());
          projectRes = projectRes.data;
          const projects = projectRes.filter(
            project => project.username === username
          );
          todoRes = todoRes.data;
          const todos = todoRes.filter(todo => todo.username === username);
          const loading = false;
          let loggedIn = "";
          username === "" ? (loggedIn = false) : (loggedIn = true);
          setState({
            ...state,
            loggedIn,
            loading,
            username,
            todos,
            projects
          });
        })
      )
      .catch(setState({ ...state }));
  }, []);

  const signUp = (e, username = username.toLowerCase(), password) => {
    e.preventDefault();
    axios
      .post("/auth/signup", {
        username: username,
        password: password
      })
      .then(res => {
        if (res.data) {
          login(username, password);
        } else {
          setState({
            ...state
          });
        }
      });
  };

  const login = (e, username = username.toLowerCase(), password) => {
    e.preventDefault();
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(res => {
        if (res.status === 200) {
          setState({
            ...state,
            loggedIn: true,
            loading: false,
            username: res.data.user.username,
            redirectTo: "/"
          });
        }
      })
      .catch(setState({ ...state }));
  };

  const logout = e => {
    e.preventDefault();
    axios
      .post("/auth/logout")
      .then(res => {
        if (res.status === 200) {
          setState({
            ...state,
            loggedIn: false,
            user: null,
            redirectTo: "/login"
          });
        }
      })
      .catch(setState({ ...state }));
  };

  const addProject = (e, projectText) => {
    e.preventDefault();
    const project = {
      username: state.username,
      text: projectText
    };
    if (project.text && project.text.length > 0) {
      axios
        .post("/project/addProject", project)
        .then(res => {
          if (res.data) {
            let project = res.data;
            const projects = [...state.projects, project];
            setState({ ...state, projects });
          }
        })
        .catch(setState({ ...state }));
    }
  };

  const addTodo = (e, todoText, projectName) => {
    e.preventDefault();
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    projectName = projectName.text;
    const todo = {
      username: state.username,
      text: todoText,
      projectId: endURL,
      projectName: projectName,
      complete: false,
      completeDate: Date()
    };
    const todos = [...state.todos, todo];
    setState({ ...state, todos, todoText: "" });
    if (todo.text && todo.text.length > 0) {
      axios
        .post("/todo/addTodo", todo)
        .then(res => {
          if (res.data) {
            let todo = res.data;
            const todos = [...state.todos, todo];
            setState({ ...state, todos, todoText: "" });
          }
        })
        .catch(setState({ ...state }));
    }
  };

  const deleteProject = id => {
    const projects = state.projects.filter(project => project._id !== id);
    setState({
      ...state,
      projects
    });
    axios
      .delete(`/project/deleteProject/${id}`)
      .then(res => {
        if (res.data) {
          setState({ ...state, projects });
        }
      })
      .catch(setState({ ...state }));
  };

  const deleteTodo = id => {
    const oldState = { ...state };
    const todos = state.todos.filter(todo => todo._id !== id);
    setState({ ...state, todos });
    axios
      .delete(`/todo/deleteTodo/${id}`)
      .then(res => {
        if (res.data) {
          setState({ ...state, todos });
        }
      })
      .catch(setState({ ...oldState }));
  };

  const completeTodo = (id, complete) => {
    if (complete === true) {
      complete = false;
    } else {
      complete = true;
    }
    let todos = state.todos.map(todo => {
      if (todo._id === id) {
        todo.complete = complete;
        return todo;
      } else {
        return todo;
      }
    });
    complete = { complete: complete, completeDate: Date() };
    axios
      .put(`/todo/completeTodo/${id}`, complete)
      .then(res => {
        if (res.data) {
          setState({ ...state, todos });
        }
      })
      .catch(setState({ ...state }));
  };

  if (state.redirectTo) {
    return (
      <React.Fragment>
        <Redirect to={{ pathname: state.redirectTo }} />
        {window.location.reload()}
      </React.Fragment>
    );
  } else
    return (
      <AppWrapper>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login login={login} loggedIn={state.loggedIn} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup loggedIn={state.loggedIn} signUp={signUp} />}
          />
          <Route
            path="/"
            render={() => (
              <Home
                loggedIn={state.loggedIn}
                loading={state.loading}
                error={state.error}
                projects={state.projects}
                todos={state.todos}
                logout={logout}
                addProject={addProject}
                addTodo={addTodo}
                deleteProject={deleteProject}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            )}
          />
        </Switch>
      </AppWrapper>
    );
}

export default App;
// export default connect(mapStateTo(Home);

// const mapStateTo= state => {
//   console.log(state);
// };

const AppWrapper = styled.div`
  text-align: center;
`;
