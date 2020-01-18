import React from "react";
import { Form, Input } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

class Todos extends React.Component {
  render() {
    let URL = window.location.href;
    URL = URL.split("/");
    const endURL = URL[URL.length - 1];
    let projectName = this.props.projects.filter(
      project => project._id === endURL
    );
    return (
      <React.Fragment>
        <h1>{projectName[0] === undefined ? "" : projectName[0].value}</h1>
        <Form
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px auto 20px auto",
            width: 280
          }}
          onSubmit={() =>
            this.props.addTodo(this.props.todoText, projectName[0])
          }
        >
          <Input
            action={{ color: "green", content: "+ +" }}
            icon="checkmark"
            iconPosition="left"
            placeholder="Add new todo"
            type="text"
            value={this.props.todoText}
            onChange={e => this.props.writeTodo(e)}
            style={{ fontSize: "16px", margin: "0 50px 0 0" }}
          />
        </Form>
        <div>{this.displayTodos(this.props.todos, this.props.username)}</div>
        <div style={{ margin: 50 }}></div>
        <div>
          {this.displayCompleteTodos(this.props.todos, this.props.username)}
        </div>
      </React.Fragment>
    );
  }

  displayTodos = (todos, username) => {
    let URL = window.location.href;
    URL = URL.split("/");
    const endURL = URL[URL.length - 1];
    return (
      <DragDropContext
        onDragEnd={todoLocation => this.props.moveTodo(todoLocation)}
      >
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
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "white",
                      width: "80%",
                      margin: "auto",
                      maxWidth: 800
                    }}
                  >
                    {todos
                      .filter(
                        todo =>
                          todo.complete === false && todo.project === endURL
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
                                      onClick={() =>
                                        this.props.completeTodo(
                                          todo._id,
                                          todo.complete
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faCheckSquare}
                                        style={{ color: "green" }}
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
                                      onClick={() =>
                                        this.props.deleteTodo(todo._id)
                                      }
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

  displayCompleteTodos = (todos, username) => {
    let URL = window.location.href;
    URL = URL.split("/");
    const endURL = URL[URL.length - 1];
    return (
      <DragDropContext
        onDragEnd={todoLocation => this.props.moveTodo(todoLocation)}
      >
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
                        todo =>
                          todo.complete === true && todo.project === endURL
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
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "white",
                      width: "80%",
                      margin: "auto",
                      maxWidth: 800
                    }}
                  >
                    {todos
                      .filter(
                        todo =>
                          todo.complete === true && todo.project === endURL
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
                                      onClick={() =>
                                        this.props.completeTodo(
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
                                      onClick={() =>
                                        this.props.deleteTodo(todo._id)
                                      }
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
}

export default Todos;
