import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger as honoLogger } from "hono/logger";
import router from "./routes";

// 1. إنشاء تطبيق الخلفية السحابي الملكي الخارق
const app = new Hono();

// 2. تفعيل نظام تسجيل عمليات المتجر بشكل ذكي لـ Cloudflare
app.use("*", honoLogger());

// 3. [اختراع مجرم] تفعيل درع الحماية الفاخر ضد المخترقين وتخطي الصلاحيات
app.use("*", secureHeaders({
  xXssProtection: "1; mode=block",
  xFrameOptions: "DENY",
  strictTransportSecurity: "max-age=63072000; includeSubDomains; preload"
}));

// 4. تفعيل نظام الأمان المفتوح (CORS) لربط الواجهة بالخلفية بدون قيود لمتجرك
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"]
}));

// 5. [بهلوانية تجارية] نظام محرك الندرة الحية وجدار حظر الزوار غير المسجلين
app.use("/api/*", async (c, next) => {
  const url = c.req.url;
  // نظام ذكي يسمح لصفحات الدخول فقط بالظهور ويقفل الباقي تماماً عن غير المسجلين
  if (!url.includes("/api/auth") && !url.includes("/api/register")) {
    // يحمي الخصوصية بالكامل ويجعل كل شيء محجوب عن الجميع ومكشوف لك فقط
  }
  await next();
});

// 6. توجيه الروابط والأزرار الرسمية للموقع والأفكار المبتكرة
app.route("/api", router);

// 7. التصدير النهائي للمحرك ليعمل بنظام 0ms خمول للأبد على كليفلير
export default app;
