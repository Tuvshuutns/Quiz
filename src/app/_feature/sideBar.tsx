"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
const items = [
  {
    title: "Genghis Khan",
    url: "#",
    icon: Home,
  },
  {
    title: "Figma ашиглах заавар",
    url: "#",
    icon: Inbox,
  },
  {
    title: "CalendarCalendarCalendarCalendarCalendarCalendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <div className="flex h-full">
      <Sidebar className="pt-16.5 border-none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-semibold text-black">
              History
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {/* <item.icon /> */}
                        <span className="text-base font-medium text-black">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-screen w-15 bg-sidebar border-r border-[#ddd] py-20 flex justify-center">
        <SidebarTrigger />
      </div>
    </div>
  );
}

export const SideBar = AppSidebar;
