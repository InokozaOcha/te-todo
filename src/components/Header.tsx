import { AppBar, Typography, Box, Button, Container } from "@mui/material";
import { Logout } from "@mui/icons-material";
import React from "react";
import { useUser } from "../hooks/useUser";
import { useSignOut } from "../hooks/useSignOut";

const Header = () => {
  const user = useUser().user;
  const signOut = useSignOut().signOut;
  return (
    <AppBar>
      <Container className="my-header">
        {user.name ? <div></div> : <></>}
        <Box className=" my-header-contents my-header-username">
          {user.name ? (
            <Typography className="  ">ようこそ！{user.name}さん</Typography>
          ) : (
            <Typography className="  ">ようこそ！</Typography>
          )}
        </Box>
        <Box className="my-header-contents my-header-signout">
          <Logout onClick={() => signOut()} />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
