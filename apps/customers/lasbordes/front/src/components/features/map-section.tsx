"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MapSection() {
  const hasMapKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);

  if (!hasMapKey) {
    return null;
  }

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MapPin aria-hidden="true" className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Nous trouver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
                <p className="px-4 text-center text-muted-foreground">
                  Carte interactive
                  <br />
                  <span className="text-sm">(Google Maps ou Leaflet)</span>
                </p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm">
                  Place de la Mairie, 11400 Lasbordes, France
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
