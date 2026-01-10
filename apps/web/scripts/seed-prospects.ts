import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { prospect } from "../lib/db/schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

const prospects = [
  // Cities near Carcassonne (Aude)
  {
    location: "https://www.google.com/maps/place/Carcassonne",
    name: "Ville de Carcassonne",
    type: "city" as const,
    website: "https://www.carcassonne.org",
  },
  {
    location: "https://www.google.com/maps/place/Narbonne",
    name: "Ville de Narbonne",
    type: "city" as const,
    website: "https://www.narbonne.fr",
  },
  {
    location: "https://www.google.com/maps/place/Castelnaudary",
    name: "Ville de Castelnaudary",
    type: "city" as const,
    website: "https://ville-castelnaudary.fr",
  },
  {
    location: "https://www.google.com/maps/place/Limoux",
    name: "Ville de Limoux",
    type: "city" as const,
    website: "https://www.limoux.fr",
  },
  {
    location: "https://www.google.com/maps/place/Trèbes",
    name: "Ville de Trèbes",
    type: "city" as const,
    website: "https://ville-trebes.com",
  },
  {
    location: "https://www.google.com/maps/place/Pennautier",
    name: "Ville de Pennautier",
    type: "city" as const,
    website: "https://pennautier.fr",
  },
  {
    location: "https://www.google.com/maps/place/Villemoustaussou",
    name: "Ville de Villemoustaussou",
    type: "city" as const,
    website: "https://www.villemoustaussou.fr",
  },
  {
    location: "https://www.google.com/maps/place/Conques-sur-Orbiel",
    name: "Ville de Conques-sur-Orbiel",
    type: "city" as const,
    website: "https://www.conques-sur-orbiel.fr",
  },
  {
    location: "https://www.google.com/maps/place/Palaja",
    name: "Ville de Palaja",
    type: "city" as const,
    website: "https://www.mairie-palaja.fr",
  },
  // EPCI (Intercommunalités) near Carcassonne
  {
    location: "https://www.google.com/maps/place/Carcassonne",
    name: "Carcassonne Agglo",
    type: "epci" as const,
    website: "https://www.carcassonne-agglo.fr",
  },
  {
    location: "https://www.google.com/maps/place/Narbonne",
    name: "Le Grand Narbonne",
    type: "epci" as const,
    website: "https://www.legrandnarbonne.com",
  },
  {
    location: "https://www.google.com/maps/place/Castelnaudary",
    name: "CC Castelnaudary Lauragais Audois",
    type: "epci" as const,
    website: "https://www.cccla.fr",
  },
  {
    location: "https://www.google.com/maps/place/Limoux",
    name: "CC du Limouxin",
    type: "epci" as const,
    website: "https://cc-limouxin.com",
  },
  // Administrations in Aude
  {
    location: "https://www.google.com/maps/place/Carcassonne",
    name: "Préfecture de l'Aude",
    type: "administration" as const,
    website: "https://www.aude.gouv.fr",
  },
  {
    location: "https://www.google.com/maps/place/Carcassonne",
    name: "Conseil Départemental de l'Aude",
    type: "administration" as const,
    website: "https://www.aude.fr",
  },
  {
    location: null,
    name: "CAF de l'Aude",
    type: "administration" as const,
    website: "https://www.caf.fr",
  },
  {
    location: null,
    name: "CPAM de l'Aude",
    type: "administration" as const,
    website: "https://www.ameli.fr",
  },
  {
    location: null,
    name: "France Travail Aude",
    type: "administration" as const,
    website: "https://www.francetravail.fr",
  },
  {
    location: null,
    name: "DDFiP de l'Aude",
    type: "administration" as const,
    website: "https://www.impots.gouv.fr",
  },
  {
    location: null,
    name: "URSSAF Languedoc-Roussillon",
    type: "administration" as const,
    website: "https://www.urssaf.fr",
  },
];

async function seedProspects() {
  console.log("Seeding prospects...");

  try {
    const result = await db.insert(prospect).values(prospects).returning();
    console.log(`Successfully inserted ${result.length} prospects`);
  } catch (error) {
    console.error("Failed to seed prospects:", error);
    process.exit(1);
  }
}

seedProspects();
