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

export default function Layout({ children }: AdminLayoutProps) {
  return children;
}
