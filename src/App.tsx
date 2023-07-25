import React from "react";
import "./App.css";
import Top from "./components/Top";
import Auth from "./components/Auth";
import { useSignInCheck } from "./hooks/useSignInCheck";

const App: React.FC = () => {
  const signInCheck = useSignInCheck();
  return <div className="App">{signInCheck.user.uid ? <Top /> : <Auth />}</div>;
};

export default App;
