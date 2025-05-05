import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { RootState } from "@/redux/store";
import { setActivityFeed } from "@/redux/slices/activitySlice";

export function ActiveActivitySync() {
  const dispatch = useDispatch();
  const activeId = useSelector((state: RootState) => state.user.activeId);

  const activeActivityId = useSelector((state: RootState) => state.user.activeId);
  const userId = useSelector((state: RootState) => state.user.id);
    
  useEffect(() => {
    if (!userId || !activeActivityId) return;

    const ref = doc(db, "users", userId, "activities", activeActivityId);
    const unsub = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        dispatch(setActivityFeed({ id: activeId, feeds: docSnap.data().feeds }));
      }
    });

    return () => unsub();
  }, [userId, activeActivityId, dispatch]);

  return null; // This component doesn’t render anything
}
