import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

function Todos(props: any): any {
  const [state, setState] = useState({
    todoText: ""
  });

  // Write text for form
  const writeText = (e: any) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  // submitTodo and reset form
  const submitAddTodo = (e: any) => {
    e.preventDefault();
    props.addTodo(e, state.todoText);
    setState({ ...state, todoText: "" });
  };

  // component wrapper
  return (
    <React.Fragment>
      <ProjectNameWrapper>{props.projectName}</ProjectNameWrapper>
      <FormWrapper onSubmit={(e: any) => submitAddTodo(e)}>
        <input
          placeholder="New todo name..."
          type="text"
          name="todoText"
          value={state.todoText}
          onChange={e => writeText(e)}
        />
        <AddTodoButton>Add Todo</AddTodoButton>
      </FormWrapper>
      {displayTodos(props)}
      {displayCompleteTodos(props)}
    </React.Fragment>
  );
}

// undone todo list
const displayTodos = (props: any) => {
  let todos = props.todos.filter((todo: any) => todo.complete === false);
  return (
    <DragDropContext onDragEnd={todoLocation => props.moveTodo(todoLocation)}>
      <Droppable droppableId={"todoBoard"} key={"todoBoard"}>
        {(provieded, snapshot) => {
          return (
            <AllTodosWrapper
              {...provieded.droppableProps}
              ref={provieded.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "white",
                paddingBottom: snapshot.isDraggingOver ? 40 : 0
              }}
            >
              <ListNameWrapper>TODOs</ListNameWrapper>
              {todos.map((todo: any, index: any) => {
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
                            onClick={() => props.deleteTodo(todo._id, index)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </DeleteTodoButton>
                        </TodoWrapper>
                      );
                    }}
                  </Draggable>
                );
              })}
            </AllTodosWrapper>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

//completed todo list
const displayCompleteTodos = (props: any) => {
  let todos = props.todos.filter((todo: any) => todo.complete === true);
  const todoTotal = todos.length;
  if (todoTotal === 0) return "";
  return (
    <DragDropContext onDragEnd={todoLocation => props.moveTodo(todoLocation)}>
      <Droppable droppableId={"todoCompleteBoard"} key={"todoCompleteBoard"}>
        {(provieded, snapshot) => {
          return (
            <AllTodosWrapper
              {...provieded.droppableProps}
              ref={provieded.innerRef}
            >
              <ListNameWrapper>Completed</ListNameWrapper>
              {todos.map((todo: any, index: any) => {
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
                            onClick={() => props.deleteTodo(todo._id, index)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </DeleteTodoButton>
                        </TodoWrapper>
                      );
                    }}
                  </Draggable>
                );
              })}
            </AllTodosWrapper>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Todos;

const ProjectNameWrapper = styled.p`
  margin: 40px 0 20px 0;
  font-size: 3em;
`;

const FormWrapper = styled.form`
  > input {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

const AddTodoButton = styled.button`
  margin: 0;
  font-size: 0.8em;
  color: white;
  background: #4065b4;
  border: 2px solid black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ListNameWrapper = styled.p`
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
  border-radius: 8px;
  display: flex;
  margin: auto
  background: white;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  &:hover {
    background: #e9ebee;
    border-radius: 8px;
  }
`;

const CompleteTodoButton = styled.div`
  margin: auto;
  padding: 10px;
  width: min-content;
  font-size: 1em;
  color: black;
  background: transparent;
`;

const TodoTextWrapper = styled.p`
  margin: 10px;
  width: 60vw;
  font-size: 1em;
`;

const DeleteTodoButton = styled.div`
  margin: auto;
  padding: 6px;
  width: min-content;
  font-size: 1em;
  color: red;
  background: white;
  border: 1.5px solid black;
  border-radius: 8px;
`;
