import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Projects from "./Projects";
import Todos from "./Todos";
import {
  Accordion,
  Button,
  Container,
  Form,
  Table,
  Divider,
  Modal,
  Header
} from "semantic-ui-react";

class Home extends Component {
  state = {
    username: "",
    projects: [],
    todos: [],
    // todoText: "text",
    projectModalOpen: false,
    projectModalData: null,
    projectModalID: null,
    // todoModalOpen: false,
    // todoModalData: null,
    // todoModalID: null,
    error: null
    // activeProjectIndex: 0
  };

  projectHandleOpen = (data, id) =>
    this.setState({
      projectModalOpen: true,
      projectModalData: data,
      projectModalID: id
    });

  projectHandleClose = () =>
    this.setState({
      projectModalOpen: false,
      projectModalData: null,
      projectModalID: null
    });

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

  //grabs all todos
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
    axios
      .get("/todo")
      .then(res => {
        if (res.data) {
          const newState = { ...this.state };
          newState.todos = res.data.filter(
            todo => todo.username === this.state.username
          );
          this.setState(newState);
        }
      })
      .catch(err => {
        const newState = { ...this.state };
        newState.todos = [];
        newState.error = err;
        this.setState(newState);
      });
  };

  addProject = () => {
    const task = {
      username: this.state.username,
      value: this.refs.projectInput.value
    };
    if (task.value && task.value.length > 0) {
      axios
        .post("/project", task)
        .then(res => {
          if (res.data) {
            this.refs.projectInput.value = "";
            this.getProjects();
          }
        })
        .catch(err => console.log(err));
    }
  };

  deleteProject = id => {
    axios
      .delete(`/project/${id}`)
      .then(res => {
        if (res.data) {
          this.getProjects();
        }
      })
      .catch(err => console.log(err));
  };

  updateProject = () => {
    const { projectModalID, projectModalData } = this.state;
    const task = { value: this.refs.updateProjectInput.value };
    if (
      task.value &&
      task.value.length > 0 &&
      task.value !== projectModalData
    ) {
      axios
        .put(`/project/${projectModalID}`, task)
        .then(res => {
          if (res.data) {
            this.refs.updateProjectInput.value = "";
            this.projectHandleClose();
            this.getProjects();
          }
        })
        .catch(err => console.log(err));
    }
  };

  // todoHandleOpen = (todoValue, todo_id) => {
  //   console.log(todoValue, todo_id);
  //   this.setState({
  //     todoModalOpen: true,
  //     todoModalData: todoValue,
  //     todoModalID: todo_id
  //   });
  // };

  // todoHandleClose = () =>
  //   this.setState({
  //     todoModalOpen: false,
  //     todoModalData: null,
  //     todoModalID: null
  //   });

  updateTodo = () => {
    const { todoModalID, todoModalData } = this.state;
    const task = { value: this.refs.updateTodoInput.value };
    if (task.value && task.value.length > 0 && task.value !== todoModalData) {
      axios
        .put(`/todo/${todoModalID}`, task)
        .then(res => {
          if (res.data) {
            this.refs.updateTodoInput.value = "";
            this.todoHandleClose();
            this.getTodos();
          }
        })
        .catch(err => console.log(err));
    }
  };

  addTodo = () => {
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    const todo = {
      username: this.state.username,
      // value: this.refs.todoInput.value,
      value: "test",
      project: endURL
    };
    if (todo.value && todo.value.length > 0) {
      axios
        .post("/todo", todo)
        .then(res => {
          if (res.data) {
            // this.refs.todoInput.value = "";
            this.getTodos();
          }
        })
        .catch(err => console.log(err));
    }
  };

  // projectToggle = (e, titleProps) => {
  //   const { index } = titleProps;
  //   const { activeProjectIndex } = this.state;
  //   const newIndex = activeProjectIndex === index ? -1 : index;

  //   this.setState({ activeProjectIndex: newIndex });
  // };

  deleteTodo = id => {
    axios
      .delete(`/todo/${id}`)
      .then(res => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { activeProjectIndex, projects, todos, username, error } = this.state;
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
        <Projects
          projects={this.state.projects}
          username={this.state.username}
          addProject={this.addProject}
          updateProject={this.updateProject}
          deleteProject={this.deleteProject}
          projectHandleOpen={this.projectHandleOpen}
          projectHandleCloset={this.projectHandleClose}
          // projectText={this.state.projectText}
        />
        <Todos
          todos={this.state.todos}
          username={this.state.username}
          addTodo={this.addTodo}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          todoHandleOpen={this.todoHandleOpen}
          todoHandleCloset={this.todoHandleClose}
          todoText={this.state.todoText}
        />
      </React.Fragment>
    );
  }
}

export default Home;
