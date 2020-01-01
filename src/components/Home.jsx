import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Todos from "./Todos";
import { Container } from "semantic-ui-react";
import ProjectMenu from "./ProjectMenu";
import Line from "./Line";

class Home extends Component {
  state = {
    username: "",
    error: null,
    projects: [],
    todos: []
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
    axios
      .get("/project")
      .then(res => {
        if (res.data) {
          const newState = { ...this.state };
          newState.projects = res.data.filter(
            project => project.username === this.state.username
          );
          this.setState(newState);
        }
      })
      .catch(err => {
        const newState = { ...this.state };
        newState.projects = [];
        newState.error = err;
        this.setState(newState);
      });
  };
  //grabs all todos
  getTodos = () => {
    const oldState = { ...this.state };
    oldState.todos = oldState.todos;
    axios
      .get("/todo/getTodo")
      .then(res => {
        if (res.data) {
          let newState = { ...this.state };
          newState.todos = res.data.filter(
            todo => todo.username === this.state.username
          );
          this.setState(newState);
          // console.log(this.state.todos);
        }
      })
      .catch(err => {
        this.setState(oldState);
      });
  };

  addProject = () => {
    const project = {
      username: this.state.username,
      value: "test"
    };
    if (project.value && project.value.length > 0) {
      axios
        .post("/project", project)
        .then(res => {
          if (res.data) {
            this.value = "";
            this.getProjects();
          }
        })
        .catch(err => console.log(err));
    }
  };

  addTodo = writeTodo => {
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    const todo = {
      username: this.state.username,
      value: writeTodo,
      project: endURL,
      complete: false,
      completeDate: Date()
    };
    if (todo.value && todo.value.length > 0) {
      axios
        .post("/todo/addTodo", todo)
        .then(res => {
          if (res.data) {
            this.getTodos();
          }
        })
        .catch(err => console.log(err));
    }
  };

  deleteProject = id => {
    const oldState = { ...this.state };
    axios
      .delete(`/project/${id}`)
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
          axios.put(`/todo/moveTodoAdd/${project}`, newState.todos);
        }
      })
      .catch(err => console.log(err));
    this.setState({ oldState });
  };

  render() {
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
          </Container>
        </div>
      );
    }
    return (
      <React.Fragment>
        <ProjectMenu
          projects={this.state.projects}
          username={this.state.username}
          addProject={this.addProject}
          updateProject={this.updateProject}
          deleteProject={this.deleteProject}
          projectHandleOpen={this.projectHandleOpen}
          projectHandleCloset={this.projectHandleClose}
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
          todoHandleOpen={this.todoHandleOpen}
          todoHandleCloset={this.todoHandleClose}
        />
      </React.Fragment>
    );
  }
}

export default Home;
