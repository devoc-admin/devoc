export default function VisitSiteLink() {
  return (
    <a
      className="shiba"
      href="/"
      rel="noopener"
      style={{
        alignItems: "center",
        backgroundColor: "#6B3A2A",
        borderRadius: "8px",
        color: "#FAF3E8",
        display: "flex",
        fontSize: "13px",
        fontWeight: 600,
        gap: "6px",
        padding: "6px 14px",
        position: "fixed",
        right: "20px",
        textDecoration: "none",
        top: "12px",
        zIndex: 10_000,
      }}
      target="_blank"
    >
      ↗ Voir le site
    </a>
  );
}
