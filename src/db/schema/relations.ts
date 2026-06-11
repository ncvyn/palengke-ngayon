import { defineRelations } from "drizzle-orm";
import { dailyPrices } from "./daily_prices";
import { categories } from "./categories";
import { commodities } from "./commodities";
import { links } from "./links";

export const relations = defineRelations(
  {
    categories,
    commodities,
    dailyPrices,
    links,
  },
  (r) => ({
    categories: {
      commodity: r.many.commodities(),
    },

    commodities: {
      category: r.one.categories({
        from: r.commodities.categoryId,
        to: r.categories.id,
      }),
      dailyPrice: r.many.dailyPrices(),
    },

    dailyPrices: {
      commodity: r.one.commodities({
        from: r.dailyPrices.commodityId,
        to: r.commodities.id,
      }),
      date: r.one.links({
        from: r.dailyPrices.priceDate,
        to: r.links.date,
      }),
    },
  }),
);
