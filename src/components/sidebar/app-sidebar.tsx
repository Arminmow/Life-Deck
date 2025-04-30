import * as React from "react";

import { SearchForm } from "@/components/sidebar/search-form";
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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Activities",
      items: [
        {
          title: "Chess",
          url: "https://cdn-1.webcatalog.io/catalog/chesscom/chesscom-icon-filled-256.png?v=1714773895444",
          timeSpent: "1h 30m",
          isActive: true,
        },
        {
          title: "Framer Motion",
          url: "https://tsh.io/wp-content/uploads/fly-images/32664/framer-motion-logo-1-312x211.png",
          timeSpent: "30m",
        },
        {
          title: "ShadCN",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEQhq86LZUz7tgaiNlaxQe_lv2gjhADpK75w&s",
          timeSpent: "1h 30m",
        },
        {
          title: "Reading",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqMkRaX4O3weYLKg3nKUnTX5qe4LnKuJqoVw&s",
          timeSpent: "1h 30m",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <article className=" border bg-card shadow-md">
                        <div className="shrink-0">
                          <img src={item.url} alt="Coding Icon" className="w-8 h-8 rounded-full object-cover" />
                        </div>

                        <div className="flex justify-between items-center w-full">
                          <h2 className="text-lg font-semibold">{item.title}</h2>
                          <p className="text-sm text-muted-foreground">{item.timeSpent}</p>
                        </div>
                      </article>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
