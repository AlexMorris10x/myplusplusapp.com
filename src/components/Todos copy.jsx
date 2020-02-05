import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

function Todos(props) {
  const [state, setState] = useState({
    todoText: ""
  });

  const writeText = e => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const addTodoLocal = (e, todoText, projectName) => {
    e.preventDefault();
    if (todoText.length === 0) return;
    props.addTodo(e, todoText, projectName);
    setState({
      todoText: ""
    });
  };

  let URL = window.location.href;
  URL = URL.split("/");
  const endURL = URL[URL.length - 1];
  let projectName = props.projects.filter(project => project._id === endURL);
  return (
    <React.Fragment>
      <ProjectNameWrapper>
        {projectName[0] === undefined ? "" : projectName[0].text}
      </ProjectNameWrapper>
      <form onSubmit={e => addTodoLocal(e, state.todoText, projectName[0])}>
        <input
          placeholder="Add new todo..."
          type="text"
          name="todoText"
          value={state.todoText}
          onChange={e => writeText(e)}
        />
        <AddTodoButton>Add Todo</AddTodoButton>
      </form>
      {displayTodos(props, endURL)}
      {/* {displayCompleteTodos(props, endURL)} */}
    </React.Fragment>
  );
}

const displayTodos = (props, endURL) => {
  return (
    <DragDropContext
      onDragEnd={todoLocation => props.moveTodo(todoLocation, props.todos)}
    >
      <Droppable droppableId={"todoBoard"} key={"todoBoard"}>
        {(provieded, snapshot) => {
          return (
            <AllTodosWrapper
              {...provieded.droppableProps}
              ref={provieded.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "white",
                height: 300,
                margin: "auto",
                maxWidth: 800
              }}
            >
              <ListNameWrapper>TODOs</ListNameWrapper>
              {props.todos
                .filter(
                  todo => todo.complete === false && todo.projectId === endURL
                )
                .map((todo, index) => {
                  return (
                    <Draggable
                      key={todo._id}
                      draggableId={todo._id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <TodoWrapper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <CompleteTodoButton
                              onClick={() =>
                                props.completeTodo(todo._id, todo.complete)
                              }
                            >
                              <FontAwesomeIcon icon={faSquare} />
                            </CompleteTodoButton>
                            <TodoTextWrapper>{todo.text}</TodoTextWrapper>
                            <DeleteTodoButton
                              onClick={() => props.deleteTodo(todo._id)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </DeleteTodoButton>
                          </TodoWrapper>
                        );
                      }}
                    </Draggable>
                  );
                })
                .reverse()}
            </AllTodosWrapper>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

const displayCompleteTodos = (props, endURL) => {
  return (
    <DragDropContext
      onDragEnd={todoLocation => props.moveTodo(todoLocation, props.todos)}
    >
      <Droppable droppableId={"todoBoard"} key={"todoBoard"}>
        {(provieded, snapshot) => {
          return (
            <AllTodosWrapper
              {...provieded.droppableProps}
              ref={provieded.innerRef}
            >
              <ListNameWrapper>Completed</ListNameWrapper>
              {props.todos
                .filter(
                  todo => todo.complete === true && todo.projectId === endURL
                )
                .map((todo, index) => {
                  return (
                    <Draggable
                      key={todo._id}
                      draggableId={todo._id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <TodoWrapper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <CompleteTodoButton
                              onClick={() =>
                                props.completeTodo(todo._id, todo.complete)
                              }
                            >
                              <FontAwesomeIcon icon={faCheckSquare} />
                            </CompleteTodoButton>
                            <TodoTextWrapper>{todo.text}</TodoTextWrapper>
                            <DeleteTodoButton
                              onClick={() => props.deleteTodo(todo._id)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </DeleteTodoButton>
                          </TodoWrapper>
                        );
                      }}
                    </Draggable>
                  );
                })
                .reverse()}
            </AllTodosWrapper>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Todos;

const ProjectNameWrapper = styled.div`
  margin: 40px 0 20px 0;
  font-size: 3em;
`;

const AddTodoButton = styled.button`
  margin: 1em;
  font-size: 1em;
  border: 2px solid black;
  border-radius: 10px;
`;

const ListNameWrapper = styled.div`
  margin: auto;
  padding: 10px;
  font-size: 2em;
`;

const AllTodosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  width: 60vw;
  border: 2px solid black;
  border-radius: 10px;
`;

const TodoWrapper = styled.div`
  display: flex;
  margin: auto
  font-size: 1em;
  border: .5px solid black;
  border-radius: 3px;
`;

const CompleteTodoButton = styled.div`
  margin: auto;
  padding: 10px;
  width: min-content;
  font-size: 1em;
  color: black;
  background: transparent;
`;

const TodoTextWrapper = styled.div`
  margin: 10px;
  width: 60vw;
  font-size: 1.5em;
`;

const DeleteTodoButton = styled.div`
  margin: auto;
  padding: 10px;
  width: min-content;
  font-size: 1em;
  color: red;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 12px;
`;
