import React, { useState } from "react";
import { userState } from "../states/userState";
import { Container, Button, Grid, Typography } from "@mui/material";
import Modal from "react-modal";
import "../App.css";
import TodoInputBox from "./TodoInputBox";

const TodoInputBoxOpenButton = () => {
  const customStyles = {
    content: {
      top: "60px",
      left: "50%",
      right: "auto",
      bottom: "10%",
      marginRight: "-20%",
      transform: "translate(-50%, 0%)",
      minWidth: "80%",
      minHeight: "0%",
    },
  };

  const [openTodoInputBoxButton, setOpenTodoInputBoxButton] = useState(false);
  const postObjects = {
    openTodoInputBoxButton: openTodoInputBoxButton,
    setOpenTodoInputBoxButton: setOpenTodoInputBoxButton,
  };

  return (
    <>
      <div className="modalbase"></div>
      <Container maxWidth="sm" className="my-add-button">
        <Button
          className="my-circle-button"
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenTodoInputBoxButton(true);
          }}
        >
          +
        </Button>
        <Modal
          isOpen={openTodoInputBoxButton}
          onRequestClose={() => setOpenTodoInputBoxButton(false)}
        >
          <div className="rootDiv">
            <TodoInputBox
              openTodoInputBoxButton={openTodoInputBoxButton}
              setOpenTodoInputBoxButton={setOpenTodoInputBoxButton}
              postTodoObject={{
                id: "",
                title: "",
                memo: "",
                date: new Date(),
                state: "ready",
                style: "",
              }}
              postInputMode={"Add"}
            />
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default TodoInputBoxOpenButton;
