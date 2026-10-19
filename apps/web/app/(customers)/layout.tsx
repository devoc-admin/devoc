import type { Metadata } from "next";

// Customer pages are private: keep them out of search results.
export const metadata: Metadata = {
  robots: { follow: false, index: false },
};

export default function CustomersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
