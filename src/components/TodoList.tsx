import React, { useState } from "react";
import { useTodoList } from "../hooks/useTodoList";
import { useTodoDelete } from "../hooks/useTodoDelete";
import { Card, Container, Typography } from "@mui/material";
import Modal from "react-modal";
import TodoInputBox from "./TodoInputBox";
import { Todo } from "../types/Todo";

const TodoList = () => {
  const todolist = useTodoList().todoListValue;

  const deleteTodo = useTodoDelete().deleteTodo;
  const [openModal, setOpenModal] = useState(false);
  const [todoObject, setTodoObject] = useState<Todo>({
    id: "",
    title: "",
    memo: "",
    date: "",
    state: "",
    style: "",
  });
  return (
    <>
      <Container className="my-card-container">
        {todolist.map((todo) => (
          <Card
            variant="outlined"
            className={`my-card ${todo.state} ${todo.style}`}
          >
            <div
              key={todo.id}
              onClick={() => {
                setTodoObject({
                  id: todo.id,
                  title: todo.title,
                  memo: todo.memo,
                  date: new Date(todo.date),
                  state: todo.state,
                  style: "",
                });
                setOpenModal(true);
              }}
            >
              <div className="card-top">
                <div className="todo-date">{todo.date}</div>

                <div
                  className="card-top-div"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                >
                  X
                </div>
              </div>

              <Typography>{todo.title}</Typography>
              <Typography>{todo.memo}</Typography>
            </div>
          </Card>
        ))}
      </Container>
      <Modal isOpen={openModal} onRequestClose={() => setOpenModal(false)}>
        <div className="rootDiv">
          <TodoInputBox
            openTodoInputBoxButton={openModal}
            setOpenTodoInputBoxButton={setOpenModal}
            postTodoObject={{
              id: todoObject.id,
              title: todoObject.title,
              memo: todoObject.memo,
              date: todoObject.date,
              state: todoObject.state,
              style: "",
            }}
            postInputMode={"Update"}
          />
        </div>
      </Modal>
    </>
  );
};

export default TodoList;
