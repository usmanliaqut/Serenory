"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  BarChart3,
  Users,
  Calendar,
  Settings,
  LogOut,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3 px-3 py-6">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-400 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg">
              <MessageCircle className="w-7 h-7 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-2xl"></div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight">
              Serenory
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Talk freely. Feel heard.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                              : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                          }`}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer (Logout) */}
      <SidebarFooter className="border-t border-sidebar-border px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-destructive hover:text-destructive-foreground w-full transition-colors">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
