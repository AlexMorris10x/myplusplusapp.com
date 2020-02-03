import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  const [state, setState] = useState({
    error: null,
    loading: true,
    loggedIn: false,
    redirectTo: "",
    username: "",
    projects: [],
    todos: [],
    projectText: "",
    todoText: ""
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
            : (username = userRes.data.user.username);
          projectRes = projectRes.data;
          const projects = projectRes.filter(
            project => project.username === username
          );
          todoRes = todoRes.data;
          const todos = todoRes.filter(todo => todo.username === username);
          const loggedIn = true;
          const loading = false;
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

  const login = (username, password) => {
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

  const logout = event => {
    event.preventDefault();
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

  const writeProject = e => {
    e.preventDefault();
    const projectText = e.target.value;
    setState({ ...state, projectText });
  };

  const writeTodo = e => {
    e.preventDefault();
    const todoText = e.target.value;
    setState({ ...state, todoText });
  };

  const addProject = projectText => {
    const project = {
      username: state.username,
      value: projectText
    };
    if (project.value && project.value.length > 0) {
      axios
        .post("/project/addProject", project)
        .then(res => {
          if (res.data) {
            let project = res.data;
            const projects = [...state.projects, project];
            setState({ ...state, projects, projectText: "" });
          }
        })
        .catch(setState({ ...state }));
    }
  };

  const addTodo = (todoText, projectName) => {
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    projectName = projectName.value;
    const todo = {
      username: state.username,
      value: todoText,
      project: endURL,
      projectName: projectName,
      complete: false,
      completeDate: Date()
    };
    const todos = [...state.todos, todo];
    setState({ ...state, todos, todoText: "" });
    if (todo.value && todo.value.length > 0) {
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
    console.log();
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

  const moveProject = () => {
    console.log("moveProject");
  };

  const moveTodo = () => {
    console.log("moveTodos");
  };

  // moveTodo = todoLocation => {
  //   if (todoLocation.destination === null) return;
  //   const oldState = { ...state };
  //   let newState = { ...state };
  //   const source = todoLocation.source.index;
  //   const destination = todoLocation.destination.index;
  //   let movedTodo = newstate.todos.reverse();
  //   movedTodo = newstate.todos.splice(source, 1);
  //   movedTodo = movedTodo[0];
  //   const project = movedTodo.project;
  //   newstate.todos.splice(destination, 0, movedTodo);
  //   newstate.todos = newstate.todos.reverse();
  //   axios
  //     .delete(`/todo/moveTodoDelete/${project}`)
  //     .then(res => {
  //       if (res.data) {
  //         axios
  //           .put(`/todo/moveTodoAdd/${project}`, newstate.todos)
  //           .catch(err => console.log(err));
  //         setState({ ...state, oldState });
  //       }
  //     })
  //     .catch(err => console.log(err));
  //   setState({ ...state, oldState });
  // };

  // moveProject = projectLocation => {
  //   if (projectLocation.destination === null) return;
  //   const oldState = { ...state };
  //   let newState = { ...state };
  //   const source = projectLocation.source.index;
  //   const destination = projectLocation.destination.index;
  //   let movedProject = newstate.projects.reverse();
  //   movedProject = newstate.projects.splice(source, 1);
  //   movedProject = movedProject[0];
  //   const username = movedProject.username;
  //   newstate.projects.splice(destination, 0, movedProject);
  //   newstate.projects = newstate.projects.reverse();
  //   axios
  // .delete(`/project/moveProjectDelete/${username}`)
  //     .then(res => {
  //       if (res.data) {
  //         axios
  // .put(`/project/moveProjectAdd/${username}`, newstate.projects)
  //           .catch(err => console.log(err));
  //         setState({ ...state, oldState });
  //       }
  //     })
  //     .catch(err => console.log(err));
  //   setState({ ...state, oldState });
  // };

  if (state.redirectTo) {
    return (
      <React.Fragment>
        <Redirect to={{ pathname: state.redirectTo }} />
        {window.location.reload()}
      </React.Fragment>
    );
  } else
    return (
      <StyleHome>
        <Switch>
          <Route exact path="/login" render={() => <Login login={login} />} />
          <Route exact path="/signup" render={() => <Signup login={login} />} />
          <Route
            path="/"
            render={() => (
              <Home
                user={state.user}
                loggedIn={state.loggedIn}
                loading={state.loading}
                username={state.username}
                error={state.error}
                projects={state.projects}
                todos={state.todos}
                projectText={state.projectText}
                todoText={state.todoText}
                logout={logout}
                writeProject={writeProject}
                writeTodo={writeTodo}
                addProject={addProject}
                addTodo={addTodo}
                deleteProject={deleteProject}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
                moveProject={moveProject}
                moveTodo={moveTodo}
              />
            )}
          />
        </Switch>
      </StyleHome>
    );
}

const StyleHome = styled.div`
  text-align: center;
`;

export default App;
