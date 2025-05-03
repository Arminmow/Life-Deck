import * as React from "react";
import { auth } from "../../firebase";
import { SearchForm } from "@/components/sidebar/search-form";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setActiveId } from "@/redux/slices/userSlice.ts";
import { AddActivityModal } from "../ui/addActivityModal.tsx";
import { Activity } from "@/types/activity.ts";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { activityService } from "@/services/activityService.ts";

const logOut = async () => {
  try {
    await auth.signOut();
    alert("Logged out successfully");
  } catch (error) {
    console.log(error);
  }
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch();
  const activities = useSelector((state: any) => state.activity.list);
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-col gap-4 p-4 border-b border-stone-200 bg-[#FAF0E6] shadow-sm rounded-b-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-700 truncate">
            {auth.currentUser?.displayName || "Welcome 👋"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={logOut}
            className="text-xs text-stone-500 hover:text-stone-700 transition"
          >
            Log Out
          </Button>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Activities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activities.map((item: Activity) => (
                <SidebarMenuItem key={item.id}>
                  {/* <h1>{item.id}</h1> */}
                  <SidebarMenuButton
                    onClick={() => {
                      dispatch(setActiveId(item.id));
                      activityService.fetchFeedsForActivity(item.id);
                    }}
                    asChild
                    isActive={item.isActive}
                  >
                    <article className="shadow-md flex items-center justify-between gap-3 px-4 py-3 bg-[#FAF0E6] rounded-xl border border-stone-200  hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.icon || "/default-icon.png"}
                          alt={item.title + " icon"}
                          className="w-8 h-8 rounded-md object-cover border border-stone-300"
                        />
                        <h2 className="text-sm font-medium text-stone-700">{item.title}</h2>
                      </div>

                      <p className="text-xs text-stone-500 font-medium">{activityService.convertSeconds(item.timeSpent)}</p>
                    </article>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="absolute bottom-5 right-5">
        <AddActivityModal text="+" />
      </div>
    </Sidebar>
  );
}
