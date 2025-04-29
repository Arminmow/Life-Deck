import "./App.css";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { AppActivity } from "./components/activity/app-activity";


function App() {
  return (
    <>
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
