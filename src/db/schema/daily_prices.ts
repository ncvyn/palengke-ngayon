import { sql } from "drizzle-orm";
import * as s from "drizzle-orm/sqlite-core";
import { commodities } from "./commodities";

export const dailyPrices = s.sqliteTable(
  "daily_prices",
  {
    id: s.text("id").primaryKey(),
    createdAt: s
      .integer("created_at", { mode: "timestamp" })
      .default(sql`(cast(unixepoch('second') as integer))`)
      .notNull(),
    updatedAt: s
      .integer("updated_at", { mode: "timestamp" })
      .default(sql`(cast(unixepoch('second') as integer))`)
      .notNull(),
    priceDate: s.integer("price_date", { mode: "timestamp" }).notNull(),
    price: s.real("price").notNull(),
    commodityId: s
      .text("commodity_id")
      .notNull()
      .references(() => commodities.id),
  },
  (t) => [s.index("daily_prices_commodity_id_idx").on(t.commodityId)],
);
