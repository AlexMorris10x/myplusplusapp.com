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
      <ProjectNameWrapper>{projectName[0].value}</ProjectNameWrapper>
      <form onSubmit={e => props.addTodo(e, props.todoText, projectName[0])}>
        <input
          placeholder="Add new todo..."
          type="text"
          value={props.todoText}
          onChange={e => props.writeTodo(e)}
        />
        <AddTodoButton>Add Todo</AddTodoButton>
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
            <AllTodosWrapper
              {...provieded.droppableProps}
              ref={provieded.innerRef}
            >
              <ListNameWrapper>TODOs</ListNameWrapper>
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
                            <TodoTextWrapper>{todo.value}</TodoTextWrapper>
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
    <DragDropContext onDragEnd={todoLocation => props.moveTodo(todoLocation)}>
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
                            <TodoTextWrapper>{todo.value}</TodoTextWrapper>
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
  margin: 20px;
  font-size: 3em;
`;

const AddTodoButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
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

const TodoTextWrapper = styled.div`
  width: 60vw;
  font-size: 1.5em;
`;
