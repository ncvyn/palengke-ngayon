CREATE TABLE `categories` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commodities` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`category_id` text NOT NULL,
	CONSTRAINT `fk_commodities_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_prices` (
	`id` text PRIMARY KEY,
	`created_at` integer DEFAULT (cast(unixepoch('second') as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('second') as integer)) NOT NULL,
	`price_date` integer NOT NULL,
	`price` real NOT NULL,
	`commodity_id` text NOT NULL,
	CONSTRAINT `fk_daily_prices_commodity_id_commodities_id_fk` FOREIGN KEY (`commodity_id`) REFERENCES `commodities`(`id`)
);
--> statement-breakpoint
CREATE INDEX `commodities_category_id_idx` ON `commodities` (`category_id`);--> statement-breakpoint
CREATE INDEX `daily_prices_commodity_id_idx` ON `daily_prices` (`commodity_id`);