import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { store } from "@/redux/store";
import { setUserId } from "@/redux/slices/userSlice";

export const userService = {
  async logInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const id = result.user.uid;
      store.dispatch(setUserId(id));
      alert("Logged in successfully");
    } catch (error) {
      console.log(error);
    }
  },
};
