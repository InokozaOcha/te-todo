import { TextField, Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useTodoSerch } from "../hooks/useTodoSerch";
import { set } from "react-hook-form";

const TodoSerch = () => {
  const [serchWord, setSerchWord] = useState("");
  const serchTodo = useTodoSerch().serchTodo;
  const [selectState, setSelectState] = useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false]);
  const selectTodo = (
    serchWord: string,
    state: [boolean, boolean, boolean, boolean]
  ) => {
    setSelectState(state);
    serchTodo(serchWord, state);
  };

  return (
    <>
      <div className="top-margin"></div>
      <TextField
        placeholder="検索ワード"
        className="inputBox my-inputbox serch-box"
        value={serchWord}
        onChange={(e) => {
          console.log(serchWord);
          setSerchWord(e.target.value);
          serchTodo(e.target.value, selectState);
          //  serchTodo(e.target.value);
        }}
      />
      <ButtonGroup
        className="my-button-group"
        // color="secondary"
        //value = {todoState}
        aria-label="outlined secondary button group"
        //
      >
        <Button
          variant={selectState[0] ? "contained" : "outlined"}
          className="stateButton"
          onClick={() => {
            console.log(selectState);
            selectTodo(serchWord, [
              !selectState[0],
              selectState[1],
              selectState[2],
              selectState[3],
            ]);
            // selectTodo(
            //   !selectState[0],
            //   selectState[1],
            //   selectState[2],
            //   selectState[3]
            // );
          }}
        >
          Want
        </Button>
        <Button
          className="stateButton"
          variant={selectState[1] ? "contained" : "outlined"}
          onClick={() => {
            selectTodo(serchWord, [
              selectState[0],
              !selectState[1],
              selectState[2],
              selectState[3],
            ]);
          }}
        >
          Ready
        </Button>
        <Button
          variant={selectState[2] ? "contained" : "outlined"}
          className="stateButton"
          onClick={() => {
            selectTodo(serchWord, [
              selectState[0],
              selectState[1],
              !selectState[2],
              selectState[3],
            ]);
            // selectTodo(
            //   selectState[0],
            //   selectState[1],
            //   !selectState[2],
            //   selectState[3]
            // );
          }}
        >
          Doing
        </Button>
        <Button
          variant={selectState[3] ? "contained" : "outlined"}
          className="stateButton"
          onClick={() => {
            selectTodo(serchWord, [
              selectState[0],
              selectState[1],
              selectState[2],
              !selectState[3],
            ]);
          }}
        >
          Done
        </Button>
      </ButtonGroup>
    </>
  );
};

export default TodoSerch;
