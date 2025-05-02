import { db } from "@/firebase";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { auth } from "@/firebase";
import { Activity } from "@/types/activity";
import { addActivity, setActivities, removeActivity, setActiveActivity } from "@/redux/slices/userSlice"; // Make sure you have removeActivity action in your userSlice
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

  buildActivityFromUserInput(input: {
    title: string;
    banner: string;
    description: string;
    icon: string;
  }): Activity & { id: string } {
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
      activationDate: null,
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

  activeActivity: async (id: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      const now = new Date().toISOString();

      // Find activity from store
      const state = store.getState();
      const activity = state.user.activities.find((act: Activity) => act.id === id);

      if (!activity) {
        console.warn(`Activity with ID ${id} not found`);
        return;
      }

      // Update it
      const updatedActivity = {
        ...activity,
        isActive: true,
        activationDate: now,
      };

      // Update Firestore
      const activityRef = doc(db, "users", userId, "activities", id);
      await setDoc(activityRef, updatedActivity);

      // Update Redux
      store.dispatch(setActiveActivity(id));

      console.log(`Activated activity ${id} at ${now}`);
    } catch (error) {
      console.error("Error activating activity:", error);
    }
  },
};
