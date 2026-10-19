// Renders schema.org data. `<` is escaped so the payload can't close the script tag.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inlined as raw JSON
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}
