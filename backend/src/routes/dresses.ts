import { Router } from "express";
import { db } from "@workspace/db";
import { dressesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListDressesQueryParams, GetDressParams } from "@workspace/api-zod";

const router = Router();

router.get("/dresses", async (req, res) => {
  try {
    const query = ListDressesQueryParams.safeParse(req.query);
    let rows;
    if (query.success && query.data.category) {
      rows = await db.select().from(dressesTable).where(eq(dressesTable.category, query.data.category));
    } else {
      rows = await db.select().from(dressesTable);
    }
    res.json(rows.map(formatDress));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dresses" });
  }
});

router.get("/dresses/featured", async (_req, res) => {
  try {
    const rows = await db.select().from(dressesTable).where(eq(dressesTable.isNew, true));
    res.json(rows.map(formatDress));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch featured dresses" });
  }
});

router.get("/dresses/:id", async (req, res) => {
  try {
    const params = GetDressParams.safeParse({ id: Number(req.params.id) });
    if (!params.success) return res.status(400).json({ error: "Invalid id" });
    const [row] = await db.select().from(dressesTable).where(eq(dressesTable.id, params.data.id));
    if (!row) return res.status(404).json({ error: "Dress not found" });
    res.json(formatDress(row));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dress" });
  }
});

function formatDress(row: typeof dressesTable.$inferSelect) {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.nameAr,
    price: Number(row.price),
    category: row.category,
    imageUrl: row.imageUrl,
    sizes: row.sizes as string[],
    colors: row.colors as string[],
    description: row.description,
    isNew: row.isNew,
    rating: row.rating ? Number(row.rating) : null,
    reviewCount: row.reviewCount,
  };
}

export default router;
