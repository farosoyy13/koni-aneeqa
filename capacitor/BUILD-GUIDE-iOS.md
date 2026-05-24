# دليل بناء تطبيق iOS لمتجر كوني أنيقة
## باستخدام Capacitor

---

## المتطلبات قبل البدء

| المتطلب | التفاصيل |
|---|---|
| جهاز Mac | macOS 13 (Ventura) أو أحدث |
| Xcode | الإصدار 15 أو أحدث (من App Store) |
| Node.js | الإصدار 18 أو أحدث |
| pnpm | `npm install -g pnpm` |
| CocoaPods | `sudo gem install cocoapods` |
| حساب Apple Developer | developer.apple.com — 99 دولار سنوياً |

---

## خطوات التثبيت والبناء

### الخطوة 1: نسخ المشروع على الـ Mac

```bash
# انقل ملفات المشروع إلى الـ Mac أو استخدم git
git clone YOUR_REPO_URL koni-aneeqa
cd koni-aneeqa
```

### الخطوة 2: تثبيت التبعيات

```bash
# تثبيت تبعيات المشروع الرئيسي
pnpm install

# الانتقال لمجلد Capacitor وتثبيت تبعياته
cd capacitor
npm install
```

### الخطوة 3: بناء نسخة الإنتاج من الموقع

```bash
# من مجلد capacitor
cd ..
pnpm --filter @workspace/koni-aneeqa run build
```

سيُنشئ هذا الأمر مجلد `artifacts/koni-aneeqa/dist/public`

### الخطوة 4: إضافة منصة iOS وتهيئة Capacitor

```bash
cd capacitor

# إضافة iOS platform
npx cap add ios

# مزامنة الكود مع iOS
npx cap sync ios
```

### الخطوة 5: تثبيت CocoaPods Dependencies

```bash
cd ios/App
pod install
cd ../..
```

### الخطوة 6: تعديل Info.plist

افتحي الملف `ios/App/App/Info.plist` في Xcode أو محرر نصي وأضيفي محتوى ملف `ios-config/Info.plist.additions.xml`

### الخطوة 7: استبدال AppDelegate

انسخي محتوى `ios-config/AppDelegate.swift` إلى `ios/App/App/AppDelegate.swift`

### الخطوة 8: فتح المشروع في Xcode

```bash
npx cap open ios
```

### الخطوة 9: إعداد Signing في Xcode

1. افتحي `App` في Xcode
2. اختاري Target > Signing & Capabilities
3. أضيفي Apple Developer Team
4. تأكدي من Bundle Identifier: `com.konianeeqa.store`

### الخطوة 10: بناء ملف IPA

#### طريقة Archive (للنشر على App Store):
```
Xcode > Product > Archive
```
بعد الانتهاء:
```
Window > Organizer > Distribute App > App Store Connect
```

#### طريقة للتثبيت المباشر (Ad-Hoc):
```
Xcode > Product > Archive > Distribute App > Ad Hoc
```
سيُنشئ ملف `.ipa` جاهز للتثبيت عبر TestFlight أو Diawi

---

## إضافة أيقونة التطبيق

ضعي صورة بحجم **1024×1024px** بدون زوايا دائرية وسمّيها `AppIcon.png`

ثم في Xcode:
1. افتحي `Assets.xcassets`
2. اسحبي الصورة إلى AppIcon

---

## إعداد Splash Screen

1. أضيفي صورة `splash.png` بحجم **2732×2732px**
2. في `capacitor.config.ts` تأكدي من وجود إعدادات SplashScreen

---

## متطلبات App Store (قبل الرفع)

- [ ] Privacy Policy URL (سياسة الخصوصية)
- [ ] App description باللغة العربية والإنجليزية
- [ ] Screenshots (6.5 inch iPhone, 12.9 inch iPad)
- [ ] App icon 1024x1024 بدون شفافية
- [ ] Bundle ID مسجل في Apple Developer Portal
- [ ] In-App Purchase إعداد (إذا أردتِ الدفع الحقيقي)

---

## تحديث التطبيق مستقبلاً

```bash
# عند تغيير الكود
pnpm --filter @workspace/koni-aneeqa run build
cd capacitor
npx cap sync ios
npx cap open ios
# ثم Archive من Xcode من جديد
```

---

## ملاحظات مهمة

- **الدفع الحقيقي**: حالياً الدفع محاكى (mock). لتفعيل الدفع الحقيقي عبر iOS ستحتاجين:
  - تكامل مع Stripe أو PayTabs (بوابة سعودية)
  - أو Apple Pay عبر `@capacitor/stripe`
  
- **الإشعارات**: يمكن إضافة Push Notifications لاحقاً عبر `@capacitor/push-notifications`

- **اللغة العربية**: تم تفعيل RTL في AppDelegate.swift تلقائياً

---

*أُعدَّ هذا الدليل لمتجر كوني أنيقة — جميع الحقوق محفوظة*
