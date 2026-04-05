import type { Prospect } from "@/lib/db/schema";
export function inferProspectType(
  placeTypes: string[],
  placeName: string
): Prospect["type"] {
  const name = placeName.toLowerCase();

  if (
    name.includes("communauté") ||
    name.includes("métropole") ||
    name.includes("agglomération") ||
    name.includes("intercommunal")
  ) {
    return "epci";
  }

  if (
    name.includes("conseil départemental") ||
    name.includes("conseil régional") ||
    name.includes("conseil général") ||
    name.includes("région ") ||
    name.includes("département ")
  ) {
    return "territorial_collectivity";
  }

  const adminTypes = [
    "local_government_office",
    "city_hall",
    "courthouse",
    "government",
    "town_hall",
  ];
  if (placeTypes.some((t) => adminTypes.includes(t))) {
    return "administration";
  }

  if (
    name.includes("mairie") ||
    name.includes("hôtel de ville") ||
    name.includes("préfecture") ||
    name.includes("sous-préfecture")
  ) {
    return "administration";
  }

  const cityTypes = [
    "locality",
    "sublocality",
    "administrative_area_level_2",
    "postal_town",
  ];
  if (placeTypes.some((t) => cityTypes.includes(t))) {
    return "city";
  }

  return "other";
}
