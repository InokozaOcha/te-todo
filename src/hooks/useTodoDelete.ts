import { useSetRecoilState, useRecoilState } from "recoil";
import { todoListState } from "../states/todoListState";
import { Todo } from "../types/Todo";
import { deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useTodoDelete = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const deleteTodo = async (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    await db.collection("posts").doc(id).delete();
    console.log(`id:${id}を削除しました`);
  };

  return { deleteTodo };
};
