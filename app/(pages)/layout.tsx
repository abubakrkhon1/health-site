"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  useAuth();

  const { setTheme } = useTheme();

  const router = useRouter();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Fixed sidebar */}
        <AppSidebar />

        {/* Main layout (header + scrollable content) */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Header with sidebar trigger + page info */}
          <header className="h-16 border-b px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4 text-sm font-medium text-muted-foreground">
                {/* Example: dynamic page info */}
                Dashboard / Page
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push("/notifications")}
              >
                <Bell className="dark:text-white" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Scrollable content only inside this area */}
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
