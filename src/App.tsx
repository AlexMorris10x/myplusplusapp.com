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

  // console.log(state);

  ////
  // finding the end URL
  const endURL: string = window.location.href.split("/").slice(-1)[0];

  // grab project name
  let projectName: any;

  // error catching
  state.projects.length > 0
    ? (projectName = state.projects.filter(
        (project: any) => project._id === endURL
      ))
    : (projectName = "");

  projectName[0] !== undefined
    ? (projectName = projectName[0].text)
    : (projectName = "");
  ////

  ////
  // order projects
  const orderProjects = (projects: any) => {
    // return projects;
    // error catching
    if (projects === undefined || projects.length === 0) {
      return projects;
    }
    //
    let newArr: any = [];
    let orderObj: any = {};
    for (let project of projects) {
      orderObj[project.order] = project;
    }
    let finder: any = orderObj["null"]._id;
    newArr.push(orderObj["null"]);
    delete orderObj["null"];
    for (let project in orderObj) {
      newArr.unshift(orderObj[finder]);
      finder = orderObj[finder]._id;
    }
    return newArr;
  };

  let orderedProjects = orderProjects(state.projects);

  // filter todos by page
  const orderTodos = (todos: any): any => {
    // return todos
    let newArr: any = [];
    let orderObj: any = {};

    let filteredTodos: any = todos.filter(
      (todo: any) => todo.projectId === endURL && todo.complete === false
    );

    // error catching
    if (filteredTodos === undefined || filteredTodos.length === 0)
      return filteredTodos;

    // return filteredTodos

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

  let filteredTodos = orderTodos(state.todos);

  // filter todos by page
  const orderCompleteTodos = (todos: any): any => {
    let newArr: any = [];
    let orderObj: any = {};

    let filteredTodosComplete: any = todos.filter(
      (todo: any) => todo.projectId === endURL && todo.complete === true
    );

    // error catching
    if (
      filteredTodosComplete === undefined ||
      filteredTodosComplete.length === 0
    )
      return filteredTodosComplete;

    // return filteredCompleteTodos

    for (let todo of filteredTodosComplete) {
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

  let filteredCompleteTodos = orderCompleteTodos(state.todos);
  ////

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
      text: projectText,
      order: null
    };
    createProjectOrderVal(orderedProjects, project);
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

  const createProjectOrderVal = (projects: any[], project: any) => {
    if (projects.length === 0) return;
    let previousProject = projects[0]._id;
    project.order = previousProject;
    return project;
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

  // moves project
  const moveProject = (projectLocation: any) => {
    // set variables
    let projects = orderedProjects;
    const source: number = projectLocation.source.index;
    const destination: number = projectLocation.destination.index;

    // return non moves
    if (destination === source) {
      setState({ ...state, projects });
      return;
    }

    // create order map
    let movedProjectId: string | null | undefined;
    let sourceProjectId: string | null | undefined;
    let destinationProjectId: string | null | undefined;

    let movedProjectOrder: string | null | undefined;
    let sourceProjectOrder: string | null | undefined;
    let destinationProjectOrder: string | null | undefined;

    // moving down the list
    if (source < destination) {
      // if destination is bottom (null)
      if (projects[destination + 1] === undefined) {
        movedProjectId = projects[source]._id;
        movedProjectOrder = null;
        projects[source].order = null;
      } else {
        movedProjectId = projects[source]._id;
        movedProjectOrder = projects[destination + 1]._id;
        projects[source].order = projects[destination + 1]._id;
      }
      // if beginning is top (id=null)
      if (projects[source - 1] === undefined) {
        sourceProjectId = undefined;
        sourceProjectOrder = undefined;
      } else {
        sourceProjectId = projects[source - 1]._id;
        sourceProjectOrder = projects[source + 1]._id;
        projects[source - 1].order = projects[source + 1]._id;
      }
      //
      destinationProjectId = projects[destination]._id;
      destinationProjectOrder = projects[source]._id;
      projects[destination].order = projects[source]._id;
      //
      //moving up
    } else if (source > destination) {
      //
      movedProjectId = projects[source]._id;
      movedProjectOrder = projects[destination]._id;
      projects[source].order = projects[destination]._id;
      // if source starts at bottom (item above = null)
      if (projects[source + 1] === undefined) {
        sourceProjectId = projects[source - 1]._id;
        sourceProjectOrder = null;
        projects[source - 1].order = null;
      } else {
        sourceProjectId = projects[source - 1]._id;
        sourceProjectOrder = projects[source + 1]._id;
        projects[source - 1].order = projects[source + 1]._id;
      }
      // if destinaton is top (id = null)
      if (projects[destination - 1] === undefined) {
        destinationProjectId = undefined;
        destinationProjectOrder = undefined;
      } else {
        destinationProjectId = projects[destination - 1]._id;
        destinationProjectOrder = projects[source]._id;
        projects[destination - 1].order = projects[source]._id;
      }
    }
    //
    setState({ ...state, projects });
    const movedProject = {
      movedProjectId: movedProjectId,
      movedProjectOrder: movedProjectOrder
    };
    const sourceProject = {
      sourceProjectId: sourceProjectId,
      sourceProjectOrder: sourceProjectOrder
    };
    const destinationProject = {
      destinationProjectId: destinationProjectId,
      destinationProjectOrder: destinationProjectOrder
    };
    axios
      .all([
        axios.put(`/project/movedProject`, movedProject),
        axios.put(`/project/sourceProject`, sourceProject),
        axios.put(`/project/destinationProject`, destinationProject)
      ])
      .then((res: any) => {
        if (res.data) {
          setState({ ...state, projects });
        }
      })
      .catch(() => setState({ ...state }));
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
    createTodoOrderVal(filteredTodos, todo);
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

  const createTodoOrderVal = (todos: any[], todo: any) => {
    if (todos.length === 0) return;
    let previousTodo = todos[0]._id;
    todo.order = previousTodo;
    return todo;
  };

  const deleteTodo = (id: string, index: number, complete: boolean) => {
    let todos: any;
    if (complete === false) {
      todos = filteredTodos.filter((todo: any) => todo._id !== id);
    } else if (complete === true) {
      todos = filteredCompleteTodos.filter((todo: any) => todo._id !== id);
    }
    //
    let newId: string | undefined;
    let newVal: {};
    //
    if (filteredTodos.length === 1 || index === 0) {
      newId = undefined;
      newVal = { orderVal: undefined };
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

  const completeTodo = (id: string, complete: boolean) => {
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
    const date = Date();
    const { newId, order }: any = createTodoOrderValComplete(
      id,
      complete,
      filteredTodos,
      filteredCompleteTodos
    );
    const newVal: any = { orderVal: order };
    const completeObj: {} = { complete: complete, completeDate: date };
    axios
      .all([
        axios.put(`/todo/completeTodo/${id}`, completeObj),
        axios.put(`/todo/updateOrder/${newId}`, newVal)
      ])
      .then((res: any) => {
        if (res.data) {
          setState({ ...state, todos });
        }
      })
      .catch(() => setState({ ...state }));
  };

  const createTodoOrderValComplete = (
    id: string,
    complete: boolean,
    filteredTodos: any[],
    filteredCompleteTodos: any[]
  ) => {
    if (complete === true) {
      if (filteredCompleteTodos.length === 0) {
        return { newId: id, order: null };
      } else {
        let previousTodoId: any = filteredCompleteTodos[0]._id;
        return { newId: id, order: previousTodoId };
      }
    }
    if (complete === false) {
      if (filteredTodos.length === 0) {
        return { newId: id, order: null };
      } else {
        let previousTodoId: any = filteredTodos[0]._id;
        return { newId: id, order: previousTodoId };
      }
    }
  };

  const moveTodo = (todoLocation: any) => {
    // set variables
    let todos: any = filteredTodos;
    const source: number = todoLocation.source.index;
    const destination: number = todoLocation.destination.index;

    // return non moves
    if (destination === source) {
      setState({ ...state, todos });
      return;
    }

    // create order map
    let movedTodoId: string | null | undefined;
    let sourceTodoId: string | null | undefined;
    let destinationTodoId: string | null | undefined;

    let movedTodoOrder: string | null | undefined;
    let sourceTodoOrder: string | null | undefined;
    let destinationTodoOrder: string | null | undefined;

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
        sourceTodoId = undefined;
        sourceTodoOrder = undefined;
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
        destinationTodoId = undefined;
        destinationTodoOrder = undefined;
      } else {
        destinationTodoId = todos[destination - 1]._id;
        destinationTodoOrder = todos[source]._id;
        todos[destination - 1].order = todos[source]._id;
      }
    }
    // add the rest of the todos for setstate
    let unfilteredTodos: any = state.todos.filter(
      (todo: any) => todo.projectId !== endURL
    );
    let allTodos = {
      ...todos,
      ...filteredCompleteTodos,
      ...unfilteredTodos
    };
    // todos = allTodos;
    setState({ ...state, allTodos });
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
          setState({ ...state, allTodos });
        }
      })
      .catch(() => setState({ ...state }));
  };
  ////

  const combinedTodos = [...filteredTodos, ...filteredCompleteTodos];

  // console.log(filteredTodos);
  // console.log(filteredCompleteTodos);

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
                login={login}
                loggedIn={state.loggedIn}
                loading={state.loading}
                error={state.error}
                projects={orderedProjects}
                todos={combinedTodos}
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
//// @TODO complete redux
// export default connect(mapStateTo(Home);

// const mapStateTo= state => {
//   console.log(state);
// };
////

const AppWrapper = styled.div`
  margin: -6px;
  text-align: center;
  font-family: Times New Roman;
  font-weight: bold;
  p {
    font-family: Arial;
    color: #1d2129;
  }
  a {
    text-decoration: none;
    color: #1d2129;
  }
`;
