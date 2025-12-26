import { ThemeProvider } from "next-themes";
import { Searchbar } from "./_components/searchbar";
import { Sidebar } from "./_components/sidebar";

export default function DashboardPage() {
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
        <div className="grow rounded-xl bg-sidebar-strong p-6">
          <Searchbar />
        </div>
      </div>
    </ThemeProvider>
  );
}
