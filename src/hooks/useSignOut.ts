import { useRecoilState } from "recoil";
import { userState } from "../states/userState";
import { auth } from "../firebase";

export const useSignOut = () => {
  const [user, setUser] = useRecoilState(userState);
  const signOut = () => {
    auth.signOut();
    setUser({
      uid: "",
      name: "",
      photoUrl: "",
    });
  };
  return { signOut };
};
