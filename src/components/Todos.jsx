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
    <div>
      <h1>{projectName[0] === undefined ? "" : projectName[0].value}</h1>
      <form onSubmit={() => props.addTodo(props.todoText, projectName[0])}>
        <input
          placeholder="Add new todo..."
          type="text"
          value={props.todoText}
          onChange={e => props.writeTodo(e)}
        />
      </form>
      <div>{displayTodos(props.todos, props.username, props)}</div>
      <div>{displayCompleteTodos(props.todos, props.username, props)}</div>
    </div>
  );
}

const displayTodos = (todos, username, props) => {
  let URL = window.location.href;
  URL = URL.split("/");
  const endURL = URL[URL.length - 1];
  return (
    <DragDropContext onDragEnd={todoLocation => props.moveTodo(todoLocation)}>
      <Droppable droppableId={"todoBoard"} key={"todoBoard"}>
        {(provieded, snapshot) => {
          return (
            <div
              {...provieded.droppableProps}
              ref={provieded.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "white",
                width: "80%",
                margin: "auto",
                maxWidth: 800
              }}
            >
              <h1>TODOs</h1>
              {todos
                .filter(
                  todo => todo.complete === false && todo.project === endURL
                )
                .reverse()
                .map((todo, index) => {
                  return (
                    <Draggable
                      key={todo._id}
                      draggableId={todo._id}
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
                              <button
                                onClick={() =>
                                  props.completeTodo(todo._id, todo.complete)
                                }
                              >
                                <FontAwesomeIcon icon={faSquare} />
                              </button>
                            </div>
                            <div>
                              {todo.complete === true ? (
                                <h5>{todo.value}</h5>
                              ) : (
                                <h5>{todo.value}</h5>
                              )}
                            </div>
                            <div>
                              <button
                                onClick={() => props.deleteTodo(todo._id)}
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

const displayCompleteTodos = (todos, username, props) => {
  let URL = window.location.href;
  URL = URL.split("/");
  const endURL = URL[URL.length - 1];
  return (
    <DragDropContext onDragEnd={todoLocation => props.moveTodo(todoLocation)}>
      <Droppable droppableId={"todoBoard"} key={"todoBoard"}>
        {(provieded, snapshot) => {
          return (
            <div
              style={{
                background: "lightgrey",
                width: "80vw",
                margin: "auto",
                marginBottom: 20,
                padding: 20,
                maxWidth: 800,
                display:
                  todos.filter(
                    todo => todo.complete === true && todo.project === endURL
                  ).length === 0
                    ? "none"
                    : "block"
              }}
            >
              <h1>COMPLETED</h1>
              <div
                {...provieded.droppableProps}
                ref={provieded.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "lightblue" : "white",
                  width: "80%",
                  margin: "auto",
                  maxWidth: 800
                }}
              >
                {todos
                  .filter(
                    todo => todo.complete === true && todo.project === endURL
                  )
                  .reverse()
                  .map((todo, index) => {
                    return (
                      <Draggable
                        key={todo._id}
                        draggableId={todo._id}
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
                                <button
                                  onClick={() =>
                                    props.completeTodo(todo._id, todo.complete)
                                  }
                                >
                                  <FontAwesomeIcon icon={faCheckSquare} />
                                </button>
                              </div>
                              <div>
                                {todo.complete === true ? (
                                  <h5>{todo.value}</h5>
                                ) : (
                                  <h5>{todo.value}</h5>
                                )}
                              </div>
                              <div>
                                <button
                                  onClick={() => props.deleteTodo(todo._id)}
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
            </div>
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
