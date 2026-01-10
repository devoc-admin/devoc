import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./_components/query-provider";
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
      <NuqsAdapter>
        <QueryProvider>
          <div className="flex h-screen w-screen gap-x-4 bg-sidebar p-4">
            <div>
              <Sidebar />
            </div>
            <div className="relative grow overflow-auto rounded-xl bg-sidebar-strong p-6">
              {children}
            </div>
          </div>
          <Toaster />
        </QueryProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
