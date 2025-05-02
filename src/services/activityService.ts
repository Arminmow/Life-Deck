import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth } from "@/firebase";
import { Activity } from "@/types/activity";
import { addActivity } from "@/redux/slices/userSlice";
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
   // Dispatch the action to add activity to Redux store
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
      description: input.description,
      timeSpent: "0m",
      isActive: false,
      lastActive: "",
    };
  },

  fetchActivitiesFromFirebase: async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No authenticated user found.");
      return;
    }
  
    try {
      const activitiesRef = collection(db, "users", userId, "activities");
      const snapshot = await getDocs(activitiesRef);
  
      const activities = snapshot.docs.map(doc => ({
       
        ...doc.data(),
      }));
  
      return activities;
    } catch (error) {
      console.error("Error fetching activities:", error);
      return null;
    }
  }
};
