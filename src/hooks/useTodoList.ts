import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "../states/todoListState";
import { db } from "../firebase";

export const useTodoList = () => {
  const todoListValue = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);

  const dateFormatter = (dateString: string) => {
    const dateArry1 = dateString.split(" ");
    const date = dateArry1[0];
    const time = dateArry1[1];
    const dateArry2 = date.split("/");
    const Y = dateArry2[0];
    const M = ("00" + dateArry2[1]).slice(-2);
    const D = ("00" + dateArry2[2]).slice(-2);

    const timeArry = time.split(":");
    const h = ("00" + timeArry[0]).slice(-2);
    const m = ("00" + timeArry[1]).slice(-2);

    const returnDate = Y + "/" + M + "/" + D + " " + h + ":" + m;
    return returnDate;
  };

  const todoCardStyle = (todoState: string) => {
    let style = "";

    switch (todoState) {
      case "Want":
        break;
      case "Ready":
        break;
      case "Doing":
        break;
      case "Done":
        break;
      default:
    }
    return;
  };

  const fetchTodoList = async () => {
    db.collection("posts")
      .orderBy("date", "desc")
      .onSnapshot((data) => {
        const todoList = data.docs.map((todo) => {
          console.log(todo.data());
          return {
            id: todo.id,
            title: todo.data().title as string,
            memo: todo.data().memo as string,
            date: dateFormatter(
              todo
                .data({ serverTimestamps: "estimate" })
                .date?.toDate()
                .toLocaleString()
            ),
            state: todo.data().state as string,
            style: "",
          };
        });

        setTodoList(todoList);
      });
    console.log("fetchしました");
  };

  return { todoListValue, fetchTodoList };
};
