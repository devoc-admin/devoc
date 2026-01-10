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
  // French cities
  {
    location: "https://www.google.com/maps/place/Paris",
    name: "Ville de Paris",
    type: "city" as const,
    website: "https://www.paris.fr",
  },
  {
    location: "https://www.google.com/maps/place/Lyon",
    name: "Ville de Lyon",
    type: "city" as const,
    website: "https://www.lyon.fr",
  },
  {
    location: "https://www.google.com/maps/place/Marseille",
    name: "Ville de Marseille",
    type: "city" as const,
    website: "https://www.marseille.fr",
  },
  {
    location: "https://www.google.com/maps/place/Toulouse",
    name: "Ville de Toulouse",
    type: "city" as const,
    website: "https://www.toulouse.fr",
  },
  {
    location: "https://www.google.com/maps/place/Nice",
    name: "Ville de Nice",
    type: "city" as const,
    website: "https://www.nice.fr",
  },
  {
    location: "https://www.google.com/maps/place/Nantes",
    name: "Ville de Nantes",
    type: "city" as const,
    website: "https://metropole.nantes.fr",
  },
  {
    location: "https://www.google.com/maps/place/Bordeaux",
    name: "Ville de Bordeaux",
    type: "city" as const,
    website: "https://www.bordeaux.fr",
  },
  // Public administrations
  {
    location: null,
    name: "CAF - Caisse d'Allocations Familiales",
    type: "administration" as const,
    website: "https://www.caf.fr",
  },
  {
    location: null,
    name: "CPAM - Caisse Primaire d'Assurance Maladie",
    type: "administration" as const,
    website: "https://www.ameli.fr",
  },
  {
    location: null,
    name: "Pôle Emploi / France Travail",
    type: "administration" as const,
    website: "https://www.francetravail.fr",
  },
  {
    location: null,
    name: "URSSAF",
    type: "administration" as const,
    website: "https://www.urssaf.fr",
  },
  {
    location: null,
    name: "Direction Générale des Finances Publiques",
    type: "administration" as const,
    website: "https://www.impots.gouv.fr",
  },
  // EPCI (Établissements Publics de Coopération Intercommunale)
  {
    location: "https://www.google.com/maps/place/Lyon",
    name: "Métropole de Lyon",
    type: "epci" as const,
    website: "https://www.grandlyon.com",
  },
  {
    location: "https://www.google.com/maps/place/Paris",
    name: "Métropole du Grand Paris",
    type: "epci" as const,
    website: "https://www.metropolegrandparis.fr",
  },
  {
    location: "https://www.google.com/maps/place/Marseille",
    name: "Métropole Aix-Marseille-Provence",
    type: "epci" as const,
    website: "https://www.ampmetropole.fr",
  },
  {
    location: "https://www.google.com/maps/place/Strasbourg",
    name: "Eurométropole de Strasbourg",
    type: "epci" as const,
    website: "https://www.strasbourg.eu",
  },
  {
    location: "https://www.google.com/maps/place/Nantes",
    name: "Nantes Métropole",
    type: "epci" as const,
    website: "https://metropole.nantes.fr",
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
