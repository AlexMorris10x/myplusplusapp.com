import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import {
  Accordion,
  Button,
  Container,
  Form,
  Table,
  Divider,
  Modal,
  Header,
  Segment,
  Grid
} from "semantic-ui-react";

class HomeForm extends Component {
  defaultState = {
    username: "",
    projects: [],
    todos: [],
    projectModalOpen: false,
    projectModalData: null,
    projectModalID: null,
    todoModalOpen: false,
    todoModalData: null,
    todoModalID: null,
    error: null,
    activeProjectIndex: 0
  };

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

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

  todoHandleOpen = (data, id) =>
    this.setState({
      todoModalOpen: true,
      todoModalData: data,
      todoModalID: id
    });

  todoHandleClose = () =>
    this.setState({
      todoModalOpen: false,
      todoModalData: null,
      todoModalID: null
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

  addTodo = () => {
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    const task = {
      username: this.state.username,
      value: this.refs.todoInput.value,
      project: endURL
    };
    if (task.value && task.value.length > 0) {
      axios
        .post("/todo", task)
        .then(res => {
          if (res.data) {
            this.refs.todoInput.value = "";
            this.getTodos();
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

  projectToggle = (e, titleProps) => {
    const { index } = titleProps;
    const { activeProjectIndex } = this.state;
    const newIndex = activeProjectIndex === index ? -1 : index;

    this.setState({ activeProjectIndex: newIndex });
  };

  displayProjects = (projects, username) => {
    return projects.map((project, index) => (
      <React.Fragment>
        <Grid columns={3} relaxed="very" key={`${project._id}`} style={{}}>
          <Link exact to={"projects/" + `${project._id}`}>
            <Grid.Column>{project.value}</Grid.Column>
          </Link>
          <Grid.Column collapsing>
            <Button
              basic={true}
              color={"blue"}
              icon={"pencil"}
              disabled={username !== project.username}
              onClick={() => this.projectHandleOpen(project.value, project._id)}
            />
          </Grid.Column>
          <Grid.Column collapsing>
            <Button
              basic={true}
              color={"red"}
              icon={"trash"}
              onClick={() => this.deleteProject(project._id)}
              disabled={username !== project.username}
            />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    ));
  };

  displayTodos = (todos, username) => {
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    return todos
      .filter(todo => todo.project === endURL)
      .map((todo, index) => (
        <React.Fragment key={`${todo._id}`}>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <h3>{todo.value}</h3>
            </Grid.Column>
            <Grid.Column>
              <Button
                basic={true}
                color={"blue"}
                icon={"pencil"}
                disabled={username !== todo.username}
                onClick={() => this.todoHandleOpen(todo.value, todo._id)}
              />
            </Grid.Column>
          </Grid>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Button
                basic={true}
                color={"green"}
                icon={"checkmark"}
                disabled={username !== todo.username}
                onClick={() => this.todoHandleOpen(todo.value, todo._id)}
              />
            </Grid.Column>

            <Grid.Column>
              <Button
                basic={true}
                color={"red"}
                icon={"trash"}
                onClick={() => this.deleteTodo(todo._id)}
                disabled={username !== todo.username}
              />
            </Grid.Column>
          </Grid>
        </React.Fragment>
      ));
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
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Accordion fluid>
                <Accordion.Title
                  active={activeProjectIndex === 0}
                  index={0}
                  onClick={this.projectToggle}
                >
                  <h1>Projects</h1>
                </Accordion.Title>
                <Accordion.Content active={activeProjectIndex === 0}>
                  <div className="CustomForm">
                    <Form>
                      <Form.Field>
                        <input type="text" ref="projectInput" />
                      </Form.Field>
                      <Button
                        basic={true}
                        color={"green"}
                        onClick={this.addProject}
                        content={"Add"}
                        icon={"plus"}
                      />
                    </Form>
                    <Table celled>
                      <Table.Body>
                        {this.displayProjects(projects, username)}
                      </Table.Body>
                    </Table>
                    <Modal
                      open={this.state.projectModalOpen}
                      closeIcon
                      onClose={this.projectHandleClose}
                      size={"small"}
                    >
                      <Header icon="browser" content="New description" />
                      <Modal.Content>
                        <Form>
                          <Form.Field>
                            <label htmlFor="description">PROJECT: </label>
                            <input
                              defaultValue={this.state.projectModalData}
                              type="text"
                              ref="updateProjectInput"
                            />
                          </Form.Field>
                          <Button
                            basic={true}
                            color={"blue"}
                            icon={"pencil"}
                            onClick={this.updateProject}
                          />
                        </Form>
                      </Modal.Content>
                    </Modal>
                  </div>
                </Accordion.Content>
              </Accordion>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <div className="CustomForm">
                <h2>Todos</h2>
                <Form>
                  <Form.Field>
                    <input type="text" ref="todoInput" />
                  </Form.Field>
                  <Button
                    basic={true}
                    color={"green"}
                    onClick={this.addTodo}
                    content={"Add"}
                    icon={"plus"}
                  />
                </Form>
                <Modal
                  open={this.state.todoModalOpen}
                  closeIcon
                  onClose={this.todoHandleClose}
                  size={"small"}
                >
                  <Header icon="browser" content="New description" />
                  <Modal.Content>
                    <Form>
                      <Form.Field>
                        <label htmlFor="description">TODO: </label>
                        <input
                          defaultValue={this.state.todoModalData}
                          type="text"
                          ref="updateTodoInput"
                        />
                      </Form.Field>
                      <Button
                        basic={true}
                        color={"blue"}
                        icon={"pencil"}
                        onClick={this.updateTodo}
                      />
                    </Form>
                  </Modal.Content>
                </Modal>
                <Table celled>
                  <Table.Body>{this.displayTodos(todos, username)}</Table.Body>
                </Table>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default HomeForm;
