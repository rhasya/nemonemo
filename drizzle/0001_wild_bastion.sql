ALTER TABLE "problems" ALTER COLUMN "width" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "problems" ALTER COLUMN "height" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "problems" ADD COLUMN "value" text;--> statement-breakpoint
ALTER TABLE "problems" DROP COLUMN IF EXISTS "horizontal";--> statement-breakpoint
ALTER TABLE "problems" DROP COLUMN IF EXISTS "vertical";