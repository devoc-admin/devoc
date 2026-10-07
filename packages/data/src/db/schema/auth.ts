/** biome-ignore-all assist/source/useSortedKeys: database schema */

import { relations } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { customers } from "./customers";

export const userTypeEnum = pgEnum("userType", ["user", "admin"]);

export const users = pgTable(
  "users",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .defaultNow()
      .notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    id: text().primaryKey().notNull(),
    image: text(),
    name: text().notNull(),
    type: userTypeEnum().notNull().default("user"),
    updatedAt: timestamp({ mode: "string", withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique("user_email_key").on(table.email)]
);

export const usersToCustomers = pgTable(
  "users_to_customers",
  {
    userId: text().notNull(),
    customerId: integer().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.customerId] }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "users_to_customers_userId_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.id],
      name: "users_to_customers_customerId_fkey",
    }).onDelete("cascade"),
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  usersToCustomers: many(usersToCustomers),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  usersToCustomers: many(usersToCustomers),
}));

export const usersToCustomersRelations = relations(
  usersToCustomers,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToCustomers.userId],
      references: [users.id],
    }),
    customer: one(customers, {
      fields: [usersToCustomers.customerId],
      references: [customers.id],
    }),
  })
);

export const sessions = pgTable(
  "sessions",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .defaultNow()
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
      foreignColumns: [users.id],
      name: "session_userId_fkey",
    }).onDelete("cascade"),
    unique("session_token_key").on(table.token),
  ]
);

export const accounts = pgTable(
  "accounts",
  {
    accessToken: text(),
    accessTokenExpiresAt: timestamp({ mode: "string", withTimezone: true }),
    accountId: text().notNull(),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .defaultNow()
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
      foreignColumns: [users.id],
      name: "account_userId_fkey",
    }).onDelete("cascade"),
  ]
);

export const verifications = pgTable(
  "verifications",
  {
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .defaultNow()
      .notNull(),
    expiresAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true })
      .defaultNow()
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
