import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function Projects(props) {
  return (
    <React.Fragment>
      <Link to="/" className="nav-link">
        <h1>HOME</h1>
      </Link>
      <h1>Projects</h1>
      <form onSubmit={e => props.addProject(e, props.projectText)}>
        <input
          placeholder="New project..."
          type="text"
          value={props.projectText}
          onChange={e => props.writeProject(e)}
        />
        <Button>Add Project</Button>
        <button>add project...</button>
      </form>
      {displayProjects(props.projects, props)}
    </React.Fragment>
  );
}

const displayProjects = (projects, props) => {
  return (
    <DragDropContext
      onDragEnd={projectLocation => props.moveProject(projectLocation)}
    >
      <Droppable droppableId={"projectBoard"} key={"projectBoard"}>
        {(provieded, snapshot) => {
          return (
            <React.Fragment
              {...provieded.droppableProps}
              ref={provieded.innerRef}
            >
              {projects
                .map((project, index) => {
                  return (
                    <Draggable
                      key={project._id}
                      draggableId={project._id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <React.Fragment
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Link to={`${project._id}`}>
                              <div>{project.value}</div>
                            </Link>
                            <button
                              onClick={() => props.deleteProject(project._id)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </React.Fragment>
                        );
                      }}
                    </Draggable>
                  );
                })
                .reverse()}
            </React.Fragment>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Projects;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;
