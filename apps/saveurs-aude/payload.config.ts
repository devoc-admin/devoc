import path from "node:path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { BlogPosts } from "./payload/collections/BlogPosts";
import { Categories } from "./payload/collections/Categories";
import { Customers } from "./payload/collections/Customers";
import { FAQ } from "./payload/collections/FAQ";
import { Media } from "./payload/collections/Media";
import { Orders } from "./payload/collections/Orders";
import { Pages } from "./payload/collections/Pages";
import { Products } from "./payload/collections/Products";
import { Reviews } from "./payload/collections/Reviews";
import { Users } from "./payload/collections/Users";
import { Homepage } from "./payload/globals/Homepage";
import { SiteConfig } from "./payload/globals/SiteConfig";

const dirname = path.dirname(new URL(import.meta.url).pathname);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: "users",
  },

  collections: [
    Users,
    Media,
    Categories,
    Products,
    Orders,
    Customers,
    BlogPosts,
    Reviews,
    FAQ,
    Pages,
  ],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  editor: lexicalEditor(),

  globals: [SiteConfig, Homepage],

  localization: {
    defaultLocale: "fr",
    fallback: true,
    locales: [
      { code: "fr", label: "Français" },
      { code: "en", label: "English" },
    ],
  },

  plugins: [
    vercelBlobStorage({
      clientUploads: true,
      collections: {
        media: true,
      },
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "",

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
