import React from "react";
import { Button, Container, Form, Table, Divider } from "semantic-ui-react";

class Projects extends React.Component {
  // state = {
  // writeProject: ""
  // };

  render() {
    return (
      <React.Fragment>
        <h1>Projects</h1>
        <Container text>
          <Divider horizontal>Add new Project</Divider>
          <Form>
            <Form.Field>
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
      </React.Fragment>
    );
  }

  displayProjects = (projects, username) => {
    return projects.map((project, index) => (
      <React.Fragment>
        <Table.Row key={`${project._id}`}>
          <Table.Cell
            style={{
              textAlign: "center"
            }}
          >
            {project.value}
          </Table.Cell>
          <Table.Cell
            style={{
              textAlign: "right"
            }}
            collapsing
          >
            <Button
              basic={true}
              color={"red"}
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
