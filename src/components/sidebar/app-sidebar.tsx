import * as React from "react";
import { auth } from "../../firebase";
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
      <SidebarHeader className="flex flex-col gap-4 p-4  bg-card-bg shadow-sm ">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-text-main truncate">
            {auth.currentUser?.displayName || "Welcome 👋"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={logOut}
            className="text-xs text-text-subtle hover:text-text-main cursor-pointer transition"
          >
            Log Out
          </Button>
        </div>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Activities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activities.map((item: Activity) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      dispatch(setActiveId(item.id));
                    }}
                    asChild
                    isActive={item.isActive}
                  >
                    <article className="shadow-md flex items-center justify-between gap-3 px-4 py-3 bg-card-bg rounded-xl   hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.icon || "/default-icon.png"}
                          alt={item.title + " icon"}
                          className="w-8 h-8 rounded-md object-cover border border-main-bg"
                        />
                        <h2 className="text-sm font-medium text-text-main">{item.title}</h2>
                      </div>

                      <p className="text-xs text-text-subtle font-medium">
                        {activityService.convertSeconds(item.timeSpent)}
                      </p>
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
