import { NavbarCategoryLink } from "@/components/layout/NavbarCategoryLink";
import { getPayloadClient } from "@/lib/payload";
import { cn } from "@/lib/utils";

const MAX_CATEGORIES = 5;
const categories = await getCategoriesForNavbar();

export function Navbar() {
  return (
    <div
      className={cn(
        "hidden",
        "md:flex",
        "items-center justify-center gap-x-6",
        "py-2",
        "w-full",
        "bg-primary",
        "text-primary-foreground"
      )}
    >
      {categories.map(({ id, title, slug }) => (
        <NavbarCategoryLink key={id} slug={slug}>
          {title}
        </NavbarCategoryLink>
      ))}
    </div>
  );
}

// =================================
// 🟡 Categories
async function getCategoriesForNavbar() {
  const payload = await getPayloadClient();

  // Fetch all categories
  const { docs: categories } = await payload.find({
    collection: "categories",
    limit: 0,
  });

  // Count products per category
  const categoriesWithCount = await Promise.all(
    categories.map(async ({ id, slug, title }) => {
      const { totalDocs } = await payload.count({
        collection: "products",
        where: { category: { equals: id } },
      });
      return { id, productCount: totalDocs, slug, title };
    })
  );

  // Return top 5 by product count
  return categoriesWithCount
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, MAX_CATEGORIES)
    .map(({ id, slug, title }) => ({ id, slug, title }));
}
