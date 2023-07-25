import { useForm } from "react-hook-form";
import { TodoRegister } from "../types/TodoRegister";
import { Todo } from "../types/Todo";
import { useState, Dispatch, SetStateAction } from "react";
import { useTodoAdd } from "./useTodoAdd";

export const useTodoInputBox = ({
  openTodoInputBoxButton,
  setOpenTodoInputBoxButton,
  postTodoObject,
  postInputMode,
}: {
  openTodoInputBoxButton: boolean;
  setOpenTodoInputBoxButton: Dispatch<SetStateAction<boolean>>;
  postTodoObject: Todo;
  postInputMode: String;
}) => {
  const { register, handleSubmit } = useForm<TodoRegister>();

  const makeDateToday = postTodoObject.date;
  const nowDate = makeDateToday.toISOString().split("T")[0];
  const nowTime = makeDateToday.toLocaleTimeString();
  const nowTimeArry = nowTime.split(":");
  const nowTimehhmm = `${("00" + nowTimeArry[0]).slice(-2)}:${(
    "00" + nowTimeArry[1]
  ).slice(-2)}`;

  const addTodo = useTodoAdd();

  const [date, setDate] = useState(nowDate);
  const [time, setTime] = useState(nowTimehhmm);
  const onSubmit = (data: TodoRegister) => {
    const newData: TodoRegister = {
      id: todoId,
      title: data.title,
      memo: data.memo,
      date: data.date,
      time: data.time,
      state: todoState,
    };
    addTodo.addTodo(newData, postInputMode);
  };

  const selectidButtonStyle = (state: string, thisButtonState: string) => {
    if (state == thisButtonState) {
      return "contained";
    } else {
      return "outlined";
    }
  };

  const state = () => {
    if (postTodoObject.state == "") {
      return "ready";
    } else {
      return postTodoObject.state;
    }
  };
  const [todoState, setTodoState] = useState(state);
  const [todoTitle, setTodoTitle] = useState(postTodoObject.title);
  const [todoMemo, setTodoMemo] = useState(postTodoObject.memo);
  const todoId = postTodoObject.id;

  const inputMode = postInputMode;

  const blockSubmit = (input: string) => {
    if (input === "") {
      return "block-button";
    } else {
      return "submit-button";
    }
  };

  return {
    todoState: todoState,
    setTodoState: setTodoState,
    todoTitle: todoTitle,
    setTodoTitle: setTodoTitle,
    todoMemo: todoMemo,
    setTodoMemo: setTodoMemo,
    selectidButtonStyle,
    onSubmit,
    date,
    setDate,
    time,
    setTime,
    register,
    handleSubmit,
    blockSubmit,
  };
};
