type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Renders JSON-LD structured data as a script tag.
 * Content is safe: JSON.stringify produces valid JSON from server-side data only.
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item) => (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires innerHTML, content is safe (JSON.stringify of server data)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          key={item["@type"] as string}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
