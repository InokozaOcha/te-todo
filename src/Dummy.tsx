import React from "react";
import "./App.css";

import { useUser } from "./hooks/useUser";

const Dummy = () => {
  const signInCheck = useUser().user;

  return (
    <div>
      Dummy
      {/* <div>{signInCheck.user.name}</div> */}
    </div>
  );
};

export default Dummy;
