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
  const endURL: any = window.location.href.split("/").slice(-1)[0];

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

  ////
  useEffect(() => {
    axios
      .all([
        axios.get("/auth/user"),
        axios.get("/project/getProject"),
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
      .catch(() => setState({ ...state, username: "test", loading: false }));
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
    e.preventDefault();
    axios
      .post("/auth/logout")
      .then(res => {
        if (res.status === 200) {
          setState({
            ...state,
            loggedIn: false,
            username: "",
            redirectTo: "/login"
          });
        }
      })
      .catch(() => setState({ ...state }));
  };
  ////

  ////
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

  const moveProject = (projectLocation: any) => {
    console.log(projectLocation);
  };
  ////

  ////
  // creates new todo to list
  const addTodo = (e: any, todoText: string) => {
    e.preventDefault();
    let todo = {
      username: state.username,
      text: todoText,
      projectId: endURL,
      complete: false,
      completeDate: Date(),
      order: null
    };
    orderVal(filteredTodos, todo);
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

  const orderVal = (todos: any, todo: any) => {
    if (todos.length === 0) return;
    let previousTodo = todos[0]._id;
    todo.order = previousTodo;
    return todo;
  };

  const deleteTodo = (id: string, index: number) => {
    const todos = filteredTodos.filter((todo: any) => todo._id !== id);
    let newId: string | null;
    let newVal: any = {};
    if (filteredTodos.length === 1 || index === 0) {
      newId = null;
      newVal = { orderVal: null };
    } else if (index < filteredTodos.length - 1) {
      newId = todos[index - 1]._id;
      newVal = { orderVal: todos[index]._id };
      todos[index - 1].order = todos[index]._id;
    } else {
      newId = todos[todos.length - 1]._id;
      newVal = { orderVal: null };
      todos[todos.length - 1].order = null;
    }
    setState({ ...state, todos });
    axios
      .all([
        axios.delete(`/todo/deleteTodo/${id}`),
        axios.put(`/todo/updateOrder/${newId}`, newVal)
      ])
      .then((res: any) => {
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

  const moveTodo = (todoLocation: any) => {
    // set variables
    let todos: any = filteredTodos;
    const source: any = todoLocation.source.index;
    const destination: any = todoLocation.destination.index;

    // return non moves
    if (destination === source) {
      setState({ ...state, todos });
      return;
    }

    // create order map
    let movedTodoId: any;
    let sourceTodoId: any;
    let destinationTodoId: any;

    let movedTodoOrder: any;
    let sourceTodoOrder: any;
    let destinationTodoOrder: any;

    // moving down the list
    if (source < destination) {
      // if destination is bottom (null)
      if (todos[destination + 1] === undefined) {
        movedTodoId = todos[source]._id;
        movedTodoOrder = null;
        todos[source].order = null;
      } else {
        movedTodoId = todos[source]._id;
        movedTodoOrder = todos[destination + 1]._id;
        todos[source].order = todos[destination + 1]._id;
      }
      // if beginning is top (id=null)
      if (todos[source - 1] === undefined) {
        sourceTodoId = null;
        sourceTodoOrder = null;
        // todos[source - 1].order = todos[source + 1]._id;
      } else {
        sourceTodoId = todos[source - 1]._id;
        sourceTodoOrder = todos[source + 1]._id;
        todos[source - 1].order = todos[source + 1]._id;
      }
      //
      destinationTodoId = todos[destination]._id;
      destinationTodoOrder = todos[source]._id;
      todos[destination].order = todos[source]._id;
      //
      //moving up
    } else if (source > destination) {
      //
      movedTodoId = todos[source]._id;
      movedTodoOrder = todos[destination]._id;
      todos[source].order = todos[destination]._id;
      // if source starts at bottom (item above = null)
      if (todos[source + 1] === undefined) {
        sourceTodoId = todos[source - 1]._id;
        sourceTodoOrder = null;
        todos[source - 1].order = null;
      } else {
        sourceTodoId = todos[source - 1]._id;
        sourceTodoOrder = todos[source + 1]._id;
        todos[source - 1].order = todos[source + 1]._id;
      }
      // if destinaton is top (id = null)
      if (todos[destination - 1] === undefined) {
        destinationTodoId = null;
        destinationTodoOrder = null;
        // todos[destination - 1].order = todos[source]._id;
      } else {
        destinationTodoId = todos[destination - 1]._id;
        destinationTodoOrder = todos[source]._id;
        todos[destination - 1].order = todos[source]._id;
      }
    }
    setState({ ...state, todos });
    const movedTodo = {
      movedTodoId: movedTodoId,
      movedTodoOrder: movedTodoOrder
    };
    const sourceTodo = {
      sourceTodoId: sourceTodoId,
      sourceTodoOrder: sourceTodoOrder
    };
    const destinationTodo = {
      destinationTodoId: destinationTodoId,
      destinationTodoOrder: destinationTodoOrder
    };
    axios
      .all([
        axios.put(`/todo/movedTodo`, movedTodo),
        axios.put(`/todo/sourceTodo`, sourceTodo),
        axios.put(`/todo/destinationTodo`, destinationTodo)
      ])
      .then((res: any) => {
        if (res.data) {
          setState({ ...state, todos });
        }
      })
      .catch(() => setState({ ...state }));
  };
  ////

  ////
  let filteredTodos: any = state.todos.filter(
    (todo: any) => todo.projectId === endURL
  );

  const orderTodos = (filteredTodos: any) => {
    if (filteredTodos === undefined || filteredTodos.length === 0)
      return filteredTodos;
    let newArr: any = [];
    let orderObj: any = {};
    for (let todo of filteredTodos) {
      orderObj[todo.order] = todo;
    }
    let finder: any = orderObj["null"]._id;
    newArr.push(orderObj["null"]);
    delete orderObj["null"];
    for (let todo in orderObj) {
      newArr.unshift(orderObj[finder]);
      finder = orderObj[finder]._id;
    }
    return newArr;
  };
  filteredTodos = orderTodos(filteredTodos);
  ////

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
