import React from "react";
import { auth, provider, storage } from "../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../states/userState";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const Auth = () => {
  const [user, setUser] = useRecoilState(userState);
  const signInGoogle = async () => {
    console.log("ositade!!!!!!!!!");
    console.log(auth.currentUser?.uid);
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
    console.log("Authご");
    setUser({
      uid: auth.currentUser?.uid,
      name: auth.currentUser?.displayName,
      photoUrl: auth.currentUser?.uid,
    });
    console.log(auth.currentUser?.uid);
  };

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
