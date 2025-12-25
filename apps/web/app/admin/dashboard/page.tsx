import { ThemeProvider } from "next-themes";
import { Sidebar } from "./_components/sidebar";

export default function DashboardPage() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem
    >
      <div className="flex h-screen w-screen gap-x-4 bg-sidebar p-4">
        <div>
          <Sidebar />
        </div>
        <div className="bg- grow rounded-xl bg-sidebar-strong p-6">
          Empty for now...
        </div>
      </div>
    </ThemeProvider>
  );
}
