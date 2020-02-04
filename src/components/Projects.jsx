import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function Projects(props) {
  return (
    <div>
      <div>
        <Link to="/" className="nav-link">
          <h1>HOME</h1>
        </Link>
      </div>
      <div></div>
      <div>
        <h1>Projects</h1>
        <form onSubmit={() => props.addProject(props.projectText)}>
          <input
            action={{ color: "blue", content: "Post" }}
            iconPosition="left"
            placeholder="New project..."
            type="text"
            value={props.projectText}
            onChange={e => props.writeProject(e)}
          />
        </form>
        {displayProjects(props.projects, props.username, props)}
      </div>
    </div>
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
                          >
                            <div>
                              <Link to={`${project._id}`}>
                                <h5>{project.value}</h5>
                              </Link>
                            </div>
                            <div>
                              <button
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
