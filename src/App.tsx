import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import styled from "styled-components";
import Home from "./components/Home";
// import { connect } from "react-redux";

function App(): any {
  let [state, setState] = useState<any>({
    error: null,
    loading: true,
    loggedIn: false,
    redirectTo: "",
    username: "",
    projects: [],
    todos: []
  });

  // Finding the end URL
  const URL: string = window.location.href;
  const splitURL: string[] = URL.split("/");
  const endURL: string = splitURL[splitURL.length - 1];

  // Grab project name
  let projectName: any;

  state.projects.length > 0
    ? (projectName = state.projects.filter(
        (project: any) => project._id === endURL
      ))
    : (projectName = "");

  projectName[0] !== undefined
    ? (projectName = projectName[0].text)
    : (projectName = "");
  //

  useEffect(() => {
    axios
      .all([
        axios.get("/auth/user"),
        axios.get("/project/getProject/"),
        axios.get("/todo/getTodo")
      ])
      .then(
        axios.spread((userRes: any, projectRes: any, todoRes: any) => {
          let username: string = userRes.data[0].username;
          userRes.data[0].username === undefined
            ? (userRes = null)
            : (username = userRes.data[0].username);
          let projects = projectRes.data;
          let todos = todoRes.data;
          const loading = false;
          let loggedIn: boolean;
          loggedIn = true;
          setState({
            ...state,
            username,
            loggedIn,
            loading,
            todos,
            projects
          });
        })
      )
      .catch(() => setState({ ...state, loading: false }));
  }, []);

  const signUp = (e: any, username: string, password: string) => {
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

  const login = (e: any, username: string, password: string) => {
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
      .catch(() => setState({ ...state }));
  };

  //logs user out
  const logout = (e: any) => {
    // e.preventDefault();
    // axios
    //   .post("/auth/logout")
    //   .then(res => {
    //     if (res.status === 200) {
    //       setState({
    //         ...state,
    //         loggedIn: false,
    //         username: "",
    //         redirectTo: "/login"
    //       });
    //     }
    //   })
    //   .catch(() => setState({ ...state }));
  };

  // creates new project to list
  const addProject = (e: any, projectText: string) => {
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
        .catch(() => setState({ ...state }));
    }
  };

  // creates new todo to list
  const addTodo = (e: any, todoText: string) => {
    e.preventDefault();
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
        .catch(() => setState({ ...state }));
    }
  };

  const createOrder = (todos: any, todo: any) => {
    // if (todos.length === 0) return;
    // let previousTodo = todos[todos.length - 1]._id;
    // todo.order = previousTodo;
    // return todo;
  };

  const deleteProject = (id: string) => {
    const projects = state.projects.filter(
      (project: any) => project._id !== id
    );
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
      .catch(() => setState({ ...state }));
  };

  const deleteTodo = (id: string) => {
    const todos = state.todos.filter((todo: any) => todo._id !== id);
    setState({ ...state, todos });
    axios
      .delete(`/todo/deleteTodo/${id}`)
      .then(res => {
        if (res.data) {
          setState({ ...state, todos });
        }
      })
      .catch(() => setState({ ...state }));
  };

  const completeTodo = (id: string, complete: {}) => {
    if (complete === true) {
      complete = false;
    } else {
      complete = true;
    }
    let todos = state.todos.map((todo: any) => {
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
      .catch(() => setState({ ...state }));
  };

  const moveTodo = (todoLocation: any, filteredTodos: any) => {
    if (todoLocation.destination === null) return;
    console.log("moved todos");
    // return non moves
    // const source = todoLocation.source.index;
    // const destination = todoLocation.destination.index;
    // let todos: any = filteredTodos;
    // if (destination < source) {
    //   todos[source - 1].order = todos[source + 1]._id;
    //   todos[source].order = todos[destination]._id;
    //   todos[destination - 1].order = todos[source]._id;
    //   setState({ ...state, todos });
    // }

    // if (destination > source) {
    // todos[source - 1].order = todos[source + 1]._id;
    // todos[source].order = todos[destination]._id;
    // todos[destination - 1].order = todos[source]._id;
    // setState({ ...state, todos });
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
    // .catch(setState({ ...state }));
  };

  const moveProject = (projectLocation: any) => {
    console.log(projectLocation);
  };

  // const orderTodos = (todos: any) => {
  //   if (todos === undefined || todos.length === 0) return todos;
  //   let newTodos = [];
  //   let orderObj: any = {};
  //   for (let todo of todos) {
  //     orderObj[todo.order] = todo;
  //   }
  //   let finder = orderObj[null]._id;
  //   let nextObj = {};
  //   for (let i = 0; i < todos.length - 1; i++) {
  //     if (nextObj === undefined) return;
  //     nextObj = orderObj[finder];
  //     newTodos.unshift(orderObj[finder]);
  //     finder = nextObj._id;
  //   }
  //   newTodos.push(orderObj[null]);
  //   return newTodos;
  // };

  let filteredTodos: any = state.todos.filter(
    (todo: any) => todo.projectId === endURL
  );

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
            render={() => (
              <Login
                login={login}
                loggedIn={state.loggedIn}
                projects={state.projects}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                loggedIn={state.loggedIn}
                signUp={signUp}
                projects={state.projects}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <Home
                loggedIn={state.loggedIn}
                loading={state.loading}
                error={state.error}
                projects={state.projects}
                todos={filteredTodos}
                logout={logout}
                addProject={addProject}
                addTodo={addTodo}
                deleteProject={deleteProject}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
                moveTodo={moveTodo}
                moveProject={moveProject}
                endURL={endURL}
                projectName={projectName}
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
