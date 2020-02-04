import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function Projects(props) {
  return (
    <ProjectWrapper>
      <HomeWrapper>
        <Link to="/" className="nav-link">
          HOME
        </Link>
      </HomeWrapper>
      <TitleWrapper>Projects</TitleWrapper>
      <form onSubmit={e => props.addProject(e, props.projectText)}>
        <input
          placeholder="New project..."
          type="text"
          value={props.projectText}
          onChange={e => props.writeProject(e)}
        />
        <AddProjectButton>Add Project</AddProjectButton>
      </form>
      {displayProjects(props.projects, props)}
    </ProjectWrapper>
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
            <AllProjectsWrapper
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
                          <ProjectWrapper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Link to={`${project._id}`}>
                              <ProjectTextWrapper>
                                {project.value}
                              </ProjectTextWrapper>
                            </Link>
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

const AddProjectButton = styled.button`
  margin: 1em;
  font-size: 1em;
  border: 2px solid black;
  border-radius: 10px;
`;

const DeleteProjectButton = styled.div`
  margin: -10px auto 10px;
  padding: 10px;
  width: min-content;
  font-size: 1em;
  color: red;
  border: 1.5px solid black;
  border-radius: 12px;
`;

const HomeWrapper = styled.div`
  margin: 20px auto;
  font-size: 2em;
  > a {
    color: blue;
    text-decoration: none;
  }
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
  width: 60vw;
  border: 2px solid black;
  border-radius: 10px;
`;

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto
  border: .5px solid black;
  border-radius: 3px;
  > a {
    color: blue;
    text-decoration: none;
  }
`;

const ProjectTextWrapper = styled.div`
  margin: 20px auto;
  font-size: 2em;
`;
