import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "@/firebase";
import { Activity } from "@/types/activity";

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
      description: input.description,
      timeSpent: "0m",
      isActive: false,
      lastActive: "",
    };
  },
};
