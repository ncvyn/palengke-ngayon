import * as s from "drizzle-orm/sqlite-core";
import { categories } from "./categories";

export const commodities = s.sqliteTable(
  "commodities",
  {
    id: s.text("id").primaryKey(),
    name: s.text("name").notNull(),
    categoryId: s
      .text("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => [s.index("commodities_category_id_idx").on(t.categoryId)],
);
