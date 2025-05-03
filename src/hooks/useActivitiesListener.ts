import { db } from "@/firebase";
import { setActivities } from "@/redux/slices/activitySlice";
import { Activity } from "@/types/activity";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useActivitiesListener = (userId: string | null) => {
  const dispatch = useDispatch();

  if (!userId) return;

  useEffect(() => {
    const ref = collection(db, `users/${userId}/activities`);
    const unsub = onSnapshot(ref, (snapshot) => {
      const activities: Activity[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Activity, "id">),
      }));
      dispatch(setActivities(activities));
    });
    return () => unsub();
  }, [userId, dispatch]);
};
