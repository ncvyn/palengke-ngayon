import * as s from "drizzle-orm/sqlite-core";

export const categories = s.sqliteTable("categories", {
  id: s.text("id").primaryKey(),
  name: s.text("name").notNull(),
});
