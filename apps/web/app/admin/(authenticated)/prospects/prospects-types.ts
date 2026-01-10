export const PROSPECT_TYPES = {
  administration: "Administration",
  city: "Ville",
  epci: "EPCI",
  other: "Autre",
};
export type ProspectType = keyof typeof PROSPECT_TYPES;
