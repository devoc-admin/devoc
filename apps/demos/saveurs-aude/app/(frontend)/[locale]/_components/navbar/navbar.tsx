import { NavbarCategoryLink } from "@/app/(frontend)/[locale]/_components/navbar/category-link";
import clayTexture from "@/assets/texture/clay.webp";
import { getTypedLocale } from "@/i18n/routing";
import { getPayloadClient } from "@/lib/payload";
import { cn } from "@/lib/utils";

const MAX_CATEGORIES = 5;

export async function Navbar() {
  const categories = await getCategoriesForNavbar();

  return (
    <Container>
      {categories.map(({ id, title, slug }) => (
        <NavbarCategoryLink key={id} slug={slug}>
          {title}
        </NavbarCategoryLink>
      ))}
    </Container>
  );
}

// 📦 ==============================================================
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "hidden lg:flex",
        "items-center justify-center gap-x-6",
        "w-full",
        "relative isolate",
        "bg-primary text-primary-foreground",
        "py-2"
      )}
      style={{
        boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.2) inset",
      }}
    >
      <ClayTexture />
      {children}
    </div>
  );
}

function ClayTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-auto bg-repeat opacity-30 brightness-40"
      style={{ backgroundImage: `url(${clayTexture.src})` }}
    />
  );
}

// =================================
// 🟡 Categories
async function getCategoriesForNavbar() {
  // 🌐
  const locale = await getTypedLocale();

  // 📦
  const payload = await getPayloadClient();

  // Fetch all categories
  const { docs: categories } = await payload.find({
    collection: "categories",
    limit: 0,
    locale,
  });

  // Count products per category
  const categoriesWithCount = await Promise.all(
    categories.map(async ({ id, slug, title }) => {
      const { totalDocs } = await payload.count({
        collection: "products",
        locale,
        where: { category: { equals: id } },
      });
      return { id, productCount: totalDocs, slug, title };
    })
  );

  // 🏆 Return top 5 by product count
  return categoriesWithCount
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, MAX_CATEGORIES)
    .map(({ id, slug, title }) => ({ id, slug, title }));
}
