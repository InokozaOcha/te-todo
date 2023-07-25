import React, { useEffect } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../states/userState";
import { auth } from "../firebase";
import { User } from "../types/User";
import { todoListState } from "../states/todoListState";
import { useTodoList } from "./useTodoList";

export const useSignInCheck = () => {
  const [user, setUser] = useRecoilState(userState);
  const fetchTodoList = useTodoList().fetchTodoList;

  useEffect(() => {
    //console.log("1かいだけ入力"); //二回出力される…
    //React.StrictModeを切れば一回になるが…
    const userCheck = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //console.log("ログインしてます");
        //ログインしてたときの処理

        setUser({
          uid: auth.currentUser?.uid,
          name: auth.currentUser?.displayName,
          photoUrl: auth.currentUser?.uid,
        });

        fetchTodoList(auth.currentUser?.uid as string);
      } else {
        //console.log("ログインしてません");
        //ログインしてなかった時の処理
        setUser({
          uid: "",
          name: "",
          photoUrl: "",
        });
      }
    });
  }, []);

  return { user, setUser };
};
