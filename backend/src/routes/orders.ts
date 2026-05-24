import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable } from "@workspace/db";
import { CreateOrderBody } from "@workspace/api-zod";

const router = Router();

router.post("/orders", async (req, res) => {
  try {
    const parsed = CreateOrderBody.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
    const { customerName, phone, address, paymentMethod, totalAmount, items } = parsed.data;
    const [row] = await db.insert(ordersTable).values({
      customerName,
      phone,
      address: address ?? null,
      paymentMethod,
      totalAmount: String(totalAmount),
      status: "confirmed",
      items,
    }).returning();
    res.status(201).json({
      id: row.id,
      customerName: row.customerName,
      totalAmount: Number(row.totalAmount),
      status: row.status,
      paymentMethod: row.paymentMethod,
      createdAt: row.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;
