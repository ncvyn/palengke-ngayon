import * as s from "drizzle-orm/sqlite-core";

export const links = s.sqliteTable("links", {
  id: s.text("id").primaryKey(),
  link: s.text("link").notNull(),
  date: s.integer("date", { mode: "timestamp" }).notNull().unique(),
});
