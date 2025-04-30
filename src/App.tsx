import "./App.css";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { AppActivity } from "./components/activity/app-activity";
import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { Login } from "./components/login/login";


function App() {

  const [user, setUser] = useState(null); // here we store logged-in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // if user is logged in, we get user object — otherwise null
    });

    return () => unsubscribe(); // cleanup when component unmounts
  }, []);

  // if user ain't logged in yet, show LogIn
  if (!user) return <Login />;
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
        <AppActivity/>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
