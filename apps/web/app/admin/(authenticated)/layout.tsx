import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "./_components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <div className="flex h-screen w-screen gap-x-4 bg-sidebar p-4">
        <div>
          <Sidebar />
        </div>
        <div className="grow rounded-xl bg-sidebar-strong p-6">{children}</div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
