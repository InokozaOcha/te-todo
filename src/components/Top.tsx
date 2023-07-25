import TodoList from "./TodoList";
import TodoInputBoxOpenButton from "./TodoInputBoxOpenButton";
import Header from "./Header";
import { Box } from "@mui/material";
import TodoSerch from "./TodoSerch";

const Top = () => {
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
