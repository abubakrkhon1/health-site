"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CalendarClock,
  Clock,
  File,
  FileChartColumn,
  Home,
  Settings,
  Stethoscope,
} from "lucide-react";
import { NavUser } from "./nav-user";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function AppSidebar() {
  const items = [
    {
      title: "Панель управления",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Приемы",
      url: "/appointments",
      icon: Clock,
    },
    {
      title: "Медицинские записи",
      url: "/medical-records",
      icon: FileChartColumn,
    },
    {
      title: "Заметки и напоминания",
      url: "/reminders",
      icon: CalendarClock,
    },
    {
      title: "Настройки",
      url: "/settings",
      icon: Settings,
    },
  ];

  const doctor = useAuthStore((s) => s.doctor);
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="ml-2 mt-4 w-[120px] h-[40px] relative">
          <Image
            src="/logo/logo2_no_bg_short.png"
            fill
            alt="logo"
            className="object-contain"
            priority
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "bg-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white focus-visible:ring-2 focus-visible:ring-primary transition"
                          : "hover:bg-gray-200 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-primary transition"
                      }
                    >
                      <a
                        href={item.url}
                        className="flex items-center gap-2 px-3 py-2 rounded-md"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser doctor={doctor!} />
      </SidebarFooter>
    </Sidebar>
  );
}
