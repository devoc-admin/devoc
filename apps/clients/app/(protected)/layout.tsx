import { Content } from "./_components/content";

export default function DashboardLayout({
  children,
  sidenav, // 🎰
}: {
  children: React.ReactNode;
  sidenav: React.ReactNode;
}) {
  return (
    <div className="bg-background flex h-screen flex-row gap-x-4 p-4">
      {sidenav}
      <Content>{children}</Content>
    </div>
  );
}
