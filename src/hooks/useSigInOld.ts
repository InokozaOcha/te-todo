import React, { useEffect } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../states/userState";
import { auth } from "../firebase";
import { User } from "../types/User";

const SignInCheck = () => {
  const [user, setUser] = useRecoilState(userState);

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
  return { user };
};

export const useSignInCheck = SignInCheck();

//export const user = useSignInCheck().user;

//export default useSignInCheck;
