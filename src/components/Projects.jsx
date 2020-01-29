import React from "react";
import { Form, Input } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCog } from "@fortawesome/free-solid-svg-icons";

class Projects extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            padding: 20
          }}
        ></div>
        <div style={{ margin: 20 }}></div>
        <div
          style={{
            background: "lightgrey",
            margin: 20,
            padding: 20
          }}
        >
          <h1>Projects</h1>
          <Form
            onSubmit={() => this.props.addProject(this.props.projectText)}
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: 60,
              marginBottom: 50
            }}
          >
            <Input
              action={{ color: "green", content: "+ +" }}
              icon="add"
              iconPosition="left"
              placeholder="Add new project"
              type="text"
              value={this.props.projectText}
              onChange={e => this.props.writeProject(e)}
            />
          </Form>
          {this.displayProjects(this.props.projects, this.props.username)}
        </div>
        {/* <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            margin: "auto",
            padding: 20
          }}
        >
          <Link to="/" className="nav-link">
            <h1>Settings</h1>
            <FontAwesomeIcon
              icon={faCog}
              style={{
                height: 50,
                width: 50
              }}
            />
          </Link>
        </div> */}
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
                  background: snapshot.isDraggingOver ? "lightblue" : "white",
                  width: "100%",
                  margin: "auto"
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
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: 5,
                                border: "1.5px solid black"
                              }}
                            >
                              <div style={{ width: "30vw" }}>
                                <Link to={`${project._id}`}>
                                  <h5>{project.value}</h5>
                                </Link>
                              </div>
                              <div>
                                <button
                                  onClick={() =>
                                    this.props.deleteProject(project._id)
                                  }
                                  style={{
                                    width: "5vw",
                                    maxWidth: 10,
                                    color: "red",
                                    width: "10vw"
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                              </div>
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
