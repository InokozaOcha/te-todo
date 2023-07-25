import React, { useState, useEffect } from "react";

import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../states/userState";
import { todoListState } from "../states/todoListState";
import { User } from "../types/User";
import firebase from "firebase/compat/app";
import { db, dbFirestore, firestore } from "../firebase";
import {
  doc,
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useTodoList } from "./useTodoList";
import { TodoRegister } from "../types/TodoRegister";

export const useTodoAdd = () => {
  const [inputTaskValue, setInputTaskValue] = useState("");
  const fetchTodoList = useTodoList().fetchTodoList;

  const DateToTimeStampChanger = (date: string, time: string) => {
    const dateArry = date.split("-");
    const timeArry = time.split(":");

    const Y: number = Number(dateArry[0]);
    const M: number = Number(dateArry[1]);
    const D: number = Number(dateArry[2]);
    if (timeArry.length < 3) {
      console.log(timeArry);
    }

    const h: number = Number(timeArry[0]);
    const m: number = Number(timeArry[1]);
    // const s: number = Number(timeArry[2]);

    const dateAsDate = new Date(Y, M - 1, D, h, m, 0, 0);
    console.log("Dateをつくりました");
    //console.log(`${Y}-${M}-${D}  ${h}:${m}:${s}`);
    console.log(dateAsDate);

    const firebaseTimeStamp = firebase.firestore.Timestamp.fromDate(dateAsDate);
    return firebaseTimeStamp;
  };

  const addTodo = async (todo: TodoRegister, mode: String) => {
    const firebaseTimeStamp = DateToTimeStampChanger(todo.date, todo.time);
    console.log("とうろくび");
    console.log(todo.title);
    console.log(todo.date + " " + todo.time);
    console.log(firebaseTimeStamp.toDate().toLocaleString());

    if (mode == "Add") {
      await db.collection("posts").add({
        title: todo.title,
        memo: todo.memo,
        date: firebaseTimeStamp,
        createed: firestore.FieldValue.serverTimestamp(),
        updated: firestore.FieldValue.serverTimestamp(),
        state: todo.state,
      });
      console.log("DB登録！");
      fetchTodoList();
    } else if (mode == "Update" && todo.id != "") {
      console.log("idですよー");
      console.log(todo.id);

      await db.collection("posts").doc(todo.id).update({
        title: todo.title,
        memo: todo.memo,
        date: firebaseTimeStamp,
        updated: firestore.FieldValue.serverTimestamp(),
        state: todo.state,
      });

      console.log("あっぷでーともーど");
    } else {
      console.log("IDないんだが？");
    }
  };

  return { inputTaskValue, setInputTaskValue, addTodo };
};

//export default useTodoAdd;

// export const inputTaskValue = useTodoAdd().inputTaskValue
// export const setInputTaskValue = useTodoAdd().setInputTaskValue
// export const addTodo =
