import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Stack,
  TextField,
  Button,
  Input,
  Grid,
  ButtonGroup,
  Typography,
  Icon,
  Container,
  Box,
} from "@mui/material";
import "../App.css";
import { useState, Dispatch, SetStateAction } from "react";
import firebase from "firebase/compat/app";
import { TodoRegister } from "../types/TodoRegister";
import { useTodoAdd } from "../hooks/useTodoAdd";
import { Todo } from "../types/Todo";
import {} from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTodoDelete } from "../hooks/useTodoDelete";

const TodoInputBox = ({
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TodoRegister>();

  const makeDateToday = postTodoObject.date;
  const nowDate = makeDateToday.toISOString().split("T")[0];
  const nowTime = makeDateToday.toLocaleTimeString();
  const nowTimeArry = nowTime.split(":");
  const nowTimehhmm = `${("00" + nowTimeArry[0]).slice(-2)}:${(
    "00" + nowTimeArry[1]
  ).slice(-2)}`;
  console.log(nowTime);

  const addTodo = useTodoAdd();

  const [date, setDate] = useState(nowDate);
  const [time, setTime] = useState(nowTimehhmm);
  const onSubmit = (data: TodoRegister) => {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    console.log(postInputMode);

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

  const [todoState, setTodoState] = useState("ready");
  const [todoTitle, setTodoTitle] = useState(postTodoObject.title);
  const [todoMemo, setTodoMemo] = useState(postTodoObject.memo);
  const todoId = postTodoObject.id;

  const inputMode = postInputMode;
  const deleteTodo = useTodoDelete().deleteTodo;

  return (
    <>
      {inputMode == "Add" ? (
        <Typography>{`新規作成`}</Typography>
      ) : (
        <Box className="separate">
          <Typography className="separate-contents">{`更新ID:${postTodoObject.id}`}</Typography>
          <Button
            onClick={() => {
              setOpenTodoInputBoxButton(!openTodoInputBoxButton);
              deleteTodo(postTodoObject.id);
            }}
          >
            <DeleteOutlineOutlinedIcon className="separate-contents" />
          </Button>
        </Box>
      )}

      <TextField
        value={todoTitle}
        className="inputBox my-inputbox"
        placeholder="Todoの内容を入力してください"
        {...register("title")}
        onChange={(e) => {
          setTodoTitle(e.target.value);
        }}
      />
      <TextField
        value={todoMemo}
        className="inputBox my-inputbox"
        placeholder="Todoの詳細を入力してください"
        type="text"
        multiline
        rows={6}
        {...register("memo")}
        onChange={(e) => {
          setTodoMemo(e.target.value);
        }}
      />
      <TextField
        value={date}
        {...register("date")}
        onChange={(e) => {
          console.log(e.target.value);
          setDate(e.target.value);
          // DateToTimeStampChanger(date, time);
        }}
        className="inputBox my-inputbox"
        type="date"
        datatype="yyyy-MM-dd"
      />

      <TextField
        {...register("time")}
        onChange={(e) => {
          setTime(e.target.value);
        }}
        value={time}
        className="inputBox my-inputbox"
        type="time"
        datatype="hh:mm"
      />
      <ButtonGroup
        // color="secondary"
        //value = {todoState}
        aria-label="outlined secondary button group"
        //
      >
        <Button
          variant={selectidButtonStyle(todoState, "want")}
          className="stateButton"
          onClick={() => {
            setTodoState("want");
          }}
        >
          Want
        </Button>
        <Button
          className="stateButton"
          variant={selectidButtonStyle(todoState, "ready")}
          onClick={() => {
            setTodoState("ready");
          }}
        >
          Ready
        </Button>
        <Button
          variant={selectidButtonStyle(todoState, "doing")}
          className="stateButton"
          onClick={() => {
            setTodoState("doing");
          }}
        >
          Doing
        </Button>
        <Button
          variant={selectidButtonStyle(todoState, "done")}
          className="stateButton"
          onClick={() => {
            setTodoState("done");
          }}
        >
          Done
        </Button>
      </ButtonGroup>

      {inputMode == "Add" ? (
        <Button
          variant="contained"
          color="primary"
          className="my-button-register"
          onClick={handleSubmit(onSubmit)}
        >
          とうろく
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className="my-button-register"
          onClick={handleSubmit(onSubmit)}
        >
          更新
        </Button>
      )}

      <Button
        variant="outlined"
        className="my-button-close"
        onClick={() => {
          setOpenTodoInputBoxButton(!openTodoInputBoxButton);
        }}
      >
        とじる
      </Button>
      <div className="my-inputbox-bottom"></div>
    </>
  );
};

export default TodoInputBox;
