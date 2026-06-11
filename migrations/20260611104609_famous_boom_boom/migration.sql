CREATE TABLE `links` (
	`id` text PRIMARY KEY,
	`link` text NOT NULL,
	`date` integer NOT NULL UNIQUE
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_daily_prices` (
	`id` text PRIMARY KEY,
	`created_at` integer DEFAULT (cast(unixepoch('second') as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('second') as integer)) NOT NULL,
	`price` real NOT NULL,
	`commodity_id` text NOT NULL,
	`price_date` integer NOT NULL,
	CONSTRAINT `fk_daily_prices_commodity_id_commodities_id_fk` FOREIGN KEY (`commodity_id`) REFERENCES `commodities`(`id`),
	CONSTRAINT `fk_daily_prices_price_date_links_date_fk` FOREIGN KEY (`price_date`) REFERENCES `links`(`date`)
);
--> statement-breakpoint
INSERT INTO `__new_daily_prices`(`id`, `created_at`, `updated_at`, `price_date`, `price`, `commodity_id`) SELECT `id`, `created_at`, `updated_at`, `price_date`, `price`, `commodity_id` FROM `daily_prices`;--> statement-breakpoint
DROP TABLE `daily_prices`;--> statement-breakpoint
ALTER TABLE `__new_daily_prices` RENAME TO `daily_prices`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `daily_prices_commodity_id_idx` ON `daily_prices` (`commodity_id`);--> statement-breakpoint
CREATE INDEX `daily_prices_price_date_idx` ON `daily_prices` (`price_date`);