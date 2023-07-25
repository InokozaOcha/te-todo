export type Todo = {
  id: string;
  title: string | undefined | any;
  memo: string | undefined;
  date: Date | undefined | any | null;
  //state: "NotReady" | "Ready" | "Doing" | "Done";
  state: string;
  style: string;
};
