"use client";

import { memo } from "react";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Doctor } from "@/types/types";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const NavUser = memo(function NavUser({ doctor }: { doctor: Doctor }) {
  const { isMobile } = useSidebar();
  const { signOut } = useAuth();
  const router = useRouter();

  if (!doctor) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-3 px-4 py-2">
            <Avatar className="h-8 w-8 bg-slate-200 rounded-full animate-bounce" />
            <div className="flex-1">
              <div className="h-4 bg-slate-200 rounded w-24 mb-1 animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-36 animate-pulse" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={doctor.avatar ?? "https://github.com/shadcn.png"}
                  alt={doctor.full_name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {doctor.full_name}
                </span>
                <span className="truncate text-xs">{doctor.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={doctor.avatar ?? "https://github.com/shadcn.png"}
                    alt={doctor.full_name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    <div className="flex items-center gap-x-1">
                      {doctor.full_name} <BadgeCheck size={15} color="blue"/>
                    </div>
                  </span>
                  <span className="truncate text-xs">{doctor.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User />
                Аккаунт
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Уведомления
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut />
              Выйти с аккаунта
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});
