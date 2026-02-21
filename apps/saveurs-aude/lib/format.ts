const euroFormatter = new Intl.NumberFormat("fr-FR", {
  currency: "EUR",
  style: "currency",
});

export function formatPrice(cents: number): string {
  return euroFormatter.format(cents / 100);
}
