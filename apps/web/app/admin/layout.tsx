import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Administration backoffice",
  robots: {
    follow: false,
    index: false,
  },
  title: "Admin | Dev'Oc",
};

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: AdminLayoutProps) {
  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
