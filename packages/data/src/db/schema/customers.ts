/** biome-ignore-all assist/source/useSortedKeys: database schema */

import { relations } from "drizzle-orm";
import {
  foreignKey,
  index,
  integer,
  pgEnum,
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
    dueDate: timestamp({ mode: "string", withTimezone: true }),
    githubUrl: text("github_url"),
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

// customers -> projects lives in customersRelations (auth.ts): one relations() per table
export const projectsRelations = relations(projects, ({ one, many }) => ({
  customer: one(customers, {
    fields: [projects.customerId],
    references: [customers.id],
  }),
  links: many(links),
  steps: many(projectSteps),
}));

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export const links = pgTable(
  "links",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    projectId: integer("project_id").notNull(),
    name: text().notNull(),
    url: text().notNull(),
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
      columns: [table.projectId],
      foreignColumns: [projects.id],
      name: "links_project_id_fkey",
    }).onDelete("cascade"),
    index("links_project_id_idx").using(
      "btree",
      table.projectId.asc().nullsLast()
    ),
    unique("links_url_unique").on(table.url),
  ]
);

export const linksRelations = relations(links, ({ one }) => ({
  project: one(projects, {
    fields: [links.projectId],
    references: [projects.id],
  }),
}));

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;

export const projectStepStatusEnum = pgEnum("project_step_status", [
  "pending",
  "in_progress",
  "done",
]);

export const projectSteps = pgTable(
  "project_steps",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    projectId: integer("project_id").notNull(),
    name: text().notNull(),
    description: text(),
    position: integer().notNull(),
    status: projectStepStatusEnum().default("pending").notNull(),
    startDate: timestamp("start_date", { mode: "string", withTimezone: true }),
    dueDate: timestamp("due_date", { mode: "string", withTimezone: true }),
    completedAt: timestamp("completed_at", {
      mode: "string",
      withTimezone: true,
    }),
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
      columns: [table.projectId],
      foreignColumns: [projects.id],
      name: "project_steps_project_id_fkey",
    }).onDelete("cascade"),
    index("project_steps_project_id_position_idx").using(
      "btree",
      table.projectId.asc().nullsLast(),
      table.position.asc().nullsLast()
    ),
  ]
);

export const projectStepsRelations = relations(projectSteps, ({ one }) => ({
  project: one(projects, {
    fields: [projectSteps.projectId],
    references: [projects.id],
  }),
}));

export type ProjectStep = typeof projectSteps.$inferSelect;
export type NewProjectStep = typeof projectSteps.$inferInsert;
