import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "./_components/query-provider";
import { Sidebar } from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <Container>
          <Sidebar />
          <Content>{children}</Content>
        </Container>
        <Toaster />
      </QueryProvider>
    </NuqsAdapter>
  );
}

// =========================================================================

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen gap-x-4 bg-sidebar py-4 pl-4">
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grow overflow-auto rounded-xl bg-sidebar-strong p-4">
      {children}
    </div>
  );
}
