import { useForm } from "react-hook-form";
import { TextField, Button, ButtonGroup, Typography, Box } from "@mui/material";
import "../App.css";
import { useState, Dispatch, SetStateAction } from "react";
import { TodoRegister } from "../types/TodoRegister";
import { useTodoAdd } from "../hooks/useTodoAdd";
import { Todo } from "../types/Todo";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTodoDelete } from "../hooks/useTodoDelete";
import { useTodoInputBox } from "../hooks/useTodoInputBox";

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
  //ここから記述
  //useInputで使うために受け取ったものを全部渡す
  const useInput = useTodoInputBox({
    openTodoInputBoxButton,
    setOpenTodoInputBoxButton,
    postTodoObject,
    postInputMode,
  });

  const register = useInput.register;
  const handleSubmit = useInput.handleSubmit;

  const date = useInput.date;
  const setDate = useInput.setDate;
  const time = useInput.time;
  const setTime = useInput.setTime;

  const onSubmit = useInput.onSubmit;

  const selectidButtonStyle = useInput.selectidButtonStyle;

  const inputMode = postInputMode;
  const deleteTodo = useTodoDelete().deleteTodo;

  const todoState = useInput.todoState;
  const setTodoState = useInput.setTodoState;

  const todoTitle = useInput.todoTitle;
  const setTodoTitle = useInput.setTodoTitle;

  const todoMemo = useInput.todoMemo;
  const setTodoMemo = useInput.setTodoMemo;

  return (
    <>
      {inputMode === "Add" ? (
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
          setDate(e.target.value);
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
      {}
      {inputMode === "Add" ? (
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
