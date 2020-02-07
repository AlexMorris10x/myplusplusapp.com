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
    username: "",
    projects: [],
    todos: []
  });

  useEffect(() => {
    axios
      .all([
        axios.get("/auth/user"),
        axios.get("/project/getProject/"),
        axios.get("/todo/getTodo")
      ])
      .then(
        axios.spread((userRes, projectRes, todoRes) => {
          let username = "";
          userRes.data.user === null
            ? (userRes = "")
            : (username = userRes.data.user.username);
          let projects = projectRes.data;
          let todos = todoRes.data;
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
      // .catch((state.loading = false), setState({ ...state }));
      .catch(
        (state.loading = false),
        (state.loggedIn = true),
        setState({ ...state })
      );
  }, []);

  const signUp = (e, username, password) => {
    e.preventDefault();
    username = username.toLowerCase();
    axios
      .post("/auth/signup", {
        username: username,
        password: password
      })
      .then(res => {
        if (res.data) {
          login(e, username, password);
        } else {
          setState({
            ...state
          });
        }
      });
  };

  const login = (e, username, password) => {
    e.preventDefault();
    username = username.toLowerCase();
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
    // axios
    //   .post("/auth/logout")
    //   .then(res => {
    //     if (res.status === 200) {
    //       setState({
    //         ...state,
    //         loggedIn: false,
    //         user: null,
    //         redirectTo: "/login"
    //       });
    //     }
    //   })
    //   .catch(setState({ ...state }));
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
    let todo = {
      username: state.username,
      text: todoText,
      projectId: endURL,
      projectName: projectName,
      complete: false,
      completeDate: Date(),
      order: null
    };
    createOrder(state.todos, todo);
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

  const createOrder = (todos, todo) => {
    if (todos.length === 0) return;
    let previousTodo = todos[todos.length - 1]._id;
    todo.order = previousTodo;
    return todo;
  };

  const deleteProject = id => {
    const projects = state.projects.filter(project => project._id !== id);
    setState({ ...state, projects });
    axios
      .all([
        axios.delete(`/project/deleteProject/${id}`),
        axios.delete(`/project/deleteTodos/${id}`)
      ])
      .then(
        axios.spread((deleteProjectRes, deleteTodosRes) => {
          if (deleteProjectRes.data && deleteTodosRes.data) {
            setState({ ...state, projects });
          }
        })
      )
      .catch(setState({ ...state }));
  };

  const deleteTodo = id => {
    const todos = state.todos.filter(todo => todo._id !== id);
    setState({ ...state, todos });
    axios
      .delete(`/todo/deleteTodo/${id}`)
      .then(res => {
        if (res.data) {
          setState({ ...state, todos });
        }
      })
      .catch(setState({ ...state }));
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

  const moveTodo = (todoLocation, todos) => {
    console.log();
    // if (todoLocation.destination === null) return;
    // const source = todoLocation.source.index;
    // const destination = todoLocation.destination.index;
    // // if (destination === todos.length - 1) {
    // //   console.log("bottom");
    // // }
    // // if (destination === 0) {
    // //   todos[source - 1].order = todos[source + 1]._id;
    // //   todos[source].order = todos[destination]._id;
    // // }
    // // if (destination !== 0 || destination === todos.length - 1) {
    // //   console.log(true);
    // console.log(source, destination);
    // if (destination < source) {
    //   todos[source - 1].order = todos[source + 1]._id;
    //   todos[source].order = todos[destination]._id;
    //   todos[destination - 1].order = todos[source]._id;
    //   setState({ ...state, todos });
    // }
    // if (destination > source) {
    //   console.log("lower");
    //   // todos[source - 1].order = todos[source + 1]._id;
    //   // todos[source].order = todos[destination]._id;
    //   // todos[destination - 1].order = todos[source]._id;
    //   // setState({ ...state, todos });
    // }
    // axios
    //   .all([
    //     axios.delete(`/todo/moveTodoDelete/${projectId}`),
    //     axios.post(`/todo/moveTodoAdd/${projectId}`, todos)
    //   ])
    //   .then(
    //     axios.spread((moveTodoDeleteRes, moveTodoAddRes) => {
    //       if (moveTodoDeleteRes.data && moveTodoAddRes.data) {
    //         setState({
    //           ...state,
    //           todos
    //         });
    //       }
    //     })
    //   )
    //   .catch(setState({ ...state }));
  };

  const moveProject = projectLocation => {
    console.log(projectLocation);
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
                moveTodo={moveTodo}
                moveProject={moveProject}
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
  font-family: Times New Roman;
  font-weight: bold;
  p {
    color: #1d2129;
  }
  a {
    color: #1d2129;
    text-decoration: none;
  }
`;
