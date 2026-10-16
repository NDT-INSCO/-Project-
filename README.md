# INSCO — الموقع الإلكتروني

واجهة React مبنية باستخدام Vite، مع خادم Express لخدمات الذكاء الاصطناعي والصوت.

## التشغيل محليًا

استخدم Node.js 24 (بحد أدنى 24.12.0، بسبب متطلبات Firebase) وnpm:

```bash
nvm install
nvm use
npm ci
cp .env.example .env
npm run dev
```

الخادم يعمل افتراضيًا على المنفذ `3000`. ضع `GEMINI_API_KEY` في ملف `.env` على الخادم فقط؛ لا ترفعه إلى GitHub ولا تحوله إلى متغير يبدأ بـ `VITE_`.

تم اعتماد `package-lock.json` بدلًا من `bun.lock` لتوحيد تثبيت المكتبات محليًا وفي GitHub Actions باستخدام `npm ci`.

## النشر على GitHub Pages

1. ادمج تغييرات إصلاح النشر في فرع `main`.
2. افتح المستودع على GitHub ثم **Settings → Pages → Build and deployment**.
3. غيّر **Source** إلى **GitHub Actions**، بدلًا من النشر من `main /docs`. مجلد `docs` غير موجود ولا يحتوي على نسخة مبنية من الموقع.
4. من **Actions → Build and deploy to GitHub Pages** شغّل **Run workflow** على `main` إذا لم يبدأ النشر تلقائيًا بعد الدمج، أو إذا سبق التشغيل تغيير إعداد Pages.
5. انتظر نجاح مرحلتي `build` و`deploy`، ثم افتح:

   https://ndt-insco.github.io/-Project-/

الـ workflow يثبت المكتبات، يفحص TypeScript، يبني المشروع باستخدام `npm run build`، ثم ينشر مجلد `dist` مباشرةً. كل دفع لاحق إلى `main` يعيد النشر تلقائيًا. طلبات الدمج تفحص البناء فقط ولا تنشر الموقع.

إعداد `base: './'` في Vite يجعل روابط JavaScript وCSS نسبية، بحيث تعمل داخل مسار المستودع `/-Project-/` وكذلك عند استخدام نطاق مخصص. التنقل الحالي يستخدم روابط `#`، لذا لا يحتاج إلى إعداد إعادة كتابة المسارات على Pages.

### حدود GitHub Pages

GitHub Pages يستضيف الملفات الثابتة فقط ولا يشغّل `server.ts`:

- واجهة الموقع والأقسام الثابتة يمكن نشرها على Pages.
- طلبات `/api/ai/*` والاتصال الصوتي عبر `/live` **لن تعمل على Pages وحده**. لتشغيل كل الوظائف، استضف التطبيق كاملًا على خدمة تدعم Node.js وWebSocket، أو أضف لاحقًا إعدادًا لربط الواجهة بخادم منفصل مع إعداد CORS المناسب.
- Firebase يتصل مباشرة من المتصفح ويعتمد على إعدادات المشروع وقواعد Firestore. أضف نطاق الموقع إلى **Firebase Authentication → Settings → Authorized domains** عند استخدام طرق تسجيل الدخول التي تتطلب نطاقًا معتمدًا.

للتشغيل الكامل على خادم Node.js، بعد إعداد متغيرات البيئة:

```bash
npm ci
npm run build
NODE_ENV=production npm start
```

لا تحتاج إلى مفتاح Gemini لبناء الواجهة أو نشرها على Pages.

## التحقق قبل النشر

```bash
npm ci
npm run lint
npm run build
npm run preview -- --host 0.0.0.0
```

افتح عنوان خادم المعاينة للتأكد من تحميل الواجهة. لاختبار مسار GitHub Pages نفسه، قدّم مجلد `dist` تحت `/-Project-/` على خادم ملفات ثابتة وتحقق من تحميل JavaScript وCSS. مجلد `dist` ناتج بناء مستبعد من Git؛ يرفعه GitHub Actions كأثر نشر، وليس كمصدر داخل المستودع.
