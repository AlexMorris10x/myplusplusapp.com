import React from "react";
import { Form, Input } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function Projects(props) {
  return (
    <React.Fragment>
      <div
        style={{
          padding: 20
        }}
      >
        <Link to="/" className="nav-link">
          <h1>HOME</h1>
        </Link>
      </div>
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
          onSubmit={() => props.addProject(props.projectText)}
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: 60,
            marginBottom: 50
          }}
        >
          <Input
            action={{ color: "blue", content: "Post" }}
            // icon="add"
            iconPosition="left"
            placeholder="New project..."
            type="text"
            value={props.projectText}
            onChange={e => props.writeProject(e)}
          />
        </Form>
        {displayProjects(props.projects, props.username, props)}
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

const displayProjects = (projects, username, props) => {
  return (
    <DragDropContext
      onDragEnd={projectLocation => props.moveProject(projectLocation)}
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
                .filter(project => project.username === props.username)
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
                                style={styleProjectButton}
                                onClick={() => props.deleteProject(project._id)}
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

export default Projects;

const styleProjectButton = {
  marginRight: 10,
  width: "5vw",
  maxWidth: 10,
  color: "red",
  background: "transparent",
  border: "none"
};
