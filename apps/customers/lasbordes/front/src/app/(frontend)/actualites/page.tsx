import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const payload = await getPayload({ config });

const actualites = await payload.find({
  collection: "actualites",
});

export const metadata: Metadata = {
  description: "Toutes les actualités de la commune de Lasbordes",
  title: "Actualités",
};

export default function ActualitesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 font-bold text-4xl text-foreground">Actualités</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Restez informés des dernières nouvelles et événements de la commune
        </p>

        <div className="space-y-6">
          {actualites.docs.map(
            ({ id, title, image, date: dateString, place, content }) => {
              const date = new Date(dateString);

              return (
                <Link href={"/actualites/test"} key={id}>
                  <Card className="transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar aria-hidden="true" className="h-4 w-4" />
                        <time dateTime={date.toISOString()}>
                          {formatDate(date)}
                        </time>
                      </div>
                      <CardTitle className="text-2xl">{title}</CardTitle>
                      {place && (
                        <div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
                          <MapPin aria-hidden="true" className="h-4 w-4" />
                          <span>{place}</span>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      {typeof image !== "number" && (
                        <Image
                          alt={title}
                          className="rounded-md"
                          height={300}
                          src={image?.url ?? ""}
                          width={500}
                        />
                      )}
                      <RichText data={content} />
                      {date && (
                        <div className="mt-4 rounded-md bg-primary/10 p-3">
                          <p className="font-medium text-primary text-sm">
                            Événement le {formatDate(date)}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
