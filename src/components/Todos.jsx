import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

function Todos(props) {
  let URL = window.location.href;
  URL = URL.split("/");
  const endURL = URL[URL.length - 1];
  let projectName = props.projects.filter(project => project._id === endURL);
  return (
    <React.Fragment>
      <h1>{projectName[0] === undefined ? "" : projectName[0].value}</h1>
      <form onSubmit={() => props.addTodo(props.todoText, projectName[0])}>
        <input
          placeholder="Add new todo..."
          type="text"
          value={props.todoText}
          onChange={e => props.writeTodo(e)}
        />
        <button>click..</button>
      </form>
      {displayTodos(props, endURL)}
      {displayCompleteTodos(props, endURL)}
    </React.Fragment>
  );
}

const displayTodos = (props, endURL) => {
  return (
    <DragDropContext onDragEnd={todoLocation => props.moveTodo(todoLocation)}>
      <Droppable droppableId={"todoBoard"} key={"todoBoard"}>
        {(provieded, snapshot) => {
          return (
            <React.Fragment
              {...provieded.droppableProps}
              ref={provieded.innerRef}
              // style={{
              //   background: snapshot.isDraggingOver ? "lightblue" : "white",
              //   width: "80%",
              //   margin: "auto",
              //   maxWidth: 800
              // }}
            >
              <h1>TODOs</h1>
              {props.todos
                .filter(
                  todo => todo.complete === false && todo.project === endURL
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
                          <React.Fragment
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <button
                              onClick={() =>
                                props.completeTodo(todo._id, todo.complete)
                              }
                            >
                              <FontAwesomeIcon icon={faSquare} />
                            </button>
                            {todo.value}{" "}
                            <button onClick={() => props.deleteTodo(todo._id)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </React.Fragment>
                        );
                      }}
                    </Draggable>
                  );
                })}
            </React.Fragment>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

const displayCompleteTodos = (props, endURL) => {
  return (
    <DragDropContext onDragEnd={todoLocation => props.moveTodo(todoLocation)}>
      <Droppable droppableId={"todoBoard"} key={"todoBoard"}>
        {(provieded, snapshot) => {
          return (
            <React.Fragment
              {...provieded.droppableProps}
              ref={provieded.innerRef}
              // style={{
              //   background: snapshot.isDraggingOver ? "lightblue" : "white",
              //   width: "80%",
              //   margin: "auto",
              //   maxWidth: 800
              // }}
            >
              <h1>Completed</h1>
              {props.todos
                .filter(
                  todo => todo.complete === true && todo.project === endURL
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
                          <React.Fragment
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <button
                              onClick={() =>
                                props.completeTodo(todo._id, todo.complete)
                              }
                            >
                              <FontAwesomeIcon icon={faCheckSquare} />
                            </button>
                            {todo.value}
                            <button onClick={() => props.deleteTodo(todo._id)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </React.Fragment>
                        );
                      }}
                    </Draggable>
                  );
                })}
            </React.Fragment>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Todos;

// const StyleHome = styled.div`
//   text-align: center;
// `;

// background: "transparent",
// border: "none"
