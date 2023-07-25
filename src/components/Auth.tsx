import React from "react";
import { auth, provider, storage } from "../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../states/userState";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";

const Auth = () => {
  const userState = useUser();
  const setUser = userState.setUser;
  const user = userState.user;

  const signInGoogle = useAuth().signInGoogle;

  return (
    <Container>
      <Box className="myContainer">
        <Typography>まずはサインインしてください</Typography>

        <Button id="signin-button" variant="contained" onClick={signInGoogle}>
          Sign In With Google
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
