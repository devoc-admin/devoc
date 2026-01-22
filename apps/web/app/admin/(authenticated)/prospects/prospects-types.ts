export const PROSPECT_TYPES = {
  administration: "Administration",
  city: "Ville",
  epci: "EPCI",
  other: "Autre",
  territorial_collectivity: "Collectivité territoriale",
};
export type ProspectType = keyof typeof PROSPECT_TYPES;

export const ESTIMATED_OPPORTUNITY = {
  medium: "Moyenne",
  strong: "Forte",
  weak: "Faible",
};
export type EstimatedOpportunity = keyof typeof ESTIMATED_OPPORTUNITY;
