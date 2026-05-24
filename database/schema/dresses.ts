import { pgTable, serial, text, numeric, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const dressesTable = pgTable("dresses", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(), // 'evening' | 'soft'
  imageUrl: text("image_url").notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull().default(["XS", "S", "M", "L", "XL"]),
  colors: jsonb("colors").$type<string[]>().notNull(),
  description: text("description").notNull(),
  isNew: boolean("is_new").notNull().default(false),
  rating: numeric("rating", { precision: 3, scale: 1 }),
  reviewCount: integer("review_count").default(0),
});

export const insertDressSchema = createInsertSchema(dressesTable).omit({ id: true });
export type InsertDress = z.infer<typeof insertDressSchema>;
export type Dress = typeof dressesTable.$inferSelect;
