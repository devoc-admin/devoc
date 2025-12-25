import { sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "user",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    id: text().primaryKey().notNull(),
    image: text(),
    name: text().notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [unique("user_email_key").on(table.email)]
);

export const session = pgTable(
  "session",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    expiresAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    id: text().primaryKey().notNull(),
    ipAddress: text(),
    token: text().notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    userAgent: text(),
    userId: text().notNull(),
  },
  (table) => [
    index("session_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "session_userId_fkey",
    }).onDelete("cascade"),
    unique("session_token_key").on(table.token),
  ]
);

export const account = pgTable(
  "account",
  {
    accessToken: text(),
    accessTokenExpiresAt: timestamp({ mode: "string", withTimezone: true }),
    accountId: text().notNull(),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    id: text().primaryKey().notNull(),
    idToken: text(),
    password: text(),
    providerId: text().notNull(),
    refreshToken: text(),
    refreshTokenExpiresAt: timestamp({ mode: "string", withTimezone: true }),
    scope: text(),
    updatedAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    userId: text().notNull(),
  },
  (table) => [
    index("account_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "account_userId_fkey",
    }).onDelete("cascade"),
  ]
);

export const verification = pgTable(
  "verification",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    expiresAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    value: text().notNull(),
  },
  (table) => [
    index("verification_identifier_idx").using(
      "btree",
      table.identifier.asc().nullsLast().op("text_ops")
    ),
  ]
);
