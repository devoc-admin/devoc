/** biome-ignore-all assist/source/useSortedKeys: database schema */

import {
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  createdAt: timestamp({ mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp({ mode: "string", withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export const projects = pgTable(
  "projects",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    customerId: integer("customer_id").notNull(),
    name: text().notNull(),
    createdAt: timestamp({ mode: "string", withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp({ mode: "string", withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.id],
      name: "projects_customer_id_fkey",
    }).onDelete("cascade"),
    index("projects_customer_id_idx").using(
      "btree",
      table.customerId.asc().nullsLast()
    ),
    unique("projects_customer_id_name_unique").on(table.customerId, table.name),
  ]
);

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
