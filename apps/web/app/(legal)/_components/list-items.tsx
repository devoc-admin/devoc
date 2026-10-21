import { cn } from "@/lib/utils";

export function ListItems({
  items,
}: {
  items: { content: React.ReactNode; id: string; title: string }[];
}) {
  return (
    <Container>
      {items.map(({ content, title, id }) => (
        <ItemContainer key={id}>
          <UpperLine />
          <ItemContentContainer>
            <Title>{title}</Title>
            <Content>{content}</Content>
          </ItemContentContainer>
        </ItemContainer>
      ))}
    </Container>
  );
}

// =====================================================

// 📦
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "text-foreground-dark",
        // ↔️
        "flex flex-col",
        "2xl:grid 2xl:grid-cols-2"
      )}
    >
      {children}
    </div>
  );
}

// 📦
export function ItemContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("2xl:col-span-full 2xl:grid 2xl:grid-cols-subgrid")}>
      {children}
    </div>
  );
}

export function ItemContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // ↔️
        "space-y-6 py-12",
        "2xl:col-span-full 2xl:grid 2xl:grid-cols-subgrid 2xl:py-16"
      )}
    >
      {children}
    </div>
  );
}

// ―
export function UpperLine() {
  return (
    <div
      className="col-span-full h-px"
      style={{
        backgroundImage:
          "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent)",
      }}
    />
  );
}

// 🆎
export function Title({ children }: { children: React.ReactNode }) {
  return <h3 className="font-fraunces text-3xl">{children}</h3>;
}

// 🔠
export function Content({ children }: { children: React.ReactNode }) {
  return (
    <p className={cn("space-y-4 text-foreground-dark/60 text-lg")}>
      {children}
    </p>
  );
}
