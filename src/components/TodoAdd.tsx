import React from "react";
import { db } from "../firebase";
import { useTodoAdd } from "../hooks/useTodoAdd";
import { title } from "process";
import { time } from "console";

const TodoAdd = () => {
  //const todoAdd = useTodoAdd;
  //console.log(todoAdd);

  const todoAdd = useTodoAdd();

  return (
    <>
      <div>TodoAdd</div>
      <input
        value={todoAdd.inputTaskValue}
        onChange={(e) => {
          todoAdd.setInputTaskValue(e.target.value);
        }}
      />
      <div>{todoAdd.inputTaskValue}</div>
      <button onClick={() => console.log("")}>hoge</button>
    </>
  );
};

export default TodoAdd;
