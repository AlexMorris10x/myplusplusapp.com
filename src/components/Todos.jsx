import React from "react";
import { Container, Button, Form, Table, Divider } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

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
        <Container text>
          <Form>
            <div class="eight wide column">
              <Form.Field style={MyForm}>
                <input
                  placeholder="Add new todo"
                  type="text"
                  value={this.props.todoText}
                  onChange={e => this.props.writeTodo(e)}
                />
              </Form.Field>
              <Button
                basic={true}
                color={"green"}
                onClick={() => this.props.addTodo(this.props.todoText)}
                content={"Add"}
                icon={"plus"}
              />
            </div>
          </Form>
          <Table celled>
            <Table.Body>
              {this.displayTodos(this.props.todos, this.props.username)}
            </Table.Body>
          </Table>
          <Table celled>
            <Table.Body>
              {this.displayCompleteTodos(this.props.todos, this.props.username)}
            </Table.Body>
          </Table>
        </Container>
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
              <div
                {...provieded.droppableProps}
                ref={provieded.innerRef}
                style={{
                  textAlign: "center",
                  background: snapshot.isDraggingOver ? "lightblue" : "white",
                  padding: 100,
                  minHeight:
                    this.props.todos.filter(
                      todo => todo.complete === false && todo.project === endURL
                    ).length * 210
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
                            <TodoItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Table.Row>
                                <Table.Cell
                                  style={{
                                    textAlign: "right"
                                  }}
                                  collapsing
                                >
                                  <Button
                                    basic={true}
                                    color={"green"}
                                    icon={"check"}
                                    onClick={() =>
                                      this.props.completeTodo(
                                        todo._id,
                                        todo.complete
                                      )
                                    }
                                    disabled={username !== todo.username}
                                  />
                                </Table.Cell>
                                <TodoText>
                                  {/* <Table.Cell> */}
                                  {todo.complete === true ? (
                                    <h2
                                      style={{
                                        textDecoration: "line-through"
                                      }}
                                    >
                                      {todo.value}
                                    </h2>
                                  ) : (
                                    <h2>{todo.value}</h2>
                                  )}
                                  {/* </Table.Cell> */}
                                </TodoText>
                                <Table.Cell
                                  style={{
                                    textAlign: "right"
                                  }}
                                  collapsing
                                >
                                  <Button
                                    basic={true}
                                    color={"red"}
                                    icon={"trash"}
                                    onClick={() =>
                                      this.props.deleteTodo(todo._id)
                                    }
                                    disabled={username !== todo.username}
                                  />
                                </Table.Cell>
                              </Table.Row>
                            </TodoItem>
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
                <Divider horizontal>
                  <h1>COMPLETED</h1>
                </Divider>
                <div
                  {...provieded.droppableProps}
                  ref={provieded.innerRef}
                  style={{
                    textAlign: "center",
                    background: snapshot.isDraggingOver ? "lightblue" : "white",
                    padding: 100,
                    minHeight:
                      this.props.todos.filter(
                        todo =>
                          todo.complete === true && todo.project === endURL
                      ).length * 210
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
                              <TodoItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Table.Row>
                                  <Table.Cell
                                    style={{
                                      textAlign: "right"
                                    }}
                                    collapsing
                                  >
                                    <Button
                                      basic={true}
                                      color={"green"}
                                      icon={"check"}
                                      onClick={() =>
                                        this.props.completeTodo(
                                          todo._id,
                                          todo.complete
                                        )
                                      }
                                      disabled={username !== todo.username}
                                    />
                                  </Table.Cell>
                                  <TodoText>
                                    {todo.complete === true ? (
                                      <h2
                                        style={{
                                          textDecoration: "line-through"
                                        }}
                                      >
                                        {todo.value}
                                      </h2>
                                    ) : (
                                      <h2>{todo.value}</h2>
                                    )}
                                    {/* </Table.Cell> */}
                                  </TodoText>
                                  <Table.Cell
                                    style={{
                                      textAlign: "right"
                                    }}
                                    collapsing
                                  >
                                    <Button
                                      basic={true}
                                      color={"red"}
                                      icon={"trash"}
                                      onClick={() =>
                                        this.props.deleteTodo(todo._id)
                                      }
                                      disabled={username !== todo.username}
                                    />
                                  </Table.Cell>
                                </Table.Row>
                              </TodoItem>
                            );
                          }}
                        </Draggable>
                      );
                    })}
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

const TodoItem = styled.div`
  text-align: center;
  display: inline-block;
  overflow: hidden;
  width: 430px;
  background-color: white;
`;
const TodoText = styled.div`
  text-align: center;
  display: block;
  width: 300px;
  background-color: white;
  margin: 0px;
`;

const MyForm = {
  width: "100%",
  height: "100%",
  verticalAlign: "middle"
};
