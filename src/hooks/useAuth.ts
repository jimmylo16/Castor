import { auth, db } from "../../firebase";
import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { useGlobalState } from "./useGlobalContext";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

export const useAuth = () => {
  const { setUserId } = useGlobalState();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const signInState = { user, loading, error };

  const saveUserInDbAndContinue = async (user: User) => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    localStorage.setItem("user", JSON.stringify(user));
    setUserId(user.uid);
    navigate("/");
  };
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      await saveUserInDbAndContinue(user);
    } catch (err) {
      console.error(err);
      alert((err as { message: string }).message);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const userCredentials = await signInWithEmailAndPassword(email, password);
    if (userCredentials) {
      const user = userCredentials.user;
      await saveUserInDbAndContinue(user);
    }
  };

  const logOut = () => {
    signOut(auth);
    localStorage.removeItem("user");
    setUserId("");
  };

  return { signInWithGoogle, handleSubmit, signInState, logOut };
};
