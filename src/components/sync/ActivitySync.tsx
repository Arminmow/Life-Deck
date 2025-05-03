// components/sync/ActivitySync.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { RootState } from "@/redux/store";
import { setActivities } from "@/redux/slices/activitySlice";

export const ActivitySync = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    if (!userId) return;

    const ref = collection(db, "users", userId, "activities");
    const unsub = onSnapshot(ref, (snap) => {
      const activities = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      dispatch(setActivities(activities));
    });

    return () => unsub();
  }, [userId]);

  return null; // invisible component, just handles sync
};
