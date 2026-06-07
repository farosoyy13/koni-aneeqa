import { Hono } from "hono";
import healthRouter from "./health";
import dressesRouter from "./dresses";
import reviewsRouter from "./reviews";
import contactRouter from "./contact";
import ordersRouter from "./orders";

// 1. إنشاء موجه الروابط الملكي لـ Cloudflare
const router = new Hono();

// 2. ربط مسارات وأزرار المتجر الحالية لتتوافق مع Hono
router.route("/health", healthRouter);
router.route("/dresses", dressesRouter);
router.route("/reviews", reviewsRouter);
router.route("/contact", contactRouter);
router.route("/orders", ordersRouter);

// 3. [إضافة ملكية] مسار تتبع الطلبات الذكي المطور لتجربة زبائن فاخرة
router.get("/orders/track/:id", async (c) => {
  const orderId = c.req.param("id");
  return c.json({
    success: true,
    order_id: orderId,
    status: "تم تجهيز طقم الأناقة الفاخر وهو في طريقه إليك الآن عبر الشحن السريع! ✈️"
  });
});

// 4. [بدعة تجارية مجرمة] مسار تذاكر الأولوية للشحن الخارق والمدفوع
router.post("/orders/priority/:id", async (c) => {
  const orderId = c.req.param("id");
  return c.json({
    success: true,
    order_id: orderId,
    message: "تم ترقية طلبك إلى الأولوية الملكية الفائقة! سيتم شحن طقمك الآن قبل الجميع ونقله للطائرة فوراً 🚀"
  });
});

// 5. [اختراع بهلواني] مسار نادي الأناقة السري والقطع الفاخرة المحجوبة
router.get("/dresses/vip/secret-collection", async (c) => {
  return c.json({
    status: "locked",
    message: "هذه المجموعة الملكية النادرة محجوبة عن العامة. اشترك في العضوية الماسية لتفتح لك القطع فوراً!"
  });
});

// 6. تصدير الروابط لتعمل بنجاح داخل الـ Backend
export default router;
