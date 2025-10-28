"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type CalendarExportButtonProps = {
  news: {
    id: string;
    slug: string;
    title: string;
    description: string;
    eventDate: Date;
    eventTime?: string;
    location?: string;
  };
};

export function CalendarExportButton({ news }: CalendarExportButtonProps) {
  const handleCalendarExport = () => {
    // Generate .ics file for calendar export
    if (!news.eventDate) return;

    const event = {
      description: news.description.replace(/\n/g, "\\n"),
      location: news.location || "",
      startDate: news.eventDate,
      startTime: news.eventTime || "00:00",
      title: news.title,
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lasbordes//Actualites//FR
BEGIN:VEVENT
UID:${news.id}@lasbordes11400.fr
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${event.startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${news.slug}.ics`;
    link.click();
  };

  return (
    <Button onClick={handleCalendarExport} size="sm">
      <Download className="h-4 w-4" />
      Ajouter à mon agenda
    </Button>
  );
}
