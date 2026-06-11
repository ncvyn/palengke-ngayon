import { sql } from "drizzle-orm";
import * as s from "drizzle-orm/sqlite-core";
import { commodities } from "./commodities";
import { links } from "./links";

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
    price: s.real("price").notNull(),
    commodityId: s
      .text("commodity_id")
      .notNull()
      .references(() => commodities.id),
    priceDate: s
      .integer("price_date", { mode: "timestamp" })
      .notNull()
      .references(() => links.date),
  },
  (t) => [
    s.index("daily_prices_commodity_id_idx").on(t.commodityId),
    s.index("daily_prices_price_date_idx").on(t.priceDate),
  ],
);
