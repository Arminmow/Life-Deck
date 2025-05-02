import { db } from "@/firebase";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { auth } from "@/firebase";
import { Activity } from "@/types/activity";
import { addActivity, setActivities, removeActivity } from "@/redux/slices/userSlice";  // Make sure you have removeActivity action in your userSlice
import { store } from "@/redux/store";

export const activityService = {
  async addActivity(activity: any) {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No authenticated user found.");
      return;
    }
    try {
      const activityId = activity.id; // Make sure it's a string or something ID-safe
      const activityRef = doc(db, "users", userId, "activities", activityId);
      store.dispatch(addActivity(activity));
      await setDoc(activityRef, activity); // Overwrites if exists, creates if not
      console.log("Activity added/updated:", activityId);
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  },

  buildActivityFromUserInput(input: { title: string; banner: string; description: string }): Activity & { id: string } {
    const id = input.title.toLowerCase().trim().replace(/\s+/g, "-");

    return {
      id,
      title: input.title,
      banner: input.banner,
      icon: input.icon,
      description: input.description,
      timeSpent: "0m",
      isActive: false,
      lastActive: "",
    };
  },

  async fetchActivitiesFromFirebase() {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      const activitiesRef = collection(db, "users", userId, "activities");
      const snapshot = await getDocs(activitiesRef);

      const activities = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      store.dispatch(setActivities(activities));
      console.log("Set activities:", store.getState().user.activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  },

  // Implementing the deleteActivity function
  deleteActivity: async (id: string) => {
    console.log(`deleting ${id}`);
    
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      // Reference to the specific activity in Firestore
      const activityRef = doc(db, "users", userId, "activities", id);
      await deleteDoc(activityRef); // Deletes the activity from Firestore

      // Dispatch action to remove the activity from Redux store
      store.dispatch(removeActivity(id));

      console.log("Activity deleted:", id);
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  },
};
