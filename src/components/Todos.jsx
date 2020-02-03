import React from "react";
import { Form, Input } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
// import styled from "styled-components";

function Todos(props) {
  let URL = window.location.href;
  URL = URL.split("/");
  const endURL = URL[URL.length - 1];
  let projectName = props.projects.filter(project => project._id === endURL);
  return (
    <React.Fragment>
      <h1 style={{ padding: 10 }}>
        {projectName[0] === undefined ? "" : projectName[0].value}
      </h1>
      <Form
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "50px auto 20px auto",
          width: 280
        }}
        onSubmit={() => props.addTodo(props.todoText, projectName[0])}
      >
        <Input
          action={{ color: "green", content: "Post" }}
          // icon="checkmark"
          iconPosition="left"
          placeholder="Add new todo..."
          type="text"
          value={props.todoText}
          onChange={e => props.writeTodo(e)}
          style={{ fontSize: "16px", margin: "0 50px 0 0" }}
        />
      </Form>
      <div>{displayTodos(props.todos, props.username, props)}</div>
      <div style={{ margin: 50 }}></div>
      <div>{displayCompleteTodos(props.todos, props.username, props)}</div>
    </React.Fragment>
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
            <React.Fragment>
              <div
                style={{
                  background: "lightgrey",
                  width: "80vw",
                  margin: "auto",
                  maxWidth: 800,
                  padding: 20
                }}
              >
                <h1>TODOs</h1>
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
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: 5,
                                  border: "1.5px solid black"
                                }}
                              >
                                <div
                                  style={{
                                    width: "10vw"
                                  }}
                                >
                                  <button
                                    style={styleTodoButton}
                                    onClick={() =>
                                      props.completeTodo(
                                        todo._id,
                                        todo.complete
                                      )
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faSquare}
                                      style={{
                                        color: "black"
                                      }}
                                    />
                                  </button>
                                </div>
                                <div
                                  style={{
                                    width: "60vw"
                                  }}
                                >
                                  {todo.complete === true ? (
                                    <h5
                                      style={{
                                        textDecoration: "line-through"
                                      }}
                                    >
                                      {todo.value}
                                    </h5>
                                  ) : (
                                    <h5>{todo.value}</h5>
                                  )}
                                </div>
                                <div
                                  style={{
                                    width: "10vw"
                                  }}
                                >
                                  <button
                                    style={styleTodoButton}
                                    onClick={() => props.deleteTodo(todo._id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashAlt}
                                      style={{ color: "red" }}
                                    />
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
            </React.Fragment>
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
            <React.Fragment>
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
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  margin: 5,
                                  border: "1.5px solid black"
                                }}
                              >
                                <div
                                  style={{
                                    width: "10vw"
                                  }}
                                >
                                  <button
                                    style={styleTodoButton}
                                    onClick={() =>
                                      props.completeTodo(
                                        todo._id,
                                        todo.complete
                                      )
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faCheckSquare}
                                      style={{ color: "black" }}
                                    />
                                  </button>
                                </div>
                                <div
                                  style={{
                                    width: "60vw"
                                  }}
                                >
                                  {todo.complete === true ? (
                                    <h5
                                      style={{
                                        textDecoration: "line-through"
                                      }}
                                    >
                                      {todo.value}
                                    </h5>
                                  ) : (
                                    <h5>{todo.value}</h5>
                                  )}
                                </div>
                                <div
                                  style={{
                                    width: "10vw"
                                  }}
                                >
                                  <button
                                    style={styleTodoButton}
                                    onClick={() => props.deleteTodo(todo._id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashAlt}
                                      style={{ color: "red" }}
                                    />
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
            </React.Fragment>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Todos;

const styleTodoButton = {
  background: "transparent",
  border: "none"
};
