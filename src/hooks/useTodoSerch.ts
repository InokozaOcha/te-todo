import { useRecoilState } from "recoil";
import { todoListState } from "../states/todoListState";

export const useTodoSerch = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const selectTodo = (
    want: boolean,
    ready: boolean,
    doing: boolean,
    done: boolean
  ) => {
    const selectedList = todoList
      .map((todo) => {
        if (!want && !ready && !doing && !done) {
          return {
            id: todo.id,
            title: todo.title,
            memo: todo.memo,
            date: todo.date,
            state: todo.state,
            style: "",
          };
        } else if (todo.state == "want") {
          if (!want) {
            return {
              id: todo.id,
              title: todo.title,
              memo: todo.memo,
              date: todo.date,
              state: todo.state,
              style: "vanished-todo",
            };
          } else {
            return {
              id: todo.id,
              title: todo.title,
              memo: todo.memo,
              date: todo.date,
              state: todo.state,
              style: "",
            };
          }
        } else if (todo.state == "ready") {
          if (!ready) {
            return {
              id: todo.id,
              title: todo.title,
              memo: todo.memo,
              date: todo.date,
              state: todo.state,
              style: "vanished-todo",
            };
          } else {
            return {
              id: todo.id,
              title: todo.title,
              memo: todo.memo,
              date: todo.date,
              state: todo.state,
              style: "",
            };
          }
        } else if (todo.state == "doing") {
          if (!doing) {
            return {
              id: todo.id,
              title: todo.title,
              memo: todo.memo,
              date: todo.date,
              state: todo.state,
              style: "vanished-todo",
            };
          } else {
            return {
              id: todo.id,
              title: todo.title,
              memo: todo.memo,
              date: todo.date,
              state: todo.state,
              style: "",
            };
          }
        } else if (todo.state == "done") {
          if (!done) {
            return {
              id: todo.id,
              title: todo.title,
              memo: todo.memo,
              date: todo.date,
              state: todo.state,
              style: "vanished-todo",
            };
          } else {
            return {
              id: todo.id,
              title: todo.title,
              memo: todo.memo,
              date: todo.date,
              state: todo.state,
              style: "",
            };
          }
        }
      })
      .flatMap((e) => e ?? []);

    setTodoList(selectedList);

    return;
  };

  const serchTodo = (
    serchWord: string,
    selectState: [boolean, boolean, boolean, boolean]
  ) => {
    const filteredList = todoList
      .map((todo) => {
        const combineTitleMemo = todo.title + todo.memo;

        const todoCopy = Object.assign({}, todo);
        const todoState = ["want", "ready", "doing", "done"];
        //serchWordに引っかかるか？
        if (combineTitleMemo.indexOf(serchWord) > -1) {
          //何もチェックされていなかった場合
          if (
            selectState[0] === false &&
            selectState[1] === false &&
            selectState[2] === false &&
            selectState[3] === false
          ) {
            todoCopy.style = "";
            return todoCopy;
          } else {
            for (let i = 0; i < 4; i++) {
              if (todoState[i] === todo.state && selectState[i] == true) {
                todoCopy.style = "";
                return todoCopy;
              }
            }
            todoCopy.style = "vanished-todo";
            return todoCopy;
          }
        } else {
          // serchWordに引っかからないのは非表示
          todoCopy.style = "vanished-todo";
          return todoCopy;
        }
      })
      .flatMap((e) => e ?? []);

    setTodoList(filteredList);
  };
  return { serchTodo, selectTodo };
};
