import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import { Associations } from "./collections/Associations";
import { Businesses } from "./collections/Businesses";
import { CouncilMinutes } from "./collections/CouncilMinutes";
import { Media } from "./collections/Media";
import { MunicipalTeam } from "./collections/MunicipalTeam";
// Collections
import { News } from "./collections/News";
import { Pages } from "./collections/Pages";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";

// Globals
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    meta: {
      // favicon: "/favicon.ico",
      titleSuffix: "- Lasbordes",
    },
    user: Users.slug,
  },
  collections: [
    News,
    Services,
    MunicipalTeam,
    CouncilMinutes,
    Pages,
    Associations,
    Businesses,
    Media,
    Users,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings],
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
});
