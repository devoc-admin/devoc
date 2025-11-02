// storage-adapter-import-placeholder

import path from "node:path";
import { fileURLToPath } from "node:url";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
// import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { fr } from "@payloadcms/translations/languages/fr";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Actualites } from "./collections/Actualites";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Users, Media, Actualites],
  db: vercelPostgresAdapter(),
  editor: lexicalEditor(),
  // email: nodemailerAdapter({
  //   defaultFromAddress: process.env.EMAIL_FROM || "noreply@lasbordes.com",
  //   defaultFromName: process.env.EMAIL_FROM_NAME || "Las Bordes",
  //   transportOptions: {
  //     auth: process.env.OAUTH_CLIENT_ID
  //       ? {
  //           clientId: process.env.OAUTH_CLIENT_ID,
  //           clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //           refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  //           type: "OAuth2",
  //           user: process.env.SMTP_USER,
  //         }
  //       : {
  //           pass: process.env.SMTP_PASS,
  //           user: process.env.SMTP_USER,
  //         },
  //     host: process.env.SMTP_HOST,
  //     port: Number(process.env.SMTP_PORT) || 587,
  //     secure: process.env.SMTP_SECURE === "true",
  //   },
  // }),
  i18n: {
    fallbackLanguage: "fr",
    supportedLanguages: { fr },
  },
  plugins: [
    vercelBlobStorage({
      // Specify which collections should use Vercel Blob
      collections: {
        [Users.slug]: true,
        [Media.slug]: true,
        [Actualites.slug]: true,
      },
      enabled: true, // Optional, defaults to true
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
