دليل بناء تطبيق iOS لمتجر أناقة CHIC باستخدام Capacitor
المتطلبات قبل البدء
المتطلب | التفاصيل
جهاز Mac | macOS 13 (Ventura) أو أحدث
Xcode | الإصدار 15 أو أحدث (من App Store)
Node.js | الإصدار 18 أو أحدث
pnpm | npm install -g pnpm
CocoaPods | sudo gem install cocoapods
حساب Apple Developer | developer.apple.com — 99 دولار سنوياً
خطوات التثبيت والبناء
الخطوة 1: نسخ المشروع على الـ Mac
git clone YOUR_REPO_URL chic-aniqa
cd chic-aniqa
الخطوة 2: تثبيت التبعيات
تثبيت تبعيات المشروع الرئيسي
pnpm install
الانتقال لمجلد Capacitor وتثبيت تبعياته
cd capacitor
npm install
الخطوة 3: بناء نسخة الإنتاج من الموقع
من مجلد capacitor
cd ..
pnpm --filter @workspace/chic-aniqa run build
سيُنشئ هذا الأمر مجلد artifacts/chic-aniqa/dist/public
الخطوة 4: إضافة منصة iOS وتهيئة Capacitor
cd capacitor
إضافة iOS platform
npx cap add ios
مزامنة الكود مع iOS
npx cap sync ios
الخطوة 5: تثبيت CocoaPods Dependencies
cd ios/App
pod install
cd ../..
الخطوة 6: تعديل Info.plist
افتح الملف ios/App/App/Info.plist في Xcode أو محرر نصي وأضف محتوى ملف ios-config/Info.plist.additions.xml
الخطوة 7: استبدال AppDelegate
انسخ محتوى ios-config/AppDelegate.swift إلى ios/App/App/AppDelegate.swift
الخطوة 8: فتح المشروع في Xcode
npx cap open ios
الخطوة 9: إعداد Signing في Xcode
1. افتح App في Xcode
2. اختر Target ثم Signing و Capabilities
3. أضف Apple Developer Team
4. تأكد من Bundle Identifier الحالي والمحدث: com.chicaniqa.store
الخطوة 10: بناء ملف IPA
طريقة Archive (للنشر على App Store):
Xcode ثم Product ثم Archive
بعد الانتهاء:
Window ثم Organizer ثم Distribute App ثم App Store Connect
طريقة للتثبيت المباشر (Ad-Hoc):
Xcode ثم Product ثم Archive ثم Distribute App ثم Ad Hoc
سيُنشئ ملف .ipa جاهز للتثبيت عبر TestFlight أو Diawi
إضافة أيقونة التطبيق
ضع صورة بحجم 1024×1024px بدون زوايا دائرية وسمِّها AppIcon.png
ثم في Xcode:
1. افتح Assets.xcassets
2. اسحب الصورة إلى AppIcon
إعداد Splash Screen
1. أضف صورة splash.png بحجم 2732×2732px
2. في capacitor.config.ts تأكد من وجود إعدادات SplashScreen الجديدة
متطلبات App Store (قبل الرفع)
 Privacy Policy URL (سياسة الخصوصية)
 App description باللغة العربية والإنجليزية للهوية الجديدة
 Screenshots لـ 6.5 inch iPhone و 12.9 inch iPad
 App icon 1024x1024 بدون شفافية واضحة
 Bundle ID مسجل في Apple Developer Portal باسم com.chicaniqa.store
 In-App Purchase إعداد (إذا أردت الدفع الحقيقي)
تحديث التطبيق مستقبلاً
pnpm --filter @workspace/chic-aniqa run build
cd capacitor
npx cap sync ios
npx cap open ios
ثم Archive من Xcode من جديد
ملاحظات مهمة
 الدفع الحقيقي: حالياً الدفع محاكى (mock). لتفعيل الدفع الحقيقي عبر iOS ستحتاج:
 تكامل مع Stripe أو PayTabs (بوابة سعودية)
 أو Apple Pay عبر كود ومكتبة @capacitor/stripe
 الإشعارات: يمكن إضافة Push Notifications لاحقاً عبر مكتبة @capacitor/push-notifications
 اللغة العربية: تم تفعيل RTL في ملف AppDelegate.swift تلقائياً
الدليل لمتجر أناقة CHIC – جميع الحقوق محفوظة

