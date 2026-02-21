import path from "node:path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

const dirname = path.dirname(new URL(import.meta.url).pathname);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: "users",
  },

  collections: [
    {
      auth: true,
      fields: [
        { name: "name", required: true, type: "text" },
        {
          defaultValue: "editor",
          name: "role",
          options: ["admin", "editor"],
          required: true,
          type: "select",
        },
      ],
      slug: "users",
    },
    {
      fields: [{ name: "alt", required: true, type: "text" }],
      slug: "media",
      upload: true,
    },
  ],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  editor: lexicalEditor(),
  plugins: [],

  secret: process.env.PAYLOAD_SECRET || "",

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
