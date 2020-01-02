import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Menu from "./Menu";
import Todos from "./Todos";
import Line from "./Line";
import { Link } from "react-router-dom";
import styled from "styled-components";

class Home extends Component {
  state = {
    username: "",
    error: null,
    projects: [],
    todos: [],
    projectText: "",
    todoText: ""
  };

  //grabs user data
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      const newState = { ...this.state };
      newState.username = nextProps.user.username;
      this.setState(newState, this.getProjects, this.getTodos());
    } else {
      this.setState(this.defaultState);
    }
  }

  //grabs all projects
  getProjects = () => {
    const oldState = { ...this.state };
    axios
      .get("/project/getProject")
      .then(res => {
        if (res.data) {
          let newState = { ...this.state };
          newState.projects = res.data.filter(
            project => project.username === this.state.username
          );
          this.setState(newState);
          // console.log(this.state.projects);
        }
      })
      .catch(err => {
        this.setState(oldState);
      });
  };
  //grabs all todos
  getTodos = () => {
    const oldState = { ...this.state };
    axios
      .get("/todo/getTodo")
      .then(res => {
        if (res.data) {
          let newState = { ...this.state };
          newState.todos = res.data.filter(
            todo => todo.username === this.state.username
          );
          this.setState(newState);
        }
      })
      .catch(err => {
        this.setState(oldState);
      });
  };

  addProject = projectText => {
    console.log("project added", projectText);
    const project = {
      username: this.state.username,
      value: projectText
    };
    if (project.value && project.value.length > 0) {
      axios
        .post("/project/addProject", project)
        .then(res => {
          if (res.data) {
            this.setState({ projectText: "" });
            this.getProjects();
          }
        })
        .catch(err => console.log(err));
    }
  };

  addTodo = todoText => {
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    const todo = {
      username: this.state.username,
      value: todoText,
      project: endURL,
      complete: false,
      completeDate: Date()
    };
    if (todo.value && todo.value.length > 0) {
      axios
        .post("/todo/addTodo", todo)
        .then(res => {
          if (res.data) {
            this.setState({ todoText: "" });
            this.getTodos();
          }
        })
        .catch(err => console.log(err));
    }
  };

  deleteProject = id => {
    const oldState = { ...this.state };
    this.setState({
      projects: this.state.projects.filter(project => project._id !== id)
    });
    axios
      .delete(`/project/deleteProject/${id}`)
      .then(res => {
        if (res.data) {
        }
      })
      .catch(err => console.log(err));
    this.setState({ oldState });
  };

  deleteTodo = id => {
    const oldState = { ...this.state };
    this.setState({ todos: this.state.todos.filter(todo => todo._id !== id) });
    axios
      .delete(`/todo/deleteTodo/${id}`)
      .then(res => {
        if (res.data) {
        }
      })
      .catch(err => console.log(err));
    this.setState({ oldState });
  };

  completeTodo = (id, complete) => {
    if (complete === true) {
      complete = false;
    } else {
      complete = true;
    }
    complete = { complete: complete, completeDate: Date() };
    axios
      .put(`/todo/completeTodo/${id}`, complete)
      .then(res => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch(err => console.log(err));
  };

  moveTodo = todoLocation => {
    if (todoLocation.destination === null) return;
    const oldState = { ...this.state };
    let newState = { ...this.state };
    const source = todoLocation.source.index;
    const destination = todoLocation.destination.index;
    let movedTodo = newState.todos.reverse();
    movedTodo = newState.todos.splice(source, 1);
    movedTodo = movedTodo[0];
    const project = movedTodo.project;
    newState.todos.splice(destination, 0, movedTodo);
    newState.todos = newState.todos.reverse();
    axios
      .delete(`/todo/moveTodoDelete/${project}`)
      .then(res => {
        if (res.data) {
          axios
            .put(`/todo/moveTodoAdd/${project}`, newState.todos)
            .catch(err => console.log(err));
          this.setState({ oldState });
        }
      })
      .catch(err => console.log(err));
    this.setState({ oldState });
  };

  moveProject = projectLocation => {
    if (projectLocation.destination === null) return;
    const oldState = { ...this.state };
    let newState = { ...this.state };
    const source = projectLocation.source.index;
    const destination = projectLocation.destination.index;
    let movedProject = newState.projects.reverse();
    movedProject = newState.projects.splice(source, 1);
    movedProject = movedProject[0];
    const username = movedProject.username;
    newState.projects.splice(destination, 0, movedProject);
    newState.projects = newState.projects.reverse();
    axios
      .delete(`/project/moveProjectDelete/${username}`)
      .then(res => {
        if (res.data) {
          axios
            .put(`/project/moveProjectAdd/${username}`, newState.projects)
            .catch(err => console.log(err));
          this.setState({ oldState });
        }
      })
      .catch(err => console.log(err));
    this.setState({ oldState });
  };

  writeProject = e => {
    e.preventDefault();
    const projectText = e.target.value;
    this.setState({ projectText });
  };

  writeTodo = e => {
    e.preventDefault();
    const todoText = e.target.value;
    this.setState({ todoText });
  };

  render() {
    let URL = window.location.href;
    URL = URL.split("/");
    const endURL = URL[URL.length - 1];
    const { username, error } = this.state;

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }

    if (error)
      return (
        <div>
          <h3>ERROR HAPPENED</h3>
          <h5>{error}</h5>
        </div>
      );

    if (!username) {
      return (
        <div className="CustomForm">
          <Container text>
            <h1>Please, Log In</h1>
            <Link to="/login">
              <h2>Login Here</h2>
            </Link>
          </Container>
        </div>
      );
    }
    if (endURL === "")
      return (
        <React.Fragment>
          <Menu
            logout={this.props.logout}
            loggedIn={this.props.loggedIn}
            projects={this.state.projects}
            username={this.state.username}
            addProject={this.addProject}
            updateProject={this.updateProject}
            deleteProject={this.deleteProject}
            moveProject={this.moveProject}
            projectText={this.state.projectText}
            writeProject={this.writeProject}
          />
          <HomeText>
            <h1>Hello Welcome To Progress Tracker</h1>
            <h2>
              This app is designed to track and measure your progress as you
              complete assignments.
            </h2>
            <h2>
              It's very easy to get started. Simply click the top left menu and
              create your first project. From there, you will be able add
              different tasks and track them as you complete them.{" "}
            </h2>
          </HomeText>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <Menu
          logout={this.props.logout}
          loggedIn={this.props.loggedIn}
          projects={this.state.projects}
          username={this.state.username}
          addProject={this.addProject}
          updateProject={this.updateProject}
          deleteProject={this.deleteProject}
          moveProject={this.moveProject}
          projectText={this.state.projectText}
          writeProject={this.writeProject}
        />
        <Line todos={this.state.todos} />
        <Todos
          todos={this.state.todos}
          username={this.state.username}
          addTodo={this.addTodo}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          completeTodo={this.completeTodo}
          moveTodo={this.moveTodo}
          todoText={this.state.todoText}
          writeTodo={this.writeTodo}
        />
      </React.Fragment>
    );
  }
}

export default Home;

const HomeText = styled.div`
  margin: auto;
  max-width: 800px;
`;
