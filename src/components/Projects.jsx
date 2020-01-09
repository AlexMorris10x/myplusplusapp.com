import React from "react";
import { Container, Button, Form, Table, Input } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import styled from "styled-components";

class Projects extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/" className="nav-link">
          <h1>HOME</h1>
        </Link>
        <h1>Projects</h1>
        <Container text style={containerStyle}>
          <Form onSubmit={() => this.props.addProject(this.props.projectText)}>
            <Form.Field>
              <Input
                action={{ color: "green", content: "Add" }}
                icon="add"
                iconPosition="left"
                placeholder="Add new project"
                type="text"
                value={this.props.projectText}
                onChange={e => this.props.writeProject(e)}
              />
            </Form.Field>
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
    return (
      <DragDropContext
        onDragEnd={projectLocation => this.props.moveProject(projectLocation)}
      >
        <Droppable droppableId={"projectBoard"} key={"projectBoard"}>
          {(provieded, snapshot) => {
            return (
              <div
                {...provieded.droppableProps}
                ref={provieded.innerRef}
                style={{
                  textAlign: "center",
                  background: snapshot.isDraggingOver ? "lightblue" : "white",
                  padding: 100,
                  minHeight: this.props.projects.length * 210,
                  minWidth: 400
                }}
              >
                {projects
                  .filter(project => project.username === this.props.username)
                  .reverse()
                  .map((project, index) => {
                    return (
                      <Draggable
                        key={project._id}
                        draggableId={project._id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <ProjectItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Table.Row style={{ background: "white" }}>
                                <ProjectText>
                                  <Table.Cell>
                                    <Link to={`${project._id}`}>
                                      <h2>{project.value}</h2>
                                    </Link>
                                  </Table.Cell>
                                </ProjectText>
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
                                    onClick={() =>
                                      this.props.deleteProject(project._id)
                                    }
                                    disabled={username !== project.username}
                                  />
                                </Table.Cell>
                              </Table.Row>
                            </ProjectItem>
                          );
                        }}
                      </Draggable>
                    );
                  })}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  };
}

export default Projects;

const ProjectItem = styled.div`
  text-align: center;
  margin: auto;
  display: block;
  overflow: hidden;
  background-color: white;
`;

const ProjectText = styled.div`
  text-align: center;
  display: block;
  margin: auto;
  min-width: 200px
  background-color: white;
`;

const containerStyle = {
  width: "100%",
  height: "100%",
  verticalAlign: "middle"
};
