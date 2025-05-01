  import "./App.css";

  import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
  import { AppSidebar } from "./components/sidebar/app-sidebar";
  import { AppActivity } from "./components/activity/app-activity";
  import { onAuthStateChanged } from "firebase/auth";

  import { useState, useEffect } from "react";
  import { auth } from "./firebase";
  import { Login } from "./components/login/login";
import Spinner from "./components/ui/spinner";

  function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Track loading state
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);  // Set user state
        setLoading(false);  // Set loading to false once Firebase finishes
      });
  
      // Clean up listener on component unmount
      return () => unsubscribe();
    }, []);
  
    // While checking auth state, show loading screen
    if (loading) {
      return <Spinner/>;  // Or a custom loading spinner
    }
  
    // If user is not logged in, show login page
    if (user === null) {
      return <Login />;
    }


    return (
      <>
        {/* if not logged in */}

        {/* if logged in */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center px-4 absolute z-50">
              <SidebarTrigger className="-ml-1" />
            </header>
            <AppActivity />
          </SidebarInset>
        </SidebarProvider>
      </>
    );
  }

  export default App;
