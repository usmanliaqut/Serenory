import { AppSidebar } from "@/components/Common/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppNavbar } from "@/components/Common/app-navbar"; // <-- import navbar
import { cookies } from "next/headers";

async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex-1">
        <AppNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
