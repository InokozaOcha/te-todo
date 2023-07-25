import { useState } from "react";

import firebase from "firebase/compat/app";
import { db, firestore } from "../firebase";

import { useTodoList } from "./useTodoList";
import { TodoRegister } from "../types/TodoRegister";
import { useUser } from "./useUser";

export const useTodoAdd = () => {
  const [inputTaskValue, setInputTaskValue] = useState("");
  const fetchTodoList = useTodoList().fetchTodoList;

  const user = useUser().user;

  const DateToTimeStampChanger = (date: string, time: string) => {
    const dateArry = date.split("-");
    const timeArry = time.split(":");

    const Y: number = Number(dateArry[0]);
    const M: number = Number(dateArry[1]);
    const D: number = Number(dateArry[2]);

    const h: number = Number(timeArry[0]);
    const m: number = Number(timeArry[1]);
    // const s: number = Number(timeArry[2]);

    const dateAsDate = new Date(Y, M - 1, D, h, m, 0, 0);

    const firebaseTimeStamp = firebase.firestore.Timestamp.fromDate(dateAsDate);
    return firebaseTimeStamp;
  };

  const addTodo = async (todo: TodoRegister, mode: String) => {
    const firebaseTimeStamp = DateToTimeStampChanger(todo.date, todo.time);

    if (mode == "Add") {
      await db.collection("posts").add({
        uid: user.uid,
        title: todo.title,
        memo: todo.memo,
        date: firebaseTimeStamp,
        createed: firestore.FieldValue.serverTimestamp(),
        updated: firestore.FieldValue.serverTimestamp(),
        state: todo.state,
      });
      console.log("DB登録！");
      fetchTodoList(user.uid as string);
    } else if (mode == "Update" && todo.id != "") {
      await db.collection("posts").doc(todo.id).update({
        uid: user.uid,
        title: todo.title,
        memo: todo.memo,
        date: firebaseTimeStamp,
        updated: firestore.FieldValue.serverTimestamp(),
        state: todo.state,
      });
    } else {
    }
  };

  return { inputTaskValue, setInputTaskValue, addTodo };
};

//export default useTodoAdd;

// export const inputTaskValue = useTodoAdd().inputTaskValue
// export const setInputTaskValue = useTodoAdd().setInputTaskValue
// export const addTodo =
