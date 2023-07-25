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
          // style={customStyles}
          onRequestClose={() => setOpenTodoInputBoxButton(false)}
        >
          <div className="rootDiv">
            {/* <Grid
              alignItems="center"
              container
              justifyContent="center"
              direction="column"
            > */}
            {/* </div> <Grid xs={12}> */}
            <TodoInputBox
              openTodoInputBoxButton={openTodoInputBoxButton}
              setOpenTodoInputBoxButton={setOpenTodoInputBoxButton}
              postTodoObject={{
                id: "",
                title: "",
                memo: "",
                date: new Date(),
                state: "Ready",
                style: "",
              }}
              postInputMode={"Add"}
            />
            {/* </Grid>
              <Grid xs={3}></Grid> */}

            {/* <Grid xs={120}> */}
            {/* </Grid> */}
            {/* </Grid> */}
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default TodoInputBoxOpenButton;
