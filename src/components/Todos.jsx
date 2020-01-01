import React from "react";
import { Container, Button, Form, Table, Divider } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Todos extends React.Component {
  state = {
    writeTodo: ""
  };

  writeTodo = e => {
    e.preventDefault();
    const writeTodo = e.target.value;
    this.setState({ writeTodo });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Todos</h1>
        <Container text>
          <Divider horizontal>Add new todo</Divider>
          <Form>
            <Form.Field>
              <input
                type="text"
                value={this.state.writeTodo}
                onChange={this.writeTodo}
              />
            </Form.Field>
            <Button
              basic={true}
              color={"green"}
              onClick={() => this.props.addTodo(this.state.writeTodo)}
              content={"Add"}
              icon={"plus"}
            />
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
                  width: 700,
                  minHeight: 750
                }}
              >
                {todos
                  .filter(todo => todo.complete === false)
                  .reverse()
                  .map((todo, index) => {
                    return (
                      <Draggable
                        key={todo._id}
                        draggableId={todo._id}
                        index={index}
                      >
                        {/* <div>{console.log(todo)}</div> */}
                        {(provided, snapshot) => {
                          return (
                            <div
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
                                  {console.log(todo)}
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
                                <Table.Cell
                                  style={{
                                    textAlign: "center"
                                  }}
                                >
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
                                </Table.Cell>
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

  displayCompleteTodos = (todos, username) => {
    return (
      <React.Fragment style={{}}>
        <DragDropContext
          onDragEnd={todoLocation => this.props.moveTodo(todoLocation)}
        >
          <Droppable droppableId={"completTodoBoard"} key={"completeTodoBoard"}>
            {(provieded, snapshot) => {
              return (
                <div {...provieded.droppableProps} ref={provieded.innerRef}>
                  {todos
                    .filter(todo => todo.complete === true)
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
                                  <Table.Cell
                                    style={{
                                      textAlign: "center"
                                    }}
                                  >
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
                                  </Table.Cell>
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
      </React.Fragment>
    );
  };
}

export default Todos;

// style={{
//   textAlign: "center",
//   background: snapshot.isDraggingOver
//     ? "lightblue"
//     : "lightgrey",
//   padding: 4,
//   width: 250,
//   minHeight: 500
// }}
