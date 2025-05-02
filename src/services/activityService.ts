import { db } from "@/firebase";
import { collection, doc, getDocs, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth } from "@/firebase";
import { Activity } from "@/types/activity";
import { addActivity, setActivities, removeActivity, setActiveActivity, stopActivity } from "@/redux/slices/userSlice"; // Make sure you have removeActivity action in your userSlice
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
      timeSpent: 0,
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
      store.dispatch(setActiveActivity(id));
      // Update Firestore
      const activityRef = doc(db, "users", userId, "activities", id);
      await setDoc(activityRef, updatedActivity);

      // Update Redux

      console.log(`Activated activity ${id} at ${now}`);
    } catch (error) {
      console.error("Error activating activity:", error);
    }
  },

  async stopActivity(id: string) {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      const activityRef = doc(db, "users", userId, "activities", id);
      const docSnap = await getDoc(activityRef);

      if (docSnap.exists()) {
        const activity = docSnap.data() as Activity;

        // Update activity to stop and calculate timeSpent
        activity.isActive = false;
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "long",
        }).format(now);

        activity.lastActive = formattedDate;

        // Only calculate timeSpent if activationDate exists
        if (activity.activationDate) {
          const timeSpentInSeconds = activityService.calculateTimeSpent(activity.activationDate);
          activity.timeSpent += timeSpentInSeconds; // Adding seconds to the existing timeSpent
        }

        activity.activationDate = null; // Clear activationDate after stopping the activity
        store.dispatch(stopActivity(id)); // This will handle the state update

        // Update activity in Firestore
        await setDoc(activityRef, activity);

        console.log(`Stopped activity: ${id}`);

        // Dispatch the action to update Redux store (not duplicating the logic)
      } else {
        console.warn(`No activity found with ID: ${id}`);
      }
    } catch (error) {
      console.error("Error stopping activity:", error);
    }
  },

  addAchievement: () => {},

  calculateTimeSpent: (start: string): number => {
    const startDate = new Date(start);
    const now = new Date();

    const diffMs = now.getTime() - startDate.getTime(); // Difference in milliseconds
    const diffSeconds = Math.floor(diffMs / 1000); // Convert to seconds

    return diffSeconds;
  },

  convertSeconds: (seconds: number): string => {
    if (seconds < 60) {
      return "0m"; // If under 1 minute, return 0m
    }

    const hours = Math.floor(seconds / 3600); // Get hours
    const minutes = Math.floor((seconds % 3600) / 60); // Get minutes

    let timeStr = "";

    if (hours > 0) timeStr += `${hours}h `;
    if (minutes > 0 || hours > 0) timeStr += `${minutes}m`; // Only add minutes if there's any hour or minutes

    return timeStr.trim();
  },
};
