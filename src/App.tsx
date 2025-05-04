import "./App.css";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { AppActivity } from "./components/activity/app-activity";
import { onAuthStateChanged } from "firebase/auth";
import { activityService } from "./services/activityService";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { Login } from "./components/login/login";
import Spinner from "./components/ui/spinner";
import { ActivitySync } from "./components/sync/ActivitySync";
import { useDispatch } from "react-redux";
import { setUserId } from "./redux/slices/userSlice";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state
      if (user) {
        dispatch(setUserId(user.uid))
        activityService.fetchActivitiesFromFirebase(); // Fetch activities for the authenticated user
      }
      setLoading(false);
    });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  // While checking auth state, show loading screen
  if (loading) {
    return <Spinner />; // Or a custom loading spinner
  }

  // If user is not logged in, show login page
  if (user === null) {
    return <Login />;
  }

  return (
    <>
      {/* if not logged in */}
      <ActivitySync />
      {/* if logged in */}
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center px-4 absolute z-50">
            <SidebarTrigger className="-ml-1 bg-[#F8F4E9]"/>
          </header>
          <AppActivity />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
