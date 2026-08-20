import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./config";

const auth = getAuth(app);

const signInAdmin = async (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

const signOutAdmin = async () => signOut(auth);

export { auth, onAuthStateChanged, signInAdmin, signOutAdmin };
