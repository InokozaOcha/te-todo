import { auth, provider } from "../firebase";
import { useUser } from "./useUser";

export const useAuth = () => {
  const setUser = useUser().setUser;

  //Googleでサインインします
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));

    setUser({
      uid: auth.currentUser?.uid,
      name: auth.currentUser?.displayName,
      photoUrl: auth.currentUser?.uid,
    });
  };

  return { signInGoogle };
};
