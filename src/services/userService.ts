import { auth, db, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { store } from "@/redux/store";
import { setUserId } from "@/redux/slices/userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const userService = {
  async logInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userId = user.uid;

      store.dispatch(setUserId(userId));

      // use my custom hook here insted of these?
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // If user doesn't exist, add them to Firestore
        userService.addUserToFirestore(userId, user); // Direct call, no 'this' needed
      } else {
        console.log("User already exists in Firestore.");
      }

      alert("Logged in successfully");
    } catch (error) {
      console.error("Error logging in with Google: ", error);
    }
  },

  async addUserToFirestore(userId: string, user: any) {
    try {
      // Storing more user info (like email, displayName, photoURL)
      await setDoc(doc(db, "users", userId), {
        id: userId,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(), // Optional: store when the user was created
      });
      console.log("User added to Firestore with ID:", userId);
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  },

  
};
