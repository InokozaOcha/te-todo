import React, { useEffect } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../states/userState";
import { auth } from "../firebase";
import { User } from "../types/User";

// const useSignInCheck2 = () => {
//   const [user, setUser] = useRecoilState(userState);

//   return { user, setUser };
// };

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);
  return { user: user, setUser: setUser };
};
