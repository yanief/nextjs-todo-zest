export const ar = {
  common: {
    appName: "تطبيق المهام بـ Next.js",
    caseStudyTag: "دراسة حالة",
    language: "اللغة",
    languages: {
      en: "English",
      ar: "العربية",
    },
    themeToggle: "تبديل النمط",
    buttons: {
      add: "إضافة",
      back: "عودة",
      delete: "حذف",
      save: "حفظ",
      previous: "السابق",
      next: "التالي",
      confirm: "تأكيد",
      cancel: "إلغاء",
    },
    aria: {
      loading: "جارٍ التحميل",
      updating: "جارٍ التحديث…",
      toggle: {
        markActive: "تحديد كمهمة نشطة",
        markCompleted: "تحديد كمهمة منجزة",
      },
    },
  },
  landing: {
    intro: [
      "تم بناء هذا المشروع كدراسة حالة للتوظيف في الواجهات الأمامية، ويعرض كيفية دمج Next.js App Router مع طبقة بيانات مرنة تدعمها React Query و Zod و ts-pattern.",
      "توفر تجربة المهام تدفقاً قريباً من الواقع مع تحديثات متفائلة وتخزيناً دائماً للذاكرة المؤقتة ومشاركة عوامل التصفية عبر معلمات الرابط.",
    ],
    cards: {
      projectOverview: {
        title: "عن المشروع",
        items: [
          "إنشاء وقراءة وتحديث وحذف المهام مع تحديثات متفائلة",
          "بحث وتصفية وترقيم الصفحات عبر معلمات الرابط",
          "صفحة تفاصيل وتحرير مع تأكيد قبل الحذف",
          "التحقق عبر Zod و ts-pattern",
        ],
      },
      techStack: {
        title: "التقنيات المستخدمة",
        items: [
          "Next.js App Router + React Query",
          "Zustand لإدارة واجهة المستخدم",
          "Zod + ts-pattern + react-hook-form",
          "Tailwind CSS مع نمط داكن",
        ],
      },
      architecture: {
        title: "ملاحظات معمارية",
        items: [
          "طبقة مستودع فوق localStorage غير المتزامن",
          "نمذجة Result<T, E> مع تطابق شامل",
          "مفاتيح React Query مرتبطة بحالة الفلاتر",
          "بنية مجلدات موجهة بالميزات",
        ],
      },
    },
    cta: "افتح تطبيق المهام",
    footer: {
      text: "تم بناؤه من أجل دراسة حالة التوظيف — ",
      repo: "مستودع GitHub",
    },
  },
  controls: {
    languageLabel: "اللغة",
    themeLabel: "النمط",
  },
  todos: {
    page: {
      title: "المهام",
      description: "أنشئ مهامك ونظمها وشارك حالة التصفية عبر الرابط.",
      sectionTitle: "مهامك",
    },
    detailPage: {
      sectionTitle: "تفاصيل المهمة",
    },
    filters: {
      searchLabel: "بحث",
      searchPlaceholder: "ابحث عن مهام...",
      searchHelp: "صفِّ حسب العنوان. يتم التحديث فوراً.",
      statusLabel: "الحالة",
      options: {
        all: "الكل",
        active: "نشطة",
        completed: "منجزة",
      },
    },
    form: {
      ariaLabel: "نموذج إنشاء مهمة",
      label: "مهمة جديدة",
      placeholder: "مثال: شراء مستلزمات المنزل",
      helper: 'اضغط على "إضافة" لإنشاء المهمة. لا يمكن أن يكون العنوان فارغاً.',
      error: "العنوان مطلوب",
    },
    list: {
      emptyTitle: "لا توجد مهام بعد.",
      emptyDescription: "استخدم النموذج أعلاه لإضافة أول مهمة لك.",
      pagination: "الصفحة {current} من {total}",
    },
    detail: {
      titleLabel: "العنوان",
      helper: "حدّث العنوان ثم اضغط على حفظ.",
      deleteTitle: "حذف المهمة؟",
      deleteDescription: "هذا الإجراء لا يمكن التراجع عنه.",
    },
    errors: {
      list: "تعذّر تحميل المهام",
      detail: "تعذّر تحميل المهمة",
    },
  },
  toasts: {
    createSuccess: "تم إنشاء المهمة",
    createError: "فشل في إنشاء المهمة",
    updateSuccess: "تم تحديث المهمة",
    updateError: "فشل في تحديث المهمة",
    deleteSuccess: "تم حذف المهمة",
    deleteError: "فشل في حذف المهمة",
  },
  errorBoundary: {
    title: "حدث خطأ ما",
    message: "تعذّر تحميل المهام. حاول مرة أخرى.",
    retry: "إعادة المحاولة",
  },
  loading: {
    title: "المهام",
    message: "جارٍ تحميل المهام…",
  },
};
