import { atom } from "recoil";
import { User } from "../types/User";

export const userState = atom<User>({
  key: "userState",
  default: {
    uid: "",
    name: "",
    photoUrl: "",
  },
});

export const testState = atom<string>({
  key: "testState",
  default: "bbbbbbbbbbbbbbbbbbbbbbbbbbb",
});
