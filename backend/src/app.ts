import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger as honoLogger } from "hono/logger";
import router from "./routes";

// 1. إنشاء تطبيق الخلفية
const app = new Hono();

// 2. تفعيل نظام تسجيل العمليات
app.use("*", honoLogger());

// 3. تفعيل درع الحماية
app.use("*", secureHeaders({
  xXssProtection: "1; mode=block",
  xFrameOptions: "DENY",
  strictTransportSecurity: "max-age=63072000; includeSubDomains; preload"
}));

// 4. تفعيل نظام CORS
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"]
}));

// 5. توجيه المسارات
app.route("/api", router);

// 6. التصدير النهائي
export default app;