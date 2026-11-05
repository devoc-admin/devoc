import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectLinkCard({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  return (
    <li>
      <a href={url} rel="noopener noreferrer" target="_blank">
        <Card className="max-w-80">
          <CardHeader>
            <CardTitle>{children}</CardTitle>
          </CardHeader>
          <CardContent className="truncate text-gray-400">{url}</CardContent>
        </Card>
      </a>
    </li>
  );
}
