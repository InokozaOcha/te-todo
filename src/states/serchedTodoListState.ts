import { atom } from "recoil";
import { Todo } from "../types/Todo";

export const serchedTodoListState = atom<Todo[]>({
  key: "serchedTodoListState",
  default: [],
});
