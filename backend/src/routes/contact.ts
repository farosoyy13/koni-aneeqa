import { Router } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const parsed = SubmitContactBody.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
    const { name, message, email, phone } = parsed.data;
    await db.insert(contactsTable).values({
      name,
      message,
      email: email ?? null,
      phone: phone ?? null,
    });
    res.json({ success: true, message: "تم إرسال رسالتك بنجاح، سنتواصل معك قريباً" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit contact" });
  }
});

export default router;
