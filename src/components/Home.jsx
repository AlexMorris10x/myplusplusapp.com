import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Menu from "./Menu";
import Todos from "./Todos";
import BarGraph from "./BarGraph";
import FrontPageLineGraph from "./FrontPageLineGraph";
import Projects from "./Projects";
import windowSize from "react-window-size";
// import { connect } from "react-redux";

class Home extends Component {
  state = {
    username: "",
    error: null,
    projects: [],
    todos: [],
    projectText: "",
    todoText: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      const newState = { ...this.state };
      newState.username = nextProps.user.username;
      this.setState(newState, this.getProjects, this.getTodos());
    } else {
      this.setState(this.defaultState);
    }
  }

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
        }
      })
      .catch(err => {
        this.setState(oldState);
      });
  };

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

  addTodo = (todoText, projectName) => {
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    projectName = projectName.value;
    const todo = {
      username: this.state.username,
      value: todoText,
      project: endURL,
      projectName: projectName,
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
    if (error)
      return (
        <div>
          <h3>ERROR HAPPENED</h3>
          <h5>{error}</h5>
        </div>
      );
    if (!username) {
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
          <h1>Welcome To PlusPlus!</h1>
          <h1>
            Your path to incremental improvement. It's easy to get started:
          </h1>
          <h1>1. Create your account</h1>
          <h1>2. Craete your projects and todos</h1>
          <h1>3. Complete your todos and watch your progress increase</h1>
        </React.Fragment>
      );
    }
    if (endURL === "" && this.props.windowWidth > 1200)
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
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: 30,
                border: "1.5px solid black",
                backgroundColor: "lightgrey",
                height: "93vh",
                width: 300,
                margin: "auto"
              }}
            >
              <Projects
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
            </div>
            <div
              className="test"
              style={{
                margin: "0 auto 0 auto",
                padding: "0 150px 0 150px"
              }}
            >
              {/* <FrontPageLineGraph todos={this.state.todos} /> */}
              <h1>Welcome to your home screen</h1>
              <h1>Add a project in the top left menu to get started.</h1>
            </div>
          </div>
        </React.Fragment>
      );
    if (endURL === "" && this.props.windowWidth < 1200)
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
          <div style={styleHome}>
            {/* <FrontPageLineGraph todos={this.state.todos} /> */}
            <h1>Welcome to your home screen</h1>
            <h1>Add a project in the top left menu to get started.</h1>
          </div>
        </React.Fragment>
      );
    if (endURL !== "" && this.props.windowWidth > 1200)
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
          <div style={{ display: "flex", margin: "auto" }}>
            <div
              style={{
                border: "1.5px solid black",
                backgroundColor: "lightgrey",
                height: "93vh",
                width: 300
              }}
            >
              <Projects
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
            </div>
            <div
              style={{
                margin: "0 auto 0 auto",
                padding: "0 150px 0 150px"
              }}
            >
              <BarGraph todos={this.state.todos} />
              <Todos
                projects={this.state.projects}
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
            </div>
          </div>
        </React.Fragment>
      );
    if (endURL !== "" && this.props.windowWidth < 1200)
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
          <BarGraph todos={this.state.todos} />
          <Todos
            projects={this.state.projects}
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

export default windowSize(Home);
// export default connect(mapStateToProps)(Home);

// const mapStateToProps = state => {
//   console.log(state);
// };

const styleHome = {
  margin: "auto",
  maxWidth: 800,
  padding: 50
};

const styleMenu = {
  margin: "auto",
  maxWidth: 800
};
