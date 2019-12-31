import React from "react";
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
import { Redirect, Link } from "react-router-dom";

class Projects extends React.Component {
  //   state = {
  //     todoModalOpen: false,
  //     todoModalData: null,
  //     todoModalID: null
  //   };

  //   todoHandleOpen = (todoValue, todo_id) => {
  //     console.log(todoValue, todo_id);
  //     this.setState({
  //       todoModalOpen: true,
  //       todoModalData: todoValue,
  //       todoModalID: todo_id
  //     });
  //   };

  //   todoHandleClose = () =>
  //     this.setState({
  //       todoModalOpen: false,
  //       todoModalData: null,
  //       todoModalID: null
  //     });

  // projectToggle = (e, titleProps) => {
  //   const { index } = titleProps;
  //   const { activeProjectIndex } = this.state;
  //   const newIndex = activeProjectIndex === index ? -1 : index;

  //   this.setState({ activeProjectIndex: newIndex });
  // };

  render() {
    return (
      <React.Fragment>
        {/* <Accordion fluid>
          <Accordion.Title
            active={activeProjectIndex === 0}
            index={0}
            onClick={this.projectToggle}
          > */}
        <h1>Projects</h1>
        {/* </Accordion.Title>
          <Accordion.Content active={activeProjectIndex === 0}> */}
        <div
          className="CustomForm"
          style={{ width: 300, float: "left", border: 1 }}
        >
          <Container text>
            <Divider horizontal>Add new Project</Divider>
            <Form>
              <Form.Field>
                <label htmlFor="description">PROJECT: </label>
                <input type="text" ref="projectInput" />
              </Form.Field>
              <Button
                basic={true}
                color={"green"}
                onClick={this.props.addProject}
                content={"Add"}
                icon={"plus"}
              />
            </Form>
            <Table celled>
              <Table.Body>
                {this.displayProjects(this.props.projects, this.props.username)}
              </Table.Body>
            </Table>
          </Container>
          <Modal
            open={this.props.projectModalOpen}
            closeIcon
            onClose={this.props.projectHandleClose}
            size={"small"}
          >
            <Header icon="browser" content="New description" />
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label htmlFor="description">PROJECT: </label>
                  <input
                    defaultValue={this.props.projectModalData}
                    type="text"
                    ref="updateProjectInput"
                  />
                </Form.Field>
                <Button
                  basic={true}
                  color={"blue"}
                  content={"Edit"}
                  icon={"pencil"}
                  onClick={this.updateProject}
                />
              </Form>
            </Modal.Content>
          </Modal>
        </div>
        {/* </Accordion.Content>
        </Accordion> */}
      </React.Fragment>
    );
  }

  displayProjects = (projects, username) => {
    return projects.map((project, index) => (
      <React.Fragment>
        {/* <Link to={`projects/${ project._id}`}> */}
        <Table.Row key={`${project._id}`}>
          <Table.Cell>{project.value}</Table.Cell>
        </Table.Row>
        {/* </Link> */}
        <Table.Row>
          <Table.Cell collapsing>
            <Button
              basic={true}
              color={"blue"}
              content={"Edit"}
              icon={"pencil"}
              disabled={username !== project.username}
              onClick={() =>
                this.props.projectHandleOpen(project.value, project._id)
              }
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Button
              basic={true}
              color={"red"}
              content={"Delete"}
              icon={"trash"}
              onClick={() => this.props.deleteProject(project._id)}
              disabled={username !== project.username}
            />
          </Table.Cell>
        </Table.Row>
      </React.Fragment>
    ));
  };
}

export default Projects;
