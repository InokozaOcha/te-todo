import React from "react";
import { auth } from "../firebase";

import { useRecoilState } from "recoil";
import { userState } from "../states/userState";
import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";
import TodoInputBoxOpenButton from "./TodoInputBoxOpenButton";
import Header from "./Header";
import { Box, Container } from "@mui/material";
import TodoSerch from "./TodoSerch";

const Top = () => {
  const [user, setUser] = useRecoilState(userState);

  const signOut = () => {
    auth.signOut();
    setUser({
      uid: "",
      name: "",
      photoUrl: "",
    });
  };

  return (
    <>
      <Box>
        <Header />
        <TodoSerch />
        <TodoList />
        <TodoInputBoxOpenButton />
      </Box>
    </>
  );
};

export default Top;
