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
  const activities = useSelector((state: any) => state.user.activities);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {auth.currentUser?.displayName}
        <SearchForm />

        <Button onClick={logOut}>Log Out</Button>
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
                    <article className=" border bg-card shadow-md">
                      <div className="shrink-0">
                        <img
                          src={item.icon ? item.icon : "#"}
                          alt="Coding Icon"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </div>

                      <div className="flex justify-between items-center w-full">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-sm text-muted-foreground">{activityService.convertSeconds(item.timeSpent)}</p>
                      </div>
                    </article>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <AddActivityModal text="+"/>
    </Sidebar>
  );
}
