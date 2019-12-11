import React from "react";
import {
  Accordion,
  Button,
  Container,
  Form,
  Table,
  Divider,
  Modal,
  Header
} from "semantic-ui-react";

class Todos extends React.Component {
  state = {
    todoModalOpen: false,
    todoModalData: null,
    todoModalID: null
  };

  todoHandleOpen = (todoValue, todo_id) => {
    console.log(todoValue, todo_id);
    this.setState({
      todoModalOpen: true,
      todoModalData: todoValue,
      todoModalID: todo_id
    });
  };

  todoHandleClose = () =>
    this.setState({
      todoModalOpen: false,
      todoModalData: null,
      todoModalID: null
    });

  render() {
    return (
      <React.Fragment>
        <div
          className="CustomForm"
          style={{ width: 300, float: "left", border: 1 }}
        >
          <h1>Todos</h1>
          <Container text>
            <Divider horizontal>Add new TODO</Divider>
            <Form>
              <Form.Field>
                <label htmlFor="description">TODO: </label>
                <input type="text" value="@todo pass in state text locally" />
              </Form.Field>
              <Button
                basic={true}
                color={"green"}
                onClick={this.props.addTodo}
                content={"Add"}
                icon={"plus"}
              />
            </Form>
          </Container>
          <Modal
            open={this.state.handleOpen}
            closeIcon
            onClose={this.state.todoHandleClose}
            size={"small"}
          >
            <Header icon="browser" content="New description" />
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label htmlFor="description">TODO: </label>
                  <input
                    defaultValue={this.props.todoModalData}
                    type="text"
                    ref="updateTodoInput"
                  />
                </Form.Field>
                <Button
                  basic={true}
                  color={"blue"}
                  content={"Edit"}
                  icon={"pencil"}
                  onClick={this.props.updateTodo}
                />
              </Form>
            </Modal.Content>
          </Modal>
          {/* <Table celled></Table> */}
          <Table.Body>
            {this.displayTodos(this.props.todos, this.props.username)}
          </Table.Body>
        </div>
      </React.Fragment>
    );
  }

  displayTodos = (todos, username) => {
    const URL = window.location.href;
    const endURL = URL.substr(URL.lastIndexOf("/") + 1);
    return todos
      .filter(todo => todo.project === endURL)
      .map((todo, index) => (
        <React.Fragment key={index}>
          {/* <Table.Row key={`${todo._id}`}> */}
          <Table.Row>
            <Table.Cell>{todo.value}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Button
                basic={true}
                color={"blue"}
                content={"Edit"}
                icon={"pencil"}
                disabled={username !== todo.username}
                onClick={() => this.todoHandleOpen(todo.value, todo._id)}
              />
            </Table.Cell>
            <Table.Cell collapsing>
              <Button
                basic={true}
                color={"red"}
                content={"Delete"}
                icon={"trash"}
                onClick={() => this.props.deleteTodo(todo._id)}
                disabled={username !== todo.username}
              />
            </Table.Cell>
          </Table.Row>
        </React.Fragment>
      ));
  };
}

export default Todos;
