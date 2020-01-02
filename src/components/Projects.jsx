import React from "react";
import { Container, Button, Form, Table } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

class Projects extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Projects</h1>
        <Container text>
          {/* <Divider horizontal>Add new Project</Divider> */}
          <Form>
            <Form.Field>
              <input
                type="text"
                value={this.props.projectText}
                onChange={e => this.props.writeProject(e)}
              />
            </Form.Field>
            <Button
              basic={true}
              color={"green"}
              onClick={() => this.props.addProject(this.props.projectText)}
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
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Table.Row style={{ background: "white" }}>
                                <Table.Cell>
                                  <Link to={`${project._id}`}>
                                    <h2>{project.value}</h2>
                                  </Link>
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
                                    onClick={() =>
                                      this.props.deleteProject(project._id)
                                    }
                                    disabled={username !== project.username}
                                  />
                                </Table.Cell>
                              </Table.Row>
                            </div>
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

// style={{
//   textAlign: "center",
//   background: snapshot.isDraggingOver
//     ? "lightblue"
//     : "lightgrey",
//   padding: 4,
//   width: 250,
//   minHeight: 500
// }}
