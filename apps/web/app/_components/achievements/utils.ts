export function formatNumber(number: number) {
  // Use the user's browser locale, default to "fr-FR" if not available
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    const locale =
      window.navigator.languages?.[0] || window.navigator.language || "fr-FR";
    return number.toLocaleString(locale);
  }
  return number.toLocaleString("fr-FR");
}
