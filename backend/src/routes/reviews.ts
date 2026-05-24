import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable } from "@workspace/db";
import { CreateReviewBody } from "@workspace/api-zod";

const router = Router();

router.get("/reviews", async (_req, res) => {
  try {
    const rows = await db.select().from(reviewsTable).orderBy(reviewsTable.createdAt);
    res.json(rows.map(r => ({
      id: r.id,
      customerName: r.customerName,
      rating: r.rating,
      comment: r.comment,
      dressId: r.dressId,
      createdAt: r.createdAt.toISOString(),
    })));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const parsed = CreateReviewBody.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
    const { customerName, rating, comment, dressId } = parsed.data;
    const [row] = await db.insert(reviewsTable).values({
      customerName,
      rating,
      comment,
      dressId: dressId ?? null,
    }).returning();
    res.status(201).json({
      id: row.id,
      customerName: row.customerName,
      rating: row.rating,
      comment: row.comment,
      dressId: row.dressId,
      createdAt: row.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create review" });
  }
});

export default router;
