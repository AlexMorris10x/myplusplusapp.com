import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function Projects(props) {
  const [state, setState] = useState({
    projectText: ""
  });

  const writeText = e => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const addProjectLocal = (e, projectText) => {
    e.preventDefault();
    if (projectText.length === 0) return;
    props.addProject(e, projectText);
    setState({
      projectText: ""
    });
  };

  return (
    <React.Fragment>
      <HomeWrapper>
        <Link to="/">HOME</Link>
      </HomeWrapper>
      <TitleWrapper>Projects</TitleWrapper>
      <form onSubmit={e => addProjectLocal(e, state.projectText)}>
        <input
          placeholder="New project..."
          type="text"
          name="projectText"
          value={state.projectText}
          onChange={e => writeText(e)}
        />
        <AddProjectButton>Add Project</AddProjectButton>
      </form>
      {displayProjects(props)}
    </React.Fragment>
  );
}

const displayProjects = props => {
  return (
    <DragDropContext
      onDragEnd={projectLocation => props.moveProject(projectLocation)}
    >
      <Droppable droppableId={"projectBoard"} key={"projectBoard"}>
        {(provieded, snapshot) => {
          return (
            <AllProjectsWrapper
              {...provieded.droppableProps}
              ref={provieded.innerRef}
            >
              {props.projects
                .map((project, index) => {
                  return (
                    <Draggable
                      key={project._id}
                      draggableId={project._id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <ProjectWrapper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ProjectTextWrapper>
                              <Link to={`${project._id}`}>{project.text}</Link>
                            </ProjectTextWrapper>
                            <DeleteProjectButton
                              onClick={() => props.deleteProject(project._id)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </DeleteProjectButton>
                          </ProjectWrapper>
                        );
                      }}
                    </Draggable>
                  );
                })
                .reverse()}
            </AllProjectsWrapper>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Projects;

const HomeWrapper = styled.div`
  margin: 40px auto;
  font-size: 2em;
  > a {
    color: blue;
    text-decoration: none;
  }
`;

const AddProjectButton = styled.button`
  margin: 1em;
  font-size: 1em;
  border: 2px solid black;
  border-radius: 10px;
`;

const TitleWrapper = styled.div`
  margin: auto;
  padding: 10px;
  font-size: 2em;
`;

const AllProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  max-width: 300px;
  width: 30vw;
  @media (max-width: 600px) {
    width: 60vw;
  }
  border: 2px solid black;
  border-radius: 10px;
`;

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1em;
  border: 0.5px solid black;
  border-radius: 3px;
`;

const ProjectTextWrapper = styled.div`
  margin: 20px auto;
  padding: 10px;
  width: 40vw;
  font-size: 1em;
  > a {
    color: blue;
    text-decoration: none;
  }
`;

const DeleteProjectButton = styled.div`
  margin: auto;
  padding: 10px;
  width: min-content;
  font-size: 1em;
  color: red;
  border: 1.5px solid black;
  border-radius: 12px;
`;
