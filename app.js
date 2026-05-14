const state = {
  lang: "en",
  route: "splash",

  onboardingId: "problem",
  authTab: "signin",
  signupStep: 1,

  form: {},
  errors: {},

  assessmentIndex: 0,
  assessmentAnswers: Array(24).fill(null),
  assessmentOtherAnswers: Array(24).fill(""),
  assessmentDone: false,

  analysisStep: 1,
  psychoIndex: 0,
  psychoAnswers: Array(12).fill(null),
  psychoDone: false,

  recsGenerated: false,

  tts: {
  enabled: true,     
  rate: 1,
  pitch: 1,
  volume: 1
},

  selectedMajorId: "",           
  selectedLevelId: 1,            
  majorHubTab: "community",    
  savedItems: [],

  currentUser: {
    id: "guest",
    username: "Guest",
    role: "Guest",
    universityId: "",
  },
  userProfile: {
    educationLevel: "",
    location: "",
    interests: [],
    major: "",
    year: "",
    skills: "",
    timeAvailability: "",
  },
  notificationPrefs: {
    push: true,
    inApp: true,
    workshopAlerts: true,
    recordingAlerts: true,
  },
  universities: [],
  workshops: [],
  notifications: [],
  analytics: {
    workshopViews: {},
    registrations: {},
    attendance: {},
    recordingReach: {},
  },
  userEngagement: {
    registrations: [],
    attendance: [],
  },
  universityFilters: {
    governorate: "",
    major: "",
  },
  ui: {
    editingUniversity: false,
    editingWorkshopId: "",
  },
  selectedUniversityId: "",
  selectedWorkshopId: "",

  majorLevelUnlocked: {},


  game: {
    unlockedLevelByMajor: {},    
    completedByMajor: {},         
    starsByMajor: {},            
    xp: 0,
  },

  gameSession: null,
 

  environment: {
    internet: "",
    location: "",
    crisis: "",
    market: "",
    device: "",
  },
  majorHubTab: "community", // Set default tab to community
  communityPosts: [
    {
      id: 1,
      author: "Ahmed (High School)",
      role: "Student",
      major: "T", // Tech
      text: "Is Computer Science math-heavy at Birzeit? I'm worried about Calculus.",
      likes: 12,
      replies: [
        { 
          author: "Sarah (BZU CS Student)", 
          role: "University", 
          text: "It is challenging but manageable! You have 2 main Calculus courses. Focus on pre-calc now and you'll be fine." 
        }
      ]
    },
    {
      id: 2,
      author: "Layan (Grade 11)",
      role: "Student",
      major: "H", // Health
      text: "What is the difference between Nursing and Midwifery in terms of daily work?",
      likes: 5,
      replies: []
    }
  ],
  chat: {
    messages: [],
  },
};

const ASSESSMENT_PAGE_SIZE = 3;
const PSYCHO_PAGE_SIZE = 3;

// Module boundaries:
// - Data: static datasets + constants
// - RAG: retrieval + explanation helpers
// - Logic: scoring + recommendations
// - UI: render/bind only (no heavy logic)
// - Core: routing + persistence



const translations = {
  en: {
    brandSub: "AI Career Guidance",
    navHome: "Home",
    navDashboard: "Dashboard",
    navHow: "How it Works",
    navAuth: "Sign In",
    navAssess: "Assessment",
    navAI: "AI System",
    navAnalysis: "AI Analysis",
    navRecs: "Recommendations",
    splashTag: "Your future starts with the right choice",
    splashCta: "Start Now",
    howBadge: "How it works",
    howTitle: "FORSA guides every step",
    howSub:
      "From identifying the problem to reaching the right career path.",
    ctaStart: "Get Started",
    ctaSign: "Sign In",
    signInTitle: "Welcome back",
    signInSub: "Sign in to continue your journey.",
    signUpTitle: "Create your account",
    signUpSub: "Follow the steps to verify your identity and personalize your path.",
    tabSignIn: "Sign In",
    tabSignUp: "Sign Up",
    back: "Back",
    next: "Next",
    createAccount: "Create Account",
    assessmentTitle: "Career Interest Assessment",
    assessmentSub: "Answer a few questions to discover your interests.",
    assessmentNote: "There are no right or wrong answers.",
    finish: "Finish",
    continueAI: "Continue to AI Analysis",
    chooseAnswer: "Please choose one answer.",
    otherOption: "Other",
    otherPlaceholder: "Write your answer...",
    otherRequired: "Please write your answer.",
    ragBasedOnData: "Based on university programs, labor demand, and workshops.",
    ragDemandLabel: "Demand",
    ragProgramsLabel: "Programs",
    ragWorkshopsLabel: "Workshops",
    ragRemoteLabel: "Remote-friendly",
    ragLoadLabel: "Study load",
    ragYes: "Yes",
    ragNo: "No",
    chatTitle: "Ask AI Advisor",
    chatSub: "Answers are grounded in your results and data.",
    chatPlaceholder: "Ask about your results...",
    chatSend: "Send",
    chatQuickWhy: "Why was this major recommended?",
    chatQuickRisks: "What are the risks of this path?",
    chatQuickFit: "Is this suitable for my situation?",
    chatQuickAlternatives: "Are there alternative options?",
    chatQuickNext: "What should I do next?",
    analysisTitle: "AI Analysis",
    analysisSub: "Add psycho-cognitive and environment data to personalize results.",
    stepPsycho: "Step 1: Psycho-cognitive questions",
    stepEnv: "Step 2: Environmental constraints",
    psychoTitle: "Psycho-Cognitive Analysis",
    psychoSub: "Understand mental capacity and readiness for different career environments.",
    environmentTitle: "Environmental Constraints",
    environmentSub: "Context that shapes realistic, sustainable pathways.",
    generateRecs: "Generate Recommendations",
    analysisRequired: "Complete AI Analysis to unlock recommendations.",
    likert1: "Strongly Disagree",
    likert2: "Disagree",
    likert3: "Neutral",
    likert4: "Agree",
    likert5: "Strongly Agree",
    stressTolerance: "Stress Tolerance",
    focusStability: "Focus Stability",
    socialTolerance: "Social Demand Tolerance",
    resilienceIndex: "Resilience Index",
    low: "Low",
    medium: "Medium",
    high: "High",
    internetLabel: "Internet availability",
    locationLabel: "Location stability",
    crisisLabel: "Crisis exposure",
    marketLabel: "Market demand signals",
    deviceLabel: "Primary device",
    internetStable: "Stable",
    internetLimited: "Limited",
    internetOffline: "Offline/Low",
    locationUrban: "Urban/Stable",
    locationRemote: "Remote/Unstable",
    locationCrisis: "Crisis Zone",
    crisisYes: "Yes",
    crisisNo: "No",
    marketHigh: "High",
    marketMedium: "Medium",
    marketLow: "Low",
    deviceLaptop: "Laptop/Desktop",
    deviceMobile: "Mobile only",
    recommendationSummary: "AI Decision Summary",
    interestVectorTitle: "Cognitive Interest Vector",
    psychoVectorTitle: "Psychological Constraint Vector",
    envVectorTitle: "Environmental Constraints",
    disruptionIndex: "Disruption Index",
    fitScore: "Fit",
    riskScore: "Risk",
    adaptabilityScore: "Adaptability",
    architectureTitle: "AI Architecture",
    architectureSub: "Multi-layer AI decision system overview for judges.",
    purpose: "Purpose",
    dataCollected: "Data Collected",
    output: "Output",
    resultsTitle: "Your interest profile",
    topDomains: "Top domains",
    recMajors: "Recommended majors",
    recTitle: "Career Recommendations Personalized for You",
    recSub: "Explore career paths that match your skills and interests.",
    recBadge: "Career Paths",
    viewAll: "View All Career Paths",
    expectedSalary: "Expected Salary",
    marketDemand: "Market Demand",
    requiredSkills: "Required Skills",
    exploreMore: "Explore More",
    userTypeStep: "Step 1: Choose your user type",
    accountStep: "Step 2: Account information",
    university: "University Student",
    universityAdmin: "University Admin",
    highSchool: "High School Student",
    uniHint: "Use your university email or registration number",
    uniAdminHint: "Create and manage your institution profile",
    schoolHint: "Verify with national ID and grade level",
    username: "Username",
    password: "Password (min 8 chars, 1 number)",
    confirm: "Confirm Password",
    role: "Role (auto-filled)",
    uniEmail: "University Email (.edu)",
    regNumber: "Registration Number",
    uniName: "University Name",
    nationalId: "National ID Number",
    schoolName: "School Name",
    grade: "Grade Level",
    dashboardTitle: "Student Dashboard",
    dashboardSub: "Your personalized FORSA overview.",
    dashboardProfile: "Profile management",
    dashboardStatus: "Current career path status",
    dashboardLatestWorkshops: "Latest university workshops",
    dashboardNotifications: "Notifications",
    dashboardAssessmentResults: "AI assessment results (read-only)",
    dashboardRecommendations: "Recommendations",
    dashboardUniversities: "Universities & workshops",
    dashboardProgress: "Progress tracking",
    dashboardNoRecs: "Complete assessment to unlock AI results.",
    dashboardNoWorkshops: "No workshops available right now.",
    dashboardNoNotifications: "No new notifications.",
    profileMajor: "Major",
    profileYear: "Year",
    profileSkills: "Skills",
    profileTime: "Time availability",
    profileInternet: "Internet availability",
    profileLocation: "Location",
    profileUpdate: "Save changes",
    errorUserType: "Please choose your user type.",
    errorFix: "Please fix the highlighted fields to continue.",
    navUniversities: "Universities",
    navNotifications: "Notifications",
    navAnalytics: "Analytics",
    universitiesTitle: "University Profiles",
    universitiesSub: "Verified profiles and upcoming workshops across Palestine.",
    universityProfile: "University Profile",
    verified: "Verified",
    pendingVerification: "Pending verification",
    editProfile: "Edit Profile",
    createProfile: "Create Profile",
    saveChanges: "Save Changes",
    availableMajors: "Available majors",
    closestToYou: "Closest to you",
    noNearby: "No nearby universities.",
    showingAll: "Showing all universities instead.",
    targetAudience: "Target audience",
    contactInfo: "Contact info",
    workshopBoard: "Workshops & Events",
    createWorkshop: "Create Workshop",
    editWorkshop: "Edit Workshop",
    workshopDetails: "Workshop Details",
    workshopStatus: "Status",
    workshopLive: "Live",
    workshopUpcoming: "Upcoming",
    workshopFinished: "Finished",
    register: "Register",
    registered: "Registered",
    markAttended: "Mark Attended",
    attendanceRecorded: "Attendance recorded",
    notificationsTitle: "Smart Notifications",
    notificationsSub: "Control what you receive and review updates.",
    notificationsHint: "Notifications appear here when new updates are available.",
    notificationPrefs: "Notification preferences",
    profileSettings: "Profile settings",
    locationLabelUser: "Your location",
    educationLevel: "Education level",
    interestsLabel: "Major interests",
    noNotifications: "No notifications yet.",
    adminModeration: "Admin moderation",
    approve: "Approve",
    approved: "Approved",
    analyticsTitle: "Analytics & Impact",
    analyticsSub: "Track views, registrations, attendance, and Gaza reach.",
    privacyNote: "Personal data is hidden. Moderation is required before publishing.",
    recordingAvailable: "Recording available",
    recordingHidden: "Recording link hidden until workshop ends.",
  },
  ar: {
    brandSub: "إرشاد مهني بالذكاء الاصطناعي",
    navHome: "الرئيسية",
    navDashboard: "لوحة الطالب",
    navHow: "كيف يعمل",
    navAuth: "تسجيل الدخول",
    navAssess: "التقييم",
    navAI: "نظام الذكاء",
    navAnalysis: "تحليل الذكاء",
    navRecs: "التوصيات",
    splashTag: "مستقبلك يبدأ بالاختيار الصحيح",
    splashCta: "ابدأ الآن",
    howBadge: "كيف يعمل",
    howTitle: "FORSA ترافقك في كل خطوة",
    howSub: "من تحديد المشكلة إلى الوصول للمسار الصحيح.",
    ctaStart: "ابدأ الآن",
    ctaSign: "تسجيل الدخول",
    signInTitle: "أهلًا بعودتك",
    signInSub: "سجّل الدخول لمتابعة رحلتك.",
    signUpTitle: "أنشئ حسابك",
    signUpSub: "اتبع الخطوات لتأكيد هويتك وتخصيص مسارك.",
    tabSignIn: "تسجيل الدخول",
    tabSignUp: "إنشاء حساب",
    back: "رجوع",
    next: "التالي",
    createAccount: "إنشاء الحساب",
    assessmentTitle: "تقييم الميول المهنية",
    assessmentSub: "أجب عن بعض الأسئلة لاكتشاف ميولك.",
    assessmentNote: "لا توجد إجابات صحيحة أو خاطئة.",
    finish: "إنهاء",
    continueAI: "المتابعة لتحليل الذكاء",
    chooseAnswer: "يرجى اختيار إجابة واحدة.",
    otherOption: "أخرى",
    otherPlaceholder: "اكتب إجابتك هنا...",
    otherRequired: "يرجى كتابة إجابتك.",
    ragBasedOnData: "مبني على برامج الجامعات وطلب السوق والورش.",
    ragDemandLabel: "الطلب",
    ragProgramsLabel: "البرامج",
    ragWorkshopsLabel: "الورش",
    ragRemoteLabel: "قابل عن بُعد",
    ragLoadLabel: "ضغط الدراسة",
    ragYes: "نعم",
    ragNo: "لا",
    chatTitle: "اسأل مستشار الذكاء",
    chatSub: "الإجابات مبنية على نتائجك وبيانات حقيقية.",
    chatPlaceholder: "اسأل عن نتائجك...",
    chatSend: "إرسال",
    chatQuickWhy: "لماذا تم اختيار هذا التخصص؟",
    chatQuickRisks: "ما مخاطر هذا المسار؟",
    chatQuickFit: "هل يناسب وضعي؟",
    chatQuickAlternatives: "هل توجد بدائل؟",
    chatQuickNext: "ما الخطوة التالية؟",
    analysisTitle: "تحليل الذكاء",
    analysisSub: "أضف بيانات نفسية وبيئية لتخصيص النتائج.",
    stepPsycho: "الخطوة 1: أسئلة نفسية معرفية",
    stepEnv: "الخطوة 2: القيود البيئية",
    psychoTitle: "التحليل النفسي المعرفي",
    psychoSub: "فهم القدرة الذهنية والاستعداد للبيئات المهنية المختلفة.",
    environmentTitle: "القيود البيئية",
    environmentSub: "السياق الذي يشكّل المسارات الواقعية والمستدامة.",
    generateRecs: "إنشاء التوصيات",
    analysisRequired: "أكمل تحليل الذكاء لفتح التوصيات.",
    likert1: "أعارض بشدة",
    likert2: "أعارض",
    likert3: "محايد",
    likert4: "أوافق",
    likert5: "أوافق بشدة",
    stressTolerance: "تحمل الضغط",
    focusStability: "ثبات التركيز",
    socialTolerance: "تحمل المتطلبات الاجتماعية",
    resilienceIndex: "مؤشر المرونة",
    low: "منخفض",
    medium: "متوسط",
    high: "مرتفع",
    internetLabel: "توفر الإنترنت",
    locationLabel: "استقرار الموقع",
    crisisLabel: "التعرّض للأزمات",
    marketLabel: "إشارات طلب السوق",
    deviceLabel: "الجهاز الأساسي",
    internetStable: "مستقر",
    internetLimited: "محدود",
    internetOffline: "ضعيف/غير متاح",
    locationUrban: "حضري/مستقر",
    locationRemote: "بعيد/غير مستقر",
    locationCrisis: "منطقة أزمة",
    crisisYes: "نعم",
    crisisNo: "لا",
    marketHigh: "عالٍ",
    marketMedium: "متوسط",
    marketLow: "منخفض",
    deviceLaptop: "حاسوب/لابتوب",
    deviceMobile: "هاتف فقط",
    recommendationSummary: "ملخص قرار الذكاء",
    interestVectorTitle: "متجه الميول المعرفية",
    psychoVectorTitle: "متجه القيود النفسية",
    envVectorTitle: "القيود البيئية",
    disruptionIndex: "مؤشر الاضطراب",
    fitScore: "الملاءمة",
    riskScore: "المخاطر",
    adaptabilityScore: "قابلية التكيّف",
    architectureTitle: "معمارية الذكاء",
    architectureSub: "نظام قرار متعدد الطبقات مخصص للتقييم.",
    purpose: "الهدف",
    dataCollected: "البيانات المجمّعة",
    output: "المخرجات",
    resultsTitle: "ملف ميولك",
    topDomains: "أهم المجالات",
    recMajors: "التخصصات المقترحة",
    recTitle: "توصيات مهنية مخصصة لك",
    recSub: "استكشف المسارات التي تطابق مهاراتك واهتماماتك.",
    recBadge: "المسارات المهنية",
    viewAll: "عرض كل المسارات",
    expectedSalary: "الراتب المتوقع",
    marketDemand: "طلب السوق",
    requiredSkills: "المهارات المطلوبة",
    exploreMore: "استكشف المزيد",
    userTypeStep: "الخطوة 1: اختر نوع المستخدم",
    accountStep: "الخطوة 2: معلومات الحساب",
    university: "طالب جامعي",
    universityAdmin: "مسؤول جامعة",
    highSchool: "طالب مدرسة",
    uniHint: "استخدم البريد الجامعي أو رقم التسجيل",
    uniAdminHint: "إنشاء وإدارة بروفايل الجامعة",
    schoolHint: "التوثيق بالرقم الوطني والصف الدراسي",
    username: "اسم المستخدم",
    password: "كلمة المرور (8 أحرف على الأقل + رقم)",
    confirm: "تأكيد كلمة المرور",
    role: "الدور (تعبئة تلقائية)",
    uniEmail: "البريد الجامعي (.edu)",
    regNumber: "رقم التسجيل",
    uniName: "اسم الجامعة",
    nationalId: "الرقم الوطني",
    schoolName: "اسم المدرسة",
    grade: "الصف الدراسي",
    dashboardTitle: "لوحة الطالب",
    dashboardSub: "ملخصك الشخصي في FORSA.",
    dashboardProfile: "إدارة الملف الشخصي",
    dashboardStatus: "حالة المسار المهني الحالي",
    dashboardLatestWorkshops: "أحدث ورش الجامعات",
    dashboardNotifications: "الإشعارات",
    dashboardAssessmentResults: "نتائج التحليل (عرض فقط)",
    dashboardRecommendations: "التوصيات",
    dashboardUniversities: "الجامعات والورش",
    dashboardProgress: "تتبع التقدم",
    dashboardNoRecs: "أكمل التقييم لفتح نتائج الذكاء.",
    dashboardNoWorkshops: "لا توجد ورش متاحة حالياً.",
    dashboardNoNotifications: "لا توجد إشعارات جديدة.",
    profileMajor: "التخصص",
    profileYear: "السنة",
    profileSkills: "المهارات",
    profileTime: "الوقت المتاح",
    profileInternet: "توفر الإنترنت",
    profileLocation: "الموقع",
    profileUpdate: "حفظ التغييرات",
    errorUserType: "يرجى اختيار نوع المستخدم.",
    errorFix: "يرجى تصحيح الحقول المظللة للمتابعة.",
    navUniversities: "الجامعات",
    navNotifications: "الإشعارات",
    navAnalytics: "التحليلات",
    universitiesTitle: "بروفايلات الجامعات",
    universitiesSub: "بروفايلات موثقة وورش قادمة عبر فلسطين.",
    universityProfile: "بروفايل الجامعة",
    verified: "موثق",
    pendingVerification: "بانتظار التوثيق",
    editProfile: "تعديل البروفايل",
    createProfile: "إنشاء بروفايل",
    saveChanges: "حفظ التعديلات",
    availableMajors: "التخصصات المتاحة",
    closestToYou: "الأقرب لموقعك",
    noNearby: "لا توجد جامعات قريبة.",
    showingAll: "نعرض جميع الجامعات بدلًا من ذلك.",
    targetAudience: "الفئة المستهدفة",
    contactInfo: "معلومات التواصل",
    workshopBoard: "الورش والفعاليات",
    createWorkshop: "إنشاء ورشة",
    editWorkshop: "تعديل الورشة",
    workshopDetails: "تفاصيل الورشة",
    workshopStatus: "الحالة",
    workshopLive: "مباشر",
    workshopUpcoming: "قادمة",
    workshopFinished: "منتهية",
    register: "تسجيل",
    registered: "تم التسجيل",
    markAttended: "تأكيد الحضور",
    attendanceRecorded: "تم تسجيل الحضور",
    notificationsTitle: "إشعارات ذكية",
    notificationsSub: "تحكّم بما تستلمه وراجع التحديثات.",
    notificationsHint: "ستظهر الإشعارات هنا عند توفر تحديثات جديدة.",
    notificationPrefs: "تفضيلات الإشعارات",
    profileSettings: "إعدادات الملف",
    locationLabelUser: "موقعك",
    educationLevel: "المستوى التعليمي",
    interestsLabel: "اهتمامات التخصص",
    noNotifications: "لا توجد إشعارات بعد.",
    adminModeration: "إشراف الإدارة",
    approve: "اعتماد",
    approved: "معتمد",
    analyticsTitle: "التحليلات والأثر",
    analyticsSub: "تتبع المشاهدات والتسجيلات والحضور ووصول غزة.",
    privacyNote: "البيانات الشخصية مخفية. النشر يحتاج اعتماد الإدارة.",
    recordingAvailable: "التسجيل متاح",
    recordingHidden: "رابط التسجيل مخفي حتى انتهاء الورشة.",
  },
};

const onboardingSteps = [
  {
    id: "problem",
    image: "assets/problem.png",
    title: { en: "The Problem", ar: "المشكلة" },
    desc: {
      en: "Many students choose majors without clear guidance, leading to mismatch.",
      ar: "الكثير من الطلاب يختارون تخصصاتهم بدون توجيه واضح مما يؤدي لعدم التوافق.",
    },
  },
  {
    id: "solution",
    image: "assets/solution.png",
    title: { en: "The Solution", ar: "الحل" },
    desc: {
      en: "FORSA uses AI to match interests with real career paths.",
      ar: "FORSA يستخدم الذكاء الاصطناعي لمطابقة الاهتمامات مع المسارات المناسبة.",
    },
  },
  {
    id: "impact",
    image: "assets/impact.png",
    title: { en: "The Impact", ar: "الأثر" },
    desc: {
      en: "Students gain clarity, employable skills, and flexible learning.",
      ar: "يحصل الطلاب على وضوح، مهارات قابلة للتوظيف، وتعلم مرن.",
    },
  },
];

const domains = {
  T: { en: "Technology & Engineering", ar: "التقنية والهندسة" },
  S: { en: "Science & Research", ar: "العلوم والبحث" },
  B: { en: "Business & Management", ar: "إدارة الأعمال" },
  C: { en: "Creative & Design", ar: "الإبداع والتصميم" },
  H: { en: "Healthcare & Social", ar: "الصحة والمجتمع" },
  E: { en: "Education & Communication", ar: "التعليم والتواصل" },
};

const majors = {
  T: {
    en: [
      "Computer Science",
      "Software Engineering",
      "Information Technology",
      "Artificial Intelligence",
      "Cybersecurity",
    ],
    ar: [
      "علوم الحاسوب",
      "هندسة البرمجيات",
      "تقنية المعلومات",
      "الذكاء الاصطناعي",
      "الأمن السيبراني",
    ],
  },
  S: {
    en: ["Biology", "Chemistry", "Physics", "Data Science", "Environmental Science"],
    ar: ["الأحياء", "الكيمياء", "الفيزياء", "علم البيانات", "العلوم البيئية"],
  },
  B: {
    en: ["Business Administration", "MIS", "Accounting", "Marketing", "Entrepreneurship"],
    ar: ["إدارة الأعمال", "نظم المعلومات الإدارية", "المحاسبة", "التسويق", "ريادة الأعمال"],
  },
  C: {
    en: ["Graphic Design", "UI/UX Design", "Media & Digital Arts", "Architecture", "Animation"],
    ar: ["التصميم الجرافيكي", "تصميم واجهات وتجربة المستخدم", "الإعلام والفنون الرقمية", "العمارة", "الرسوم المتحركة"],
  },
  H: {
    en: ["Medicine", "Nursing", "Public Health", "Psychology", "Social Work"],
    ar: ["الطب", "التمريض", "الصحة العامة", "علم النفس", "الخدمة الاجتماعية"],
  },
  E: {
    en: ["Education", "Teaching", "Journalism", "Languages", "Public Relations"],
    ar: ["التربية", "التعليم", "الصحافة", "اللغات", "العلاقات العامة"],
  },
};


const majorExperience = {
  se: {
    story: {
      en: "Software Engineering is about building reliable products people depend on. You will design screens, write clean code, fix bugs, and work in teams.",
      ar: "هندسة البرمجيات تعني بناء منتجات يعتمد عليها الناس. ستصمم شاشات، تكتب كود نظيف، تصلح الأخطاء، وتعمل ضمن فريق.",
    },
    facts: {
      en: ["You build apps and systems", "You debug & improve performance", "You collaborate with a team"],
      ar: ["تبني تطبيقات وأنظمة", "تصحح الأخطاء وتحسن الأداء", "تتعاون مع فريق"],
    },
    levels: [
      {
        id: 1,
        title: { en: "Levels(1-4):help Code hero to save the princess ", ar: "المستويات(1-4) : ساعد بطل في انقاذ الأميرة " },
       
      },
    
    ],
    workshops: [
      {
        uni: "Bethlehem University",
        title: "Workshop: Intro to Web Development (HTML/CSS/JS)",
        date: "Season 2",
        mode: "Online",
        level: "Beginner",
      },
      {
        uni: "Birzeit University",
        title: "Workshop: Git + Team Collaboration",
        date: "Season 2",
        mode: "Hybrid",
        level: "Beginner",
      },
      {
        uni: "An-Najah University",
        title: "Workshop: Build a Prototype UI to Code",
        date: "Season 2",
        mode: "Online",
        level: "Intermediate",
      },
    ],
    videos: [
      {
        title: "Community Recording: Build Your First App",
        duration: "18:40",
        source: "FORSA Community",
      },
      {
        title: "Quick Guide: What is Software Engineering?",
        duration: "06:12",
        source: "FORSA",
      },
    ],
  },

  ds: {
    story: {
      en: "Data Science is about using data to find patterns, answer questions, and predict outcomes. You work with statistics, Python, and real datasets.",
      ar: "علم البيانات يعني استخدام البيانات لاكتشاف الأنماط والإجابة عن الأسئلة والتنبؤ بالنتائج. تعمل مع الإحصاء وبايثون وبيانات حقيقية.",
    },
    facts: {
      en: ["You analyze data", "You build simple models", "You communicate insights"],
      ar: ["تحلل البيانات", "تبني نماذج بسيطة", "تشرح النتائج"],
    },
    levels: [
      {
        id: 1,
        title: { en: "Level 1: Think Like a Data Scientist", ar: "المستوى 1: فكر كعالم بيانات" },
        task: {
          en: "You get a dataset about students. Write 5 questions you can answer with it.",
          ar: "لديك بيانات عن الطلاب. اكتب 5 أسئلة يمكن الإجابة عنها باستخدام البيانات.",
        },
      },
      {
        id: 2,
        title: { en: "Level 2: Clean the Data", ar: "المستوى 2: تنظيف البيانات" },
        task: {
          en: "Explain how you handle missing values + duplicates. Give 2 examples.",
          ar: "اشرح كيف تتعامل مع القيم الناقصة + التكرار. أعط مثالين.",
        },
      },
      {
        id: 3,
        title: { en: "Level 3: Simple Model", ar: "المستوى 3: نموذج بسيط" },
        task: {
          en: "Choose classification vs regression for a problem and explain why.",
          ar: "اختر تصنيف أم انحدار لمشكلة واشرح السبب.",
        },
      },
      {
        id: 4,
        title: { en: "Level 4: Present Insights", ar: "المستوى 4: عرض النتائج" },
        task: {
          en: "Create a short summary (3–5 bullets) of what the data tells the decision maker.",
          ar: "اكتب ملخصًا قصيرًا (3–5 نقاط) لما تخبر به البيانات صاحب القرار.",
        },
      },
    ],
    workshops: [
      {
        uni: "Bethlehem University",
        title: "Workshop: Intro to Data Analysis with Python",
        date: "Season 2",
        mode: "Online",
        level: "Beginner",
      },
      {
        uni: "Birzeit University",
        title: "Workshop: Statistics Basics for Data Science",
        date: "Season 2",
        mode: "Online",
        level: "Beginner",
      },
    ],
    videos: [
      {
        title: "Community Recording: Data Science Starter Path",
        duration: "22:10",
        source: "FORSA Community",
      },
    ],
  },

  ux: {
    story: {
      en: "UX/UI Design is about making digital products easy and enjoyable. You research users, design interfaces, and test prototypes.",
      ar: "تصميم UX/UI يعني جعل المنتجات الرقمية سهلة وممتعة. تبحث عن احتياجات المستخدمين وتبني واجهات وتجرب نماذج.",
    },
    facts: {
      en: ["You design user flows", "You create wireframes & prototypes", "You test with users"],
      ar: ["تصمم تدفقات المستخدم", "تصنع مخططات ونماذج", "تختبر مع المستخدمين"],
    },
    levels: [
      {
        id: 1,
        title: { en: "Level 1: User Journey", ar: "المستوى 1: رحلة المستخدم" },
        task: {
          en: "Create a simple user journey for a student using FORSA from start to recommendation.",
          ar: "اصنع رحلة بسيطة لطالب يستخدم فرصة من البداية حتى التوصية.",
        },
      },
      {
        id: 2,
        title: { en: "Level 2: Wireframe", ar: "المستوى 2: وايرفريم" },
        task: {
          en: "Draw (or describe) a wireframe for a workshop page with: title, date, save button, and video section.",
          ar: "ارسم (أو صف) وايرفريم لصفحة ورشة: عنوان، تاريخ، زر حفظ، وقسم فيديو.",
        },
      },
      {
        id: 3,
        title: { en: "Level 3: UI Consistency", ar: "المستوى 3: اتساق الواجهة" },
        task: {
          en: "List 5 UI rules to keep the app clean (spacing, typography, buttons...).",
          ar: "اكتب 5 قواعد UI للحفاظ على نظافة التصميم (مسافات، خطوط، أزرار...).",
        },
      },
      {
        id: 4,
        title: { en: "Level 4: Test & Improve", ar: "المستوى 4: اختبر وحسّن" },
        task: {
          en: "Write 3 quick questions you would ask a student after using the app to improve UX.",
          ar: "اكتب 3 أسئلة سريعة تسألها لطالب بعد استخدام التطبيق لتحسين UX.",
        },
      },
    ],
    workshops: [
      {
        uni: "Bethlehem University",
        title: "Workshop: UX Fundamentals + Portfolio Tips",
        date: "Season 2",
        mode: "Online",
        level: "Beginner",
      },
      {
        uni: "An-Najah University",
        title: "Workshop: Figma Prototyping Sprint",
        date: "Season 2",
        mode: "Hybrid",
        level: "Intermediate",
      },
    ],
    videos: [
      {
        title: "Community Recording: UX Case Study Walkthrough",
        duration: "15:55",
        source: "FORSA Community",
      },
    ],
  },
};
const storyGameData = {
  se: {
    scenes: [
      {
        bg: "assets/bg_mountains.jpg",
        chars: [
          { id: "hero", src: "assets/hero.png", x: 35, y: 72 },
          { id: "mentor", src: "assets/mentor.png", x: 55, y: 72 },
          { id: "bot", src: "assets/bot.png", x: 75, y: 72 },
        ],
        lines: [
          {
            speaker: { en: "Mentor", ar: "المرشد" },
            text: {
              en: "Your coding journey begins now. You’ll build apps people depend on — but you must learn the basics first.",
              ar: "رحلتك في البرمجة تبدأ الآن. ستبني تطبيقات يعتمد عليها الناس — لكن يجب أن تتعلم الأساسيات أولاً.",
            },
          },
          {
            speaker: { en: "Hero", ar: "البطل" },
            text: {
              en: "So… what does a Software Engineer do daily?",
              ar: "طيب… شو بعمل مهندس البرمجيات يوميًا؟",
            },
          },
          {
            speaker: { en: "Mentor", ar: "المرشد" },
            text: {
              en: "You design screens, write clean code, fix bugs, and work with a team.",
              ar: "بتصمم شاشات، تكتب كود نظيف، تصلح أخطاء، وتشتغل ضمن فريق.",
            },
          },
          {
            speaker: { en: "Bot", ar: "المساعد" },
            text: { en: "Quiz: Which one is a programming language?", ar: "سؤال: أي وحدة لغة برمجة؟" },
            quiz: {
              options: {
                en: ["Google Chrome", "Python", "Microsoft Word"],
                ar: ["جوجل كروم", "بايثون", "مايكروسوفت وورد"],
              },
              correctIndex: 1,
              explain: {
                en: "Python is a programming language. Chrome is a browser. Word is a writing app.",
                ar: "بايثون لغة برمجة. كروم متصفح. وورد برنامج كتابة.",
              },
            },
          },
          {
            speaker: { en: "Bot", ar: "المساعد" },
            text: { en: "Quiz: Debugging means…", ar: "سؤال: Debugging يعني…" },
            quiz: {
              options: {
                en: ["Finding and fixing code errors", "Deleting the whole project", "Adding more bugs"],
                ar: ["إيجاد وإصلاح أخطاء الكود", "حذف المشروع بالكامل", "إضافة أخطاء أكثر"],
              },
              correctIndex: 0,
              explain: {
                en: "Debugging is fixing bugs — like a detective for your code.",
                ar: "يعني تصلّح الأخطاء — زي محقق للكود.",
              },
            },
          },
          {
            speaker: { en: "Mentor", ar: "المرشد" },
            text: {
              en: "Nice. Finish this level and you’ll unlock the next mission.",
              ar: "ممتاز. خلّص هذا المستوى وبتفتح المهمة التالية.",
            },
          },
        ],
      },
    ],
  },

  ds: {
    scenes: [
      {
        bg: "assets/bg_lab.jpg",
        chars: [
          { id: "hero", src: "assets/hero.png", x: 40, y: 72 },
          { id: "scientist", src: "assets/scientist.png", x: 70, y: 72 },
        ],
        lines: [
          {
            speaker: { en: "Scientist", ar: "العالِمة" },
            text: {
              en: "Data Science is detective work with numbers. We collect, clean, and analyze data to discover patterns.",
              ar: "علم البيانات هو تحقيق بالأرقام. نجمع البيانات وننظفها ونحللها لنكتشف الأنماط.",
            },
          },
          {
            speaker: { en: "Scientist", ar: "العالِمة" },
            text: { en: "Quiz: First step in a data project?", ar: "سؤال: أول خطوة بمشروع بيانات؟" },
            quiz: {
              options: {
                en: ["Collect & understand data", "Predict randomly", "Build AI immediately"],
                ar: ["جمع وفهم البيانات", "تنبؤ عشوائي", "بناء AI فورًا"],
              },
              correctIndex: 0,
              explain: { en: "You must understand the dataset first.", ar: "لازم تفهم البيانات أولاً." },
            },
          },
        ],
      },
    ],
  },

  ux: {
    scenes: [
      {
        bg: "assets/bg_studio.jpg",
        chars: [
          { id: "hero", src: "assets/hero.png", x: 35, y: 72 },
          { id: "designer", src: "assets/designer.png", x: 75, y: 72 },
        ],
        lines: [
          {
            speaker: { en: "Designer", ar: "المصممة" },
            text: {
              en: "UX is about making products easy, enjoyable, and useful. You learn users first — then you design.",
              ar: "UX يعني تخلي المنتج سهل وممتع ومفيد. أول شيء تفهم المستخدم — بعدين تصمم.",
            },
          },
          {
            speaker: { en: "Designer", ar: "المصممة" },
            text: { en: "Quiz: What matters most in UX?", ar: "سؤال: شو الأهم في UX؟" },
            quiz: {
              options: {
                en: ["Understanding user needs", "Adding many features", "Only making it pretty"],
                ar: ["فهم احتياجات المستخدم", "إضافة ميزات كثيرة", "فقط الشكل الجميل"],
              },
              correctIndex: 0,
              explain: { en: "If users can’t reach their goal, nothing else matters.", ar: "إذا المستخدم ما وصل لهدفه، باقي الأشياء ما بتنفع." },
            },
          },
        ],
      },
    ],
  },
};



const assessmentQuestions = [
  {
    q: { en: "What type of activities do you enjoy most?", ar: "ما نوع الأنشطة التي تستمتع بها أكثر؟" },
    a: [
      { en: "Solving technical or logical problems", ar: "حل المشكلات التقنية أو المنطقية", s: { T: 2 } },
      { en: "Experimenting and discovering how things work", ar: "التجريب واكتشاف كيف تعمل الأشياء", s: { S: 2 } },
      { en: "Planning, organizing, or leading tasks", ar: "التخطيط والتنظيم أو قيادة المهام", s: { B: 2 } },
      { en: "Creating designs, content, or visuals", ar: "ابتكار التصاميم أو المحتوى أو المرئيات", s: { C: 2 } },
    ],
  },
  {
    q: { en: "When faced with a problem, you usually:", ar: "عندما تواجه مشكلة، عادةً:" },
    a: [
      { en: "Analyze it step by step", ar: "تحللها خطوة بخطوة", s: { T: 2 } },
      { en: "Research and test different ideas", ar: "تبحث وتجرب أفكارًا مختلفة", s: { S: 2 } },
      { en: "Think about impact and decision-making", ar: "تفكر في التأثير واتخاذ القرار", s: { B: 2 } },
      { en: "Look for creative or alternative solutions", ar: "تبحث عن حلول إبداعية أو بديلة", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which school subjects do you enjoy the most?", ar: "ما المواد المدرسية التي تستمتع بها أكثر؟" },
    a: [
      { en: "Math / Computer Science", ar: "الرياضيات / علوم الحاسوب", s: { T: 2 } },
      { en: "Biology / Chemistry / Physics", ar: "الأحياء / الكيمياء / الفيزياء", s: { S: 2 } },
      { en: "Economics / Business Studies", ar: "الاقتصاد / دراسات الأعمال", s: { B: 2 } },
      { en: "Art / Media / Design", ar: "الفن / الإعلام / التصميم", s: { C: 2 } },
    ],
  },
  {
    q: { en: "You prefer learning by:", ar: "تفضّل التعلم عبر:" },
    a: [
      { en: "Coding, building, or fixing things", ar: "البرمجة أو البناء أو إصلاح الأشياء", s: { T: 2 } },
      { en: "Experiments and research", ar: "التجارب والبحث", s: { S: 2 } },
      { en: "Discussions and case studies", ar: "النقاشات ودراسات الحالة", s: { B: 2 } },
      { en: "Visuals, storytelling, or design", ar: "المرئيات أو السرد القصصي أو التصميم", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which environment attracts you more?", ar: "أي بيئة تجذبك أكثر؟" },
    a: [
      { en: "Tech labs or startups", ar: "مختبرات التقنية أو الشركات الناشئة", s: { T: 2 } },
      { en: "Research centers or labs", ar: "مراكز أو مختبرات البحث", s: { S: 2 } },
      { en: "Offices, companies, or organizations", ar: "المكاتب أو الشركات أو المؤسسات", s: { B: 2 } },
      { en: "Studios or creative spaces", ar: "الاستوديوهات أو المساحات الإبداعية", s: { C: 2 } },
    ],
  },
  {
    q: { en: "How do you see yourself in the future?", ar: "كيف ترى نفسك في المستقبل؟" },
    a: [
      { en: "Building technology solutions", ar: "بناء حلول تقنية", s: { T: 2 } },
      { en: "Making scientific discoveries", ar: "تحقيق اكتشافات علمية", s: { S: 2 } },
      { en: "Leading teams or managing projects", ar: "قيادة فرق أو إدارة مشاريع", s: { B: 2 } },
      { en: "Expressing ideas creatively", ar: "التعبير عن الأفكار بإبداع", s: { C: 2 } },
    ],
  },
  {
    q: { en: "What motivates you most?", ar: "ما الذي يحفّزك أكثر؟" },
    a: [
      { en: "Innovation and efficiency", ar: "الابتكار والكفاءة", s: { T: 2 } },
      { en: "Knowledge and discovery", ar: "المعرفة والاكتشاف", s: { S: 2 } },
      { en: "Success and impact", ar: "النجاح والتأثير", s: { B: 2 } },
      { en: "Creativity and expression", ar: "الإبداع والتعبير", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which task sounds most exciting?", ar: "أي مهمة تبدو الأكثر إثارة؟" },
    a: [
      { en: "Developing an app", ar: "تطوير تطبيق", s: { T: 2 } },
      { en: "Conducting an experiment", ar: "إجراء تجربة", s: { S: 2 } },
      { en: "Launching a business", ar: "إطلاق مشروع", s: { B: 2 } },
      { en: "Designing a brand", ar: "تصميم هوية علامة تجارية", s: { C: 2 } },
    ],
  },
  {
    q: { en: "How do you feel about helping others?", ar: "كيف تشعر تجاه مساعدة الآخرين؟" },
    a: [
      { en: "By creating useful tools", ar: "بإنشاء أدوات مفيدة", s: { T: 1, H: 1 } },
      { en: "By medical or scientific support", ar: "بدعم طبي أو علمي", s: { S: 1, H: 1 } },
      { en: "By organizing services or systems", ar: "بتنظيم الخدمات أو الأنظمة", s: { B: 1, H: 1 } },
      { en: "By teaching or communicating", ar: "بالتعليم أو التواصل", s: { E: 2 } },
    ],
  },
  {
    q: { en: "You enjoy explaining ideas to others.", ar: "تستمتع بشرح الأفكار للآخرين." },
    a: [
      { en: "Yes, with logic and examples", ar: "نعم، بالمنطق والأمثلة", s: { E: 2 } },
      { en: "Yes, using visuals", ar: "نعم، باستخدام المرئيات", s: { C: 1, E: 1 } },
      { en: "Only when related to business", ar: "فقط عندما تكون مرتبطة بالأعمال", s: { B: 2 } },
      { en: "Not really", ar: "ليس كثيرًا", s: { T: 1 } },
    ],
  },
  {
    q: { en: "Which class project sounds best?", ar: "أي مشروع صفّي يبدو الأفضل؟" },
    a: [
      { en: "Build a robotics prototype", ar: "بناء نموذج روبوت", s: { T: 2 } },
      { en: "Conduct a scientific study", ar: "إجراء دراسة علمية", s: { S: 2 } },
      { en: "Launch a school event", ar: "إطلاق فعالية مدرسية", s: { B: 2 } },
      { en: "Create a visual story", ar: "إنشاء قصة بصرية", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which strength describes you best?", ar: "أي قوة تصفك أكثر؟" },
    a: [
      { en: "Logic and structure", ar: "المنطق والبنية", s: { T: 2 } },
      { en: "Curiosity and analysis", ar: "الفضول والتحليل", s: { S: 2 } },
      { en: "Organization and leadership", ar: "التنظيم والقيادة", s: { B: 2 } },
      { en: "Imagination and originality", ar: "الخيال والأصالة", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which task would you volunteer for?", ar: "أي مهمة ستتطوع بها؟" },
    a: [
      { en: "Fixing devices", ar: "إصلاح الأجهزة", s: { T: 2 } },
      { en: "Collecting research data", ar: "جمع بيانات بحثية", s: { S: 2 } },
      { en: "Planning a fundraiser", ar: "تنظيم حملة تبرعات", s: { B: 1, E: 1 } },
      { en: "Designing posters", ar: "تصميم ملصقات", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which career impact do you want?", ar: "أي أثر مهني تريده؟" },
    a: [
      { en: "Build tools people depend on", ar: "بناء أدوات يعتمد عليها الناس", s: { T: 2 } },
      { en: "Improve health outcomes", ar: "تحسين النتائج الصحية", s: { H: 2 } },
      { en: "Lead teams and organizations", ar: "قيادة فرق ومؤسسات", s: { B: 2 } },
      { en: "Teach and guide others", ar: "التعليم والإرشاد", s: { E: 2 } },
    ],
  },
  {
    q: { en: "Which workplace sounds best to you?", ar: "أي مكان عمل يبدو الأفضل لك؟" },
    a: [
      { en: "A fast-paced tech company", ar: "شركة تقنية سريعة الإيقاع", s: { T: 2 } },
      { en: "A scientific research lab", ar: "مختبر أبحاث علمية", s: { S: 2 } },
      { en: "A business consultancy", ar: "شركة استشارات أعمال", s: { B: 2 } },
      { en: "A creative studio", ar: "استوديو إبداعي", s: { C: 2 } },
    ],
  },
  {
    q: { en: "What type of problems do you like solving?", ar: "ما نوع المشكلات التي تحب حلها؟" },
    a: [
      { en: "Technical or system problems", ar: "مشكلات تقنية أو أنظمة", s: { T: 2 } },
      { en: "Scientific questions", ar: "أسئلة علمية", s: { S: 2 } },
      { en: "Business or organizational issues", ar: "مشكلات أعمال أو تنظيم", s: { B: 2 } },
      { en: "Design or communication challenges", ar: "تحديات تصميم أو تواصل", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which activity would you choose in your free time?", ar: "أي نشاط ستختاره في وقت فراغك؟" },
    a: [
      { en: "Build a small project or tool", ar: "بناء مشروع أو أداة بسيطة", s: { T: 2 } },
      { en: "Read science articles or documentaries", ar: "قراءة مقالات علمية أو وثائقيات", s: { S: 2 } },
      { en: "Plan an event or manage a team", ar: "تنظيم فعالية أو إدارة فريق", s: { B: 2 } },
      { en: "Create art or content", ar: "ابتكار فن أو محتوى", s: { C: 2 } },
    ],
  },
  {
    q: { en: "What do you value more in a project?", ar: "ما الذي تقدّره أكثر في المشروع؟" },
    a: [
      { en: "Efficiency and performance", ar: "الكفاءة والأداء", s: { T: 2 } },
      { en: "Accuracy and evidence", ar: "الدقة والأدلة", s: { S: 2 } },
      { en: "Impact and results", ar: "الأثر والنتائج", s: { B: 2 } },
      { en: "Originality and aesthetics", ar: "الأصالة والجمال", s: { C: 2 } },
    ],
  },
  {
    q: { en: "How do you like to present your ideas?", ar: "كيف تحب عرض أفكارك؟" },
    a: [
      { en: "Through data and logic", ar: "عبر البيانات والمنطق", s: { T: 1, S: 1 } },
      { en: "Through experiments or findings", ar: "عبر التجارب أو النتائج", s: { S: 2 } },
      { en: "Through strategy and planning", ar: "عبر الاستراتيجية والتخطيط", s: { B: 2 } },
      { en: "Through storytelling and visuals", ar: "عبر السرد والمرئيات", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which community role fits you best?", ar: "أي دور مجتمعي يناسبك أكثر؟" },
    a: [
      { en: "Build tools for people", ar: "بناء أدوات للناس", s: { T: 1, H: 1 } },
      { en: "Support health initiatives", ar: "دعم المبادرات الصحية", s: { H: 2 } },
      { en: "Organize programs or services", ar: "تنظيم برامج أو خدمات", s: { B: 1, H: 1 } },
      { en: "Teach or mentor", ar: "التعليم أو الإرشاد", s: { E: 2 } },
    ],
  },
  {
    q: { en: "Which goal feels most exciting?", ar: "أي هدف يبدو الأكثر إثارة؟" },
    a: [
      { en: "Launch a new digital product", ar: "إطلاق منتج رقمي جديد", s: { T: 2 } },
      { en: "Discover a new insight", ar: "اكتشاف معرفة جديدة", s: { S: 2 } },
      { en: "Grow a successful organization", ar: "تنمية منظمة ناجحة", s: { B: 2 } },
      { en: "Create a memorable experience", ar: "ابتكار تجربة مميزة", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which subject feels most useful to your future?", ar: "أي مادة تبدو الأكثر فائدة لمستقبلك؟" },
    a: [
      { en: "Programming and algorithms", ar: "البرمجة والخوارزميات", s: { T: 2 } },
      { en: "Science and lab work", ar: "العلوم والعمل المخبري", s: { S: 2 } },
      { en: "Economics and management", ar: "الاقتصاد والإدارة", s: { B: 2 } },
      { en: "Art and creative projects", ar: "الفن والمشاريع الإبداعية", s: { C: 2 } },
    ],
  },
  {
    q: { en: "Which team role do you enjoy?", ar: "أي دور تحبه داخل الفريق؟" },
    a: [
      { en: "Builder or developer", ar: "منفّذ أو مطور", s: { T: 2 } },
      { en: "Researcher or analyst", ar: "باحث أو محلل", s: { S: 2 } },
      { en: "Coordinator or leader", ar: "منسق أو قائد", s: { B: 2 } },
      { en: "Designer or creative lead", ar: "مصمم أو قائد إبداعي", s: { C: 2 } },
    ],
  },
];

const psychoQuestions = [
  {
    q: {
      en: "I stay calm during exams and tight deadlines.",
      ar: "أبقى هادئًا أثناء الامتحانات والمواعيد الضيقة.",
    },
    cat: "stress",
  },
  {
    q: {
      en: "I feel overwhelmed when facing academic pressure.",
      ar: "أشعر بالإرهاق عند مواجهة الضغط الدراسي.",
    },
    cat: "stress",
    reverse: true,
  },
  {
    q: {
      en: "I can manage multiple tasks without high stress.",
      ar: "أستطيع إدارة مهام متعددة بدون توتر عالٍ.",
    },
    cat: "stress",
  },
  {
    q: {
      en: "I can concentrate for long study sessions.",
      ar: "أستطيع التركيز لفترات دراسة طويلة.",
    },
    cat: "focus",
  },
  {
    q: {
      en: "I get distracted easily when studying.",
      ar: "أتشتت بسهولة أثناء الدراسة.",
    },
    cat: "focus",
    reverse: true,
  },
  {
    q: {
      en: "I maintain focus even when tasks are repetitive.",
      ar: "أحافظ على التركيز حتى عندما تكون المهام مكررة.",
    },
    cat: "focus",
  },
  {
    q: {
      en: "I enjoy working in teams with frequent communication.",
      ar: "أستمتع بالعمل ضمن فريق مع تواصل متكرر.",
    },
    cat: "social",
  },
  {
    q: {
      en: "I prefer working alone most of the time.",
      ar: "أفضل العمل بمفردي معظم الوقت.",
    },
    cat: "social",
    reverse: true,
  },
  {
    q: {
      en: "I am comfortable presenting ideas to others.",
      ar: "أشعر بالراحة عند عرض الأفكار للآخرين.",
    },
    cat: "social",
  },
  {
    q: {
      en: "After failing, I regain motivation quickly.",
      ar: "بعد الفشل أستعيد الدافعية بسرعة.",
    },
    cat: "resilience",
  },
  {
    q: {
      en: "Sudden changes in plans make me anxious or stuck.",
      ar: "التغييرات المفاجئة في الخطط تجعلني قلقًا أو متعثرًا.",
    },
    cat: "resilience",
    reverse: true,
  },
  {
    q: {
      en: "I adapt when learning conditions suddenly change.",
      ar: "أتأقلم عندما تتغير ظروف التعلم فجأة.",
    },
    cat: "resilience",
  },
];

const architectureContent = {
  en: {
    intro:
      "FORSA is a multi-layer AI decision system. Each layer refines and constrains the next, so recommendations are progressive filters rather than direct mapping.",
    layers: [
      {
        title: "Layer 1: Input Layer — Cognitive & Academic Data",
        purpose: "Collect objective and semi-objective signals about interests and academic readiness.",
        data: [
          "Career interest test results",
          "Skills self-assessment",
          "Academic performance indicators",
          "Preferred learning style",
          "Educational history continuity",
        ],
        output: "Cognitive Interest Vector (raw potential only, no recommendation).",
      },
      {
        title: "Layer 2: Psycho-Cognitive AI Analysis",
        purpose:
          "Understand mental capacity, emotional resilience, and psychological readiness for different career environments.",
        data: [
          "Stress & anxiety response",
          "Focus & cognitive endurance",
          "Social & work preference",
          "Emotional resilience (self-perceived)",
        ],
        output:
          "Psychological Constraint Vector that moderates interests instead of rejecting them.",
      },
      {
        title: "Layer 3: AI Multi-Dimensional Decision Engine",
        purpose:
          "Combine interests, psychological constraints, and environmental conditions to produce sustainable paths.",
        data: [
          "Cognitive Interest Vector",
          "Psycho-Cognitive Profile",
          "Environmental constraints (internet, location, crisis exposure)",
          "Market demand indicators",
        ],
        output: "Career Fit, Risk, and Adaptability scores for each path.",
      },
    ],
    logic: {
      title: "AI Processing Logic (Conceptual)",
      items: [
        "Normalize psycho-cognitive scores from Likert-scale answers.",
        "Compute fit score from interests + skills + learning style.",
        "Compute risk score from psychological load vs tolerance.",
        "Compute adaptability score for unstable or constrained conditions.",
      ],
    },
    psychoBehavior: {
      title: "How AI Treats Psychological Conditions",
      text:
        "AI adapts the recommendation to the student’s psychological capacity, not only interest.",
      example:
        "Example: High anxiety + low focus + trauma exposure → avoid rigid high-pressure careers, recommend remote-friendly modular tech roles.",
    },
    crisis: {
      title: "AI Crisis-Aware Education Engine",
      items: [
        "Detect disrupted learning patterns (irregular logins, interrupted assessments, delayed responses).",
        "Predict dropout risk using behavioral signals and stress indicators.",
        "Recommend flexible pathways (asynchronous learning, micro-modules, skills over degrees).",
        "Automatically adjust workload (reduced weekly load, extended deadlines, offline-friendly resources).",
      ],
    },
    why: {
      title: "Why This Satisfies the Competition",
      items: [
        "AI is central, not decorative.",
        "Multi-layer reasoning with psychological + environmental intelligence.",
        "Ethical, non-medical AI use.",
        "Strong Gaza impact use case without labeling users.",
      ],
    },
    exampleScores: {
      title: "Example Output",
      items: [
        "Software Engineering → Fit 82%, Risk 35%, Adaptability High",
        "Medicine → Fit 65%, Risk 78%, Adaptability Low",
      ],
    },
  },
  ar: {
    intro:
      "FORSA هو نظام قرار بالذكاء الاصطناعي متعدد الطبقات. كل طبقة تُنقّي وتُقيّد التي بعدها، لذا التوصية تأتي عبر ترشيح تدريجي وليس مطابقة مباشرة.",
    layers: [
      {
        title: "الطبقة 1: طبقة الإدخال — البيانات المعرفية والأكاديمية",
        purpose: "جمع مؤشرات موضوعية وشبه موضوعية عن الميول والاستعداد الأكاديمي.",
        data: [
          "نتائج اختبار الميول المهنية",
          "تقييم ذاتي للمهارات",
          "مؤشرات الأداء الأكاديمي",
          "أسلوب التعلم المفضل",
          "استمرارية المسار التعليمي",
        ],
        output: "متجه الميول المعرفية (إمكانات خام بدون توصية).",
      },
      {
        title: "الطبقة 2: التحليل النفسي المعرفي",
        purpose:
          "فهم القدرة الذهنية والمرونة العاطفية والاستعداد النفسي لبيئات مهنية مختلفة.",
        data: [
          "استجابة الضغط والقلق",
          "ثبات التركيز والتحمل الذهني",
          "تفضيل العمل الفردي أو الجماعي",
          "المرونة العاطفية (تقييم ذاتي)",
        ],
        output: "متجه قيود نفسي يخفف الميول ولا يرفضها.",
      },
      {
        title: "الطبقة 3: محرك قرار متعدد الأبعاد",
        purpose:
          "دمج الميول والقيود النفسية والظروف البيئية لإخراج مسارات مستدامة.",
        data: [
          "متجه الميول المعرفية",
          "الملف النفسي المعرفي",
          "القيود البيئية (الإنترنت، الموقع، الأزمات)",
          "إشارات طلب السوق",
        ],
        output: "درجات الملاءمة والمخاطر وقابلية التكيف لكل مسار.",
      },
    ],
    logic: {
      title: "منطق المعالجة (تصوري)",
      items: [
        "تحويل الإجابات إلى درجات نفسية معيارية.",
        "حساب الملاءمة من الميول والمهارات وأساليب التعلم.",
        "حساب المخاطر عبر مقارنة الحمل النفسي مع التحمل.",
        "حساب التكيف مع الظروف غير المستقرة أو المقيدة.",
      ],
    },
    psychoBehavior: {
      title: "كيف يتعامل الذكاء مع الحالات النفسية",
      text:
        "AI adapts the recommendation to the student’s psychological capacity, not only interest.",
      example:
        "مثال: قلق مرتفع + تركيز منخفض + صدمة → تجنب الوظائف الصلبة عالية الضغط، واقتراح أدوار تقنية مرنة عن بُعد.",
    },
    crisis: {
      title: "محرك تعليمي واعٍ بالأزمات",
      items: [
        "اكتشاف أنماط التعلم المتقطعة (تسجيلات غير منتظمة، تقييمات متقطعة، ردود متأخرة).",
        "توقع خطر الانقطاع باستخدام إشارات سلوكية ومؤشرات ضغط.",
        "اقتراح مسارات مرنة (تعلم غير متزامن، وحدات صغيرة، مهارات بدل الشهادات مؤقتًا).",
        "تعديل الحمل تلقائيًا (تقليل العبء الأسبوعي، تمديد المواعيد، موارد قابلة للعمل دون اتصال).",
      ],
    },
    why: {
      title: "لماذا يرضي معايير المنافسة",
      items: [
        "الذكاء الاصطناعي محوري وليس شكليًا.",
        "تفكير متعدد الطبقات مع ذكاء نفسي وبيئي.",
        "استخدام أخلاقي وغير طبي.",
        "أثر قوي لحالات غزة دون وصم المستخدمين.",
      ],
    },
    exampleScores: {
      title: "مثال على المخرجات",
      items: [
        "هندسة البرمجيات → الملاءمة 82%، المخاطر 35%، التكيف مرتفع",
        "الطب → الملاءمة 65%، المخاطر 78%، التكيف منخفض",
      ],
    },
  },
};
const majorCatalog = [
  { id: "cs", title: { en: "Computer Science", ar: "علوم الحاسوب" }, domain: "T" },
  { id: "se", title: { en: "Software Engineering", ar: "هندسة البرمجيات" }, domain: "T" },
  { id: "it", title: { en: "Information Technology", ar: "تقنية المعلومات" }, domain: "T" },
  { id: "ai", title: { en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" }, domain: "T" },
  { id: "cyber", title: { en: "Cybersecurity", ar: "الأمن السيبراني" }, domain: "T" },

  { id: "ds", title: { en: "Data Science", ar: "علم البيانات" }, domain: "S" },
  { id: "envs", title: { en: "Environmental Science", ar: "العلوم البيئية" }, domain: "S" },
  { id: "bio", title: { en: "Biology", ar: "الأحياء" }, domain: "S" },

  { id: "ba", title: { en: "Business Administration", ar: "إدارة الأعمال" }, domain: "B" },
  { id: "marketing", title: { en: "Digital Marketing", ar: "التسويق الرقمي" }, domain: "B" },
  { id: "mis", title: { en: "MIS", ar: "نظم المعلومات الإدارية" }, domain: "B" },

  { id: "ux", title: { en: "UI/UX Design", ar: "تصميم UI/UX" }, domain: "C" },
  { id: "gd", title: { en: "Graphic Design", ar: "التصميم الجرافيكي" }, domain: "C" },
  { id: "media", title: { en: "Media & Digital Arts", ar: "الإعلام والفنون الرقمية" }, domain: "C" },

  { id: "med", title: { en: "Medicine", ar: "الطب" }, domain: "H" },
  { id: "nursing", title: { en: "Nursing", ar: "التمريض" }, domain: "H" },
  { id: "psy", title: { en: "Psychology", ar: "علم النفس" }, domain: "H" },

  { id: "edu", title: { en: "Education", ar: "التربية" }, domain: "E" },
  { id: "lang", title: { en: "Languages", ar: "اللغات" }, domain: "E" },
  { id: "pr", title: { en: "Public Relations", ar: "العلاقات العامة" }, domain: "E" },
];

const GOVERNORATES = [
  "Jerusalem",
  "Ramallah",
  "Nablus",
  "Hebron",
  "Bethlehem",
  "Jenin",
  "Tulkarm",
  "Qalqilya",
  "Jericho",
  "Gaza",
];

const WORKSHOP_LOCATIONS = ["On-campus", "Online", "Hybrid"];
const WORKSHOP_STATUSES = ["Upcoming", "Live", "Finished"];
const TARGET_LEVELS = ["School", "University", "Both"];
const AUDIENCE_LEVELS = ["School", "University"];

const UNIVERSITY_LOGOS = {
  bethlehem: "assets/bethlehem.png",
  birzeit: "assets/birzeit.png",
  najah: "assets/najah.png",
};

const DEFAULT_UNIVERSITIES = [
  {
    id: "bethlehem",
    name: { en: "Bethlehem University", ar: "جامعة بيت لحم" },
    logo: UNIVERSITY_LOGOS.bethlehem,
    location: { governorate: "Bethlehem", city: "Bethlehem" },
    majors: ["se", "ds", "ux"],
    targetAudience: ["School", "University"],
    contact: { email: "info@bethlehem.edu", website: "https://www.bethlehem.edu" },
    verified: true,
  },
  {
    id: "birzeit",
    name: { en: "Birzeit University", ar: "جامعة بيرزيت" },
    logo: UNIVERSITY_LOGOS.birzeit,
    location: { governorate: "Ramallah", city: "Birzeit" },
    majors: ["cs", "ai", "cyber", "ba", "mis", "marketing"],
    targetAudience: ["University"],
    contact: { email: "admissions@birzeit.edu", website: "https://www.birzeit.edu" },
    verified: true,
  },
  {
    id: "najah",
    name: { en: "An-Najah University", ar: "جامعة النجاح الوطنية" },
    logo: UNIVERSITY_LOGOS.najah,
    location: { governorate: "Nablus", city: "Nablus" },
    majors: ["med", "nursing", "psy", "bio", "envs"],
    targetAudience: ["School", "University"],
    contact: { email: "info@najah.edu", website: "https://www.najah.edu" },
    verified: true,
  },
];

const DEFAULT_WORKSHOPS = [
  {
    workshop_id: "ws-se-001",
    university_id: "bethlehem",
    title: "Intro to Web Development (HTML/CSS/JS)",
    description: "Hands-on basics for building your first web page.",
    major_category: "se",
    target_level: "School",
    date: "2026-02-12",
    start_time: "15:00",
    duration: "2h",
    location: "Online",
    governorate: "Bethlehem",
    max_participants: 80,
    registration_required: true,
    recording_url: "",
    status: "Upcoming",
    approved: true,
  },
  {
    workshop_id: "ws-ds-002",
    university_id: "birzeit",
    title: "Data Analysis with Python",
    description: "Practical intro to pandas and data cleaning.",
    major_category: "ds",
    target_level: "University",
    date: "2026-01-18",
    start_time: "11:00",
    duration: "3h",
    location: "Hybrid",
    governorate: "Ramallah",
    max_participants: 60,
    registration_required: true,
    recording_url: "https://youtu.be/example",
    status: "Finished",
    approved: true,
  },
  {
    workshop_id: "ws-ux-003",
    university_id: "najah",
    title: "UX Fundamentals Sprint",
    description: "Design thinking and rapid prototyping.",
    major_category: "ux",
    target_level: "Both",
    date: "2026-02-03",
    start_time: "13:30",
    duration: "2.5h",
    location: "On-campus",
    governorate: "Nablus",
    max_participants: 40,
    registration_required: false,
    recording_url: "",
    status: "Upcoming",
    approved: false,
  },
];

const UNIVERSITY_KB = [
  {
    universityId: "bethlehem",
    programs: [
      { majorId: "se", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "Medium", learningMode: "On-campus" },
      { majorId: "ds", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "High", learningMode: "Hybrid" },
      { majorId: "ux", admission: { en: "Open to all streams", ar: "متاح لكل الفروع" }, studyLoad: "Medium", learningMode: "On-campus" },
    ],
  },
  {
    universityId: "birzeit",
    programs: [
      { majorId: "cs", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "High", learningMode: "On-campus" },
      { majorId: "ai", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "High", learningMode: "On-campus" },
      { majorId: "cyber", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "High", learningMode: "Hybrid" },
      { majorId: "ba", admission: { en: "Open to all streams", ar: "متاح لكل الفروع" }, studyLoad: "Medium", learningMode: "On-campus" },
      { majorId: "mis", admission: { en: "Scientific or Literary", ar: "علمي أو أدبي" }, studyLoad: "Medium", learningMode: "Hybrid" },
      { majorId: "marketing", admission: { en: "Open to all streams", ar: "متاح لكل الفروع" }, studyLoad: "Low", learningMode: "Online" },
    ],
  },
  {
    universityId: "najah",
    programs: [
      { majorId: "med", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "High", learningMode: "On-campus" },
      { majorId: "nursing", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "High", learningMode: "On-campus" },
      { majorId: "psy", admission: { en: "Open to all streams", ar: "متاح لكل الفروع" }, studyLoad: "Medium", learningMode: "On-campus" },
      { majorId: "bio", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "Medium", learningMode: "On-campus" },
      { majorId: "envs", admission: { en: "Scientific stream", ar: "الفرع العلمي" }, studyLoad: "Medium", learningMode: "Hybrid" },
    ],
  },
];

const LABOR_MARKET = {
  cs: { demand: "High", remoteFriendly: true, localDemand: "High", globalDemand: "High" },
  se: { demand: "High", remoteFriendly: true, localDemand: "High", globalDemand: "High" },
  it: { demand: "High", remoteFriendly: true, localDemand: "High", globalDemand: "High" },
  ai: { demand: "High", remoteFriendly: true, localDemand: "Medium", globalDemand: "High" },
  cyber: { demand: "High", remoteFriendly: true, localDemand: "High", globalDemand: "High" },
  ds: { demand: "High", remoteFriendly: true, localDemand: "Medium", globalDemand: "High" },
  envs: { demand: "Medium", remoteFriendly: false, localDemand: "Medium", globalDemand: "Medium" },
  bio: { demand: "Medium", remoteFriendly: false, localDemand: "Medium", globalDemand: "Medium" },
  ba: { demand: "Medium", remoteFriendly: true, localDemand: "Medium", globalDemand: "Medium" },
  marketing: { demand: "High", remoteFriendly: true, localDemand: "High", globalDemand: "High" },
  mis: { demand: "Medium", remoteFriendly: true, localDemand: "Medium", globalDemand: "High" },
  ux: { demand: "High", remoteFriendly: true, localDemand: "Medium", globalDemand: "High" },
  gd: { demand: "Medium", remoteFriendly: true, localDemand: "Medium", globalDemand: "Medium" },
  media: { demand: "Medium", remoteFriendly: true, localDemand: "Medium", globalDemand: "Medium" },
  med: { demand: "High", remoteFriendly: false, localDemand: "High", globalDemand: "Medium" },
  nursing: { demand: "High", remoteFriendly: false, localDemand: "High", globalDemand: "Medium" },
  psy: { demand: "Medium", remoteFriendly: false, localDemand: "Medium", globalDemand: "Medium" },
  edu: { demand: "Medium", remoteFriendly: false, localDemand: "Medium", globalDemand: "Low" },
  lang: { demand: "Low", remoteFriendly: true, localDemand: "Low", globalDemand: "Medium" },
  pr: { demand: "Medium", remoteFriendly: true, localDemand: "Medium", globalDemand: "Medium" },
};

const PSYCH_RULES = [
  {
    id: "highStressAvoidHighLoad",
    when: (psy) => (psy.scores?.stress ?? 50) < 40,
    note: {
      en: "High stress sensitivity → avoid high-pressure fields.",
      ar: "تحمل ضغط منخفض → تجنب التخصصات عالية الضغط.",
    },
  },
  {
    id: "lowFocusPreferModular",
    when: (psy) => (psy.scores?.focus ?? 50) < 40,
    note: {
      en: "Low focus → prefer modular or paced learning.",
      ar: "تركيز منخفض → يفضّل التعلم المرن والمتدرّج.",
    },
  },
  {
    id: "crisisPreferFlexible",
    when: (_, env) => env.disruptionIndex >= 40,
    note: {
      en: "Crisis exposure → prioritize flexible and remote-friendly paths.",
      ar: "تعرض للأزمات → يفضّل مسارات مرنة وقابلة عن بُعد.",
    },
  },
];

const STORAGE_KEY = "forsaStoreV1";

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function slugify(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

function persistStore() {
  const data = {
    currentUser: state.currentUser,
    userProfile: state.userProfile,
    notificationPrefs: state.notificationPrefs,
    universities: state.universities,
    workshops: state.workshops,
    notifications: state.notifications,
    analytics: state.analytics,
    userEngagement: state.userEngagement,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {}
}

const FORSA_GAME_RETURN_KEY = "forsa_return_state_v1";


function launchExternalGame({ majorId, levelId }) {
  
    const returnState = {
        route: "major",
        selectedMajorId: majorId,
        majorHubTab: "game", 
        selectedLevelId: levelId
    };
    sessionStorage.setItem("forsa_return_state_v1", JSON.stringify(returnState));

    const returnTo = encodeURIComponent(window.location.href);
    
   
    window.location.href = `game.html?returnTo=${returnTo}`;
}


function restoreAfterGameReturn() {
  const url = new URL(window.location.href);
  const fromGame = url.searchParams.get("fromGame");


  if (!fromGame) return;

  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(FORSA_GAME_RETURN_KEY) || "null");
  } catch (e) {
    saved = null;
  }

  // Clean URL (remove fromGame so it doesn't keep restoring)
  url.searchParams.delete("fromGame");
  window.history.replaceState({}, "", url.toString());

  if (!saved) return;

  // Restore state
  state.selectedMajorId = saved.selectedMajorId || state.selectedMajorId;
  state.majorHubTab = saved.majorHubTab || "game";

  // Make sure game state object exists
  if (!state.game) state.game = { unlockedLevelByMajor: {}, completedByMajor: {}, starsByMajor: {}, xp: 0 };
  if (!state.game.unlockedLevelByMajor) state.game.unlockedLevelByMajor = {};
  if (!state.game.completedByMajor) state.game.completedByMajor = {};
  if (!state.game.starsByMajor) state.game.starsByMajor = {};

  // Go to the exact screen
  setRoute(saved.route || "major");
}


function initStore() {
  const saved = loadStore();
  state.currentUser = saved.currentUser || state.currentUser;
  state.userProfile = saved.userProfile || state.userProfile;
  state.notificationPrefs = saved.notificationPrefs || state.notificationPrefs;
  state.universities = saved.universities || deepClone(DEFAULT_UNIVERSITIES);
  state.workshops = saved.workshops || deepClone(DEFAULT_WORKSHOPS);
  state.notifications = saved.notifications || [];
  state.analytics = saved.analytics || {
    workshopViews: {},
    registrations: {},
    attendance: {},
    recordingReach: {},
  };
  state.userEngagement = saved.userEngagement || {
    registrations: [],
    attendance: [],
  };

  state.universities.forEach((uni) => {
    if (UNIVERSITY_LOGOS[uni.id]) {
      uni.logo = UNIVERSITY_LOGOS[uni.id];
    }
  });
  ensureDefaultUniversities();
  persistStore();
}

function ensureDefaultUniversities() {
  const byId = new Map(state.universities.map((u) => [u.id, u]));
  DEFAULT_UNIVERSITIES.forEach((uni) => {
    if (!byId.has(uni.id)) {
      state.universities.push(deepClone(uni));
      return;
    }
    const current = byId.get(uni.id);
    current.name = current.name || uni.name;
    current.logo = UNIVERSITY_LOGOS[uni.id] || current.logo || uni.logo;
    current.location = current.location?.governorate ? current.location : uni.location;
    current.majors = current.majors?.length ? current.majors : uni.majors;
    current.targetAudience = current.targetAudience?.length ? current.targetAudience : uni.targetAudience;
    current.contact = current.contact?.email ? current.contact : uni.contact;
    if (typeof current.verified !== "boolean") {
      current.verified = uni.verified;
    }
    if (current.id === "najah") {
      current.verified = true;
    }
  });
}

function ensureNajahUniversity() {
  const existing = state.universities.find((u) => u.id === "najah");
  if (!existing) {
    state.universities.push(
      deepClone({
        id: "najah",
        name: { en: "An-Najah University", ar: "جامعة النجاح الوطنية" },
        logo: "assets/najah.png",
        location: { governorate: "Nablus", city: "Nablus" },
        majors: ["med", "nursing", "psy", "bio", "envs"],
        targetAudience: ["School", "University"],
        contact: { email: "info@najah.edu", website: "https://www.najah.edu" },
        verified: true,
      })
    );
    return;
  }
  existing.logo = "assets/najah.png";
  existing.verified = true;
}

function getUniversityById(id) {
  return state.universities.find((u) => u.id === id);
}

function getWorkshopById(id) {
  return state.workshops.find((w) => w.workshop_id === id);
}

function getMajorById(id) {
  return majorCatalog.find((m) => m.id === id);
}

function getMajorTitle(id) {
  const major = getMajorById(id);
  return major ? major.title[state.lang] : id;
}

function getUniversityName(uniId) {
  const uni = getUniversityById(uniId);
  return uni ? uni.name[state.lang] : uniId;
}

function getWorkshopsForMajor(majorId) {
  return state.workshops.filter((w) => w.major_category === majorId);
}

function isAdmin() {
  return state.currentUser?.role === "Admin";
}

function isUniversityStudent() {
  return state.currentUser?.role === "UniversityStudent" || state.userProfile?.educationLevel === "University";
}

function isUniversityAdmin() {
  return state.currentUser?.role === "UniversityAdmin";
}

function canManageUniversity(uniId) {
  return isAdmin() || (isUniversityAdmin() && state.currentUser?.universityId === uniId);
}

function canSeeWorkshop(workshop) {
  if (workshop.approved) return true;
  if (isAdmin()) return true;
  if (isUniversityAdmin() && state.currentUser?.universityId === workshop.university_id) return true;
  return false;
}

function upsertUniversityProfileFromSignup({ name, email }) {
  const id = slugify(name || "");
  if (!id) return "";
  let uni = getUniversityById(id);
  if (!uni) {
    uni = {
      id,
      name: { en: name, ar: name },
      logo: "assets/logo.png",
      location: { governorate: "", city: "" },
      majors: [],
      targetAudience: ["School", "University"],
      contact: { email: email || "", website: "" },
      verified: false,
    };
    state.universities.push(uni);
  } else {
    uni.contact = { ...uni.contact, email: email || uni.contact.email };
  }
  return id;
}

function incrementAnalytics(bucket, id) {
  if (!state.analytics[bucket]) state.analytics[bucket] = {};
  state.analytics[bucket][id] = (state.analytics[bucket][id] || 0) + 1;
}

function addNotification(payload) {
  if (!state.notificationPrefs.inApp) return;
  state.notifications.unshift({
    id: uid("notif"),
    read: false,
    timestamp: Date.now(),
    ...payload,
  });
  persistStore();
}

function shouldNotifyForWorkshop(workshop) {
  if (!state.notificationPrefs.workshopAlerts) return false;
  const userLevel = state.userProfile.educationLevel;
  const levelMatch =
    workshop.target_level === "Both" ||
    (workshop.target_level === "School" && userLevel === "School") ||
    (workshop.target_level === "University" && userLevel === "University");
  const locationMatch =
    !state.userProfile.location ||
    state.userProfile.location === workshop.governorate;
  const interestMatch =
    !state.userProfile.interests.length ||
    state.userProfile.interests.includes(workshop.major_category);
  return levelMatch && locationMatch && interestMatch;
}

function notifyWorkshopPublished(workshop) {
  if (workshop.status !== "Upcoming") return;
  if (!shouldNotifyForWorkshop(workshop)) return;
  if (state.notifications.some((n) => n.type === "workshop" && n.workshopId === workshop.workshop_id)) return;
  addNotification({
    type: "workshop",
    title: workshop.title,
    message:
      state.lang === "en"
        ? `New workshop in ${workshop.governorate} for ${getMajorTitle(workshop.major_category)}.`
        : `ورشة جديدة في ${workshop.governorate} لتخصص ${getMajorTitle(workshop.major_category)}.`,
    workshopId: workshop.workshop_id,
  });
}

function notifyRecordingForGaza(workshop) {
  if (!state.notificationPrefs.recordingAlerts) return;
  if (state.userProfile.location !== "Gaza") return;
  if (workshop.status !== "Finished" || !workshop.recording_url) return;
  if (state.notifications.some((n) => n.type === "recording" && n.workshopId === workshop.workshop_id)) return;
  incrementAnalytics("recordingReach", workshop.workshop_id);
  addNotification({
    type: "recording",
    title: t("recordingAvailable"),
    message:
      state.lang === "en"
        ? `${workshop.title} recording is now available.`
        : `تسجيل ورشة ${workshop.title} أصبح متاحًا.`,
    workshopId: workshop.workshop_id,
  });
}

function formatWorkshopStatus(status) {
  if (status === "Live") return t("workshopLive");
  if (status === "Finished") return t("workshopFinished");
  return t("workshopUpcoming");
}

function formatTargetLevel(level) {
  if (level === "Both") return state.lang === "en" ? "School + University" : "مدرسة + جامعة";
  if (level === "School") return state.lang === "en" ? "School" : "مدرسة";
  return state.lang === "en" ? "University" : "جامعة";
}

function getWorkshopBoosts() {
  const boosts = {};
  state.userEngagement.attendance.forEach((id) => {
    const workshop = getWorkshopById(id);
    if (!workshop) return;
    const majorId = workshop.major_category;
    boosts[majorId] = (boosts[majorId] || 0) + 4;
  });
  state.userEngagement.registrations.forEach((id) => {
    const workshop = getWorkshopById(id);
    if (!workshop) return;
    const majorId = workshop.major_category;
    boosts[majorId] = (boosts[majorId] || 0) + 1;
  });
  return boosts;
}

function openWorkshop(workshopId) {
  state.selectedWorkshopId = workshopId;
  incrementAnalytics("workshopViews", workshopId);
  persistStore();
  setRoute("workshop");
}

function openUniversity(uniId) {
  state.selectedUniversityId = uniId;
  setRoute("university");
}

function registerForWorkshop(workshopId) {
  const workshop = getWorkshopById(workshopId);
  if (!workshop) return;
  if (state.userEngagement.registrations.includes(workshopId)) return;
  const currentCount = state.analytics.registrations[workshopId] || 0;
  if (workshop.max_participants && currentCount >= workshop.max_participants) {
    showToast(state.lang === "en" ? "Workshop is full." : "الورشة ممتلئة.");
    return;
  }
  state.userEngagement.registrations.push(workshopId);
  incrementAnalytics("registrations", workshopId);
  persistStore();
  showToast(state.lang === "en" ? "Registered successfully." : "تم التسجيل بنجاح.");
}

function markWorkshopAttended(workshopId) {
  const workshop = getWorkshopById(workshopId);
  if (!workshop) return;
  if (workshop.status !== "Finished") return;
  if (state.userEngagement.attendance.includes(workshopId)) return;
  state.userEngagement.attendance.push(workshopId);
  incrementAnalytics("attendance", workshopId);
  if (!state.userProfile.interests.includes(workshop.major_category)) {
    state.userProfile.interests.push(workshop.major_category);
  }
  persistStore();
  showToast(t("attendanceRecorded"));
}



function t(key) {
  return translations[state.lang][key] || key;
}

function setRoute(route) {
  state.route = route;
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${route}`);
  });
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.route === route);
  });
  render();
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  render();
}

function renderSplash() {
  const el = document.getElementById("screen-splash");
  el.innerHTML = `
    <div class="splash-wrap">
      <img class="splash-logo" src="assets/logo.png" alt="FORSA" />
      <div class="splash-sub" id="forsa-title" dir="ltr"></div>
      <div class="splash-title">فرصة</div>
      <p>${t("splashTag")}</p>
      <button class="btn" data-action="start">${t("splashCta")}</button>
    </div>
  `;
  
 
  const titleElement = el.querySelector("#forsa-title");
  const titleText = "FORSA";
  titleElement.innerHTML = "";
  
  titleText.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = letter === " " ? "\u00A0" : letter;
    span.style.animationDelay = `${index * 0.2}s`;
    titleElement.appendChild(span);
  });
  
  el.querySelector("[data-action='start']").onclick = () => setRoute("onboarding");
}

function renderOnboarding() {
  const el = document.getElementById("screen-onboarding");
  const selected = onboardingSteps.find((s) => s.id === state.onboardingId);
  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("howBadge")}</span>
      <h2>${t("howTitle")}</h2>
      <p>${t("howSub")}</p>
    </div>
    <div class="layout-two">
      <div class="image-card">
        <img src="${selected.image}" alt="${selected.title[state.lang]}" />
      </div>
      <div>
        <div class="steps-column">
          ${onboardingSteps
            .map(
              (step) => `
                <div class="step-card ${step.id === selected.id ? "active" : ""}" data-step="${step.id}">
                  <strong>${step.title[state.lang]}</strong>
                  <p>${step.desc[state.lang]}</p>
                </div>`
            )
            .join("")}
        </div>
        <div style="display:flex; gap:12px; margin-top:16px;">
          <button class="btn secondary" data-action="signin">${t("ctaSign")}</button>
          <button class="btn" data-action="signup">${t("ctaStart")}</button>
        </div>
      </div>
    </div>
  `;
  el.querySelectorAll("[data-step]").forEach((card) => {
    card.onclick = () => {
      state.onboardingId = card.dataset.step;
      renderOnboarding();
    };
  });
  el.querySelectorAll("[data-action]").forEach((btn) => {
    btn.onclick = () => {
      if (btn.dataset.action === "signin") {
        state.authTab = "signin";
      } else {
        state.authTab = "signup";
        state.signupStep = 1;
      }
      setRoute("auth");
    };
  });
}

function getTopRecommendation() {
  if (!state.recsGenerated) return null;
  const recs = buildRecommendations();
  return recs.length ? recs[0] : null;
}

function buildRecommendationExplanation(rec) {
  if (!rec) return "";
  if (rec.ragExplanation) {
    return rec.ragExplanation;
  }
  const domainName = domains[rec.domain]?.[state.lang] || rec.domain;
  if (state.lang === "ar") {
    return `هذا المسار ينسجم مع اهتمامك في مجال ${domainName} مع ملاءمة ${rec.fit}% وقابلية تكيّف ${rec.adaptability}%.`;
  }
  return `This path aligns with your interest in ${domainName} with ${rec.fit}% fit and ${rec.adaptability}% adaptability.`;
}

function validateAssessmentPage(start, end) {
  for (let i = start; i < end; i += 1) {
    const q = assessmentQuestions[i];
    const otherIndex = q.a.length;
    const answer = state.assessmentAnswers[i];
    if (answer == null) return { ok: false, errorKey: "chooseAnswer" };
    if (answer === otherIndex) {
      const otherText = (state.assessmentOtherAnswers[i] || "").trim();
      if (!otherText) return { ok: false, errorKey: "otherRequired" };
    }
  }
  return { ok: true, errorKey: "" };
}

function validatePsychoPage(start, end) {
  for (let i = start; i < end; i += 1) {
    if (state.psychoAnswers[i] == null) {
      return { ok: false, errorKey: "chooseAnswer" };
    }
  }
  return { ok: true, errorKey: "" };
}

function renderDashboard() {
  const el = document.getElementById("screen-dashboard");
  if (!el) return;

  const topRec = getTopRecommendation();
  const latestWorkshops = state.workshops.filter((w) => canSeeWorkshop(w)).slice(0, 3);
  const notifications = state.notifications.slice(0, 5);
  const profile = state.userProfile || {};
  const env = state.environment || {};

  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("navDashboard")}</span>
      <h2>${t("dashboardTitle")}</h2>
      <p>${t("dashboardSub")}</p>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3>${t("dashboardProfile")}</h3>
        <div class="grid-2">
          <div class="field">
            <label>${t("profileMajor")}</label>
            <select id="dash-major">
              <option value="">--</option>
              ${majorCatalog.map((m) => `<option value="${m.id}" ${profile.major === m.id ? "selected" : ""}>${m.title[state.lang]}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label>${t("profileYear")}</label>
            <select id="dash-year">
              <option value="">--</option>
              ${[1,2,3,4,5].map((y) => `<option value="${y}" ${String(profile.year) === String(y) ? "selected" : ""}>${y}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="field">
          <label>${t("profileSkills")}</label>
          <input id="dash-skills" value="${profile.skills || ""}" placeholder="e.g. Python, UX, Research" />
        </div>
        <div class="grid-2">
          <div class="field">
            <label>${t("profileTime")}</label>
            <select id="dash-time">
              <option value="">--</option>
              <option value="low" ${profile.timeAvailability === "low" ? "selected" : ""}>${state.lang === "en" ? "Low" : "منخفض"}</option>
              <option value="medium" ${profile.timeAvailability === "medium" ? "selected" : ""}>${state.lang === "en" ? "Medium" : "متوسط"}</option>
              <option value="high" ${profile.timeAvailability === "high" ? "selected" : ""}>${state.lang === "en" ? "High" : "مرتفع"}</option>
            </select>
          </div>
          <div class="field">
            <label>${t("profileInternet")}</label>
            <select id="dash-internet">
              <option value="">--</option>
              <option value="stable" ${env.internet === "stable" ? "selected" : ""}>${t("internetStable")}</option>
              <option value="limited" ${env.internet === "limited" ? "selected" : ""}>${t("internetLimited")}</option>
              <option value="offline" ${env.internet === "offline" ? "selected" : ""}>${t("internetOffline")}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>${t("profileLocation")}</label>
          <select id="dash-location">
            <option value="">--</option>
            ${GOVERNORATES.map((g) => `<option value="${g}" ${profile.location === g ? "selected" : ""}>${g}</option>`).join("")}
          </select>
        </div>
        <button class="btn" id="dash-save">${t("profileUpdate")}</button>
      </div>

      <div class="card">
        <h3>${t("dashboardStatus")}</h3>
        ${topRec ? `
          <div class="stat-grid">
            <div class="stat-card"><span>${topRec.title[state.lang]}</span><strong>${topRec.fit}% ${t("fitScore")}</strong></div>
            <div class="stat-card"><span>${t("riskScore")}</span><strong>${topRec.risk}%</strong></div>
            <div class="stat-card"><span>${t("adaptabilityScore")}</span><strong>${topRec.adaptability}%</strong></div>
          </div>
          <div class="meta-note" style="margin-top:10px;">${buildRecommendationExplanation(topRec)}</div>
        ` : `<div class="meta-note">${t("dashboardNoRecs")}</div>`}
      </div>
    </div>

    <div class="grid-2" style="margin-top:16px;">
      <div class="card">
        <h3>${t("dashboardLatestWorkshops")}</h3>
        ${latestWorkshops.length ? latestWorkshops.map((w) => `
          <div class="info-card" style="margin-top:10px;">
            <strong>${w.title}</strong>
            <div class="meta-line">${w.date} • ${w.location}</div>
          </div>
        `).join("") : `<div class="meta-note">${t("dashboardNoWorkshops")}</div>`}
        <div style="margin-top:10px;">
          <button class="btn ghost" data-route="universities">${t("dashboardUniversities")}</button>
        </div>
      </div>

      <div class="card">
        <h3>${t("dashboardNotifications")}</h3>
        ${notifications.length ? notifications.map((n) => `
          <div class="info-card" style="margin-top:10px;">
            <strong>${n.title}</strong>
            <div class="meta-line">${n.message}</div>
          </div>
        `).join("") : `<div class="meta-note">${t("dashboardNoNotifications")}</div>`}
        <div style="margin-top:10px;">
          <button class="btn ghost" data-route="notifications">${t("dashboardNotifications")}</button>
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-top:16px;">
      <div class="card">
        <h3>${t("dashboardAssessmentResults")}</h3>
        ${state.recsGenerated ? `
          <div class="stat-grid">
            <div class="stat-card"><span>${t("fitScore")}</span><strong>${topRec?.fit ?? "--"}%</strong></div>
            <div class="stat-card"><span>${t("riskScore")}</span><strong>${topRec?.risk ?? "--"}%</strong></div>
            <div class="stat-card"><span>${t("adaptabilityScore")}</span><strong>${topRec?.adaptability ?? "--"}%</strong></div>
          </div>
          <div class="meta-note" style="margin-top:10px;">${buildRecommendationExplanation(topRec)}</div>
        ` : `<div class="meta-note">${t("dashboardNoRecs")}</div>`}
      </div>

      <div class="card">
        <h3>${t("dashboardRecommendations")}</h3>
        ${state.recsGenerated ? `
          <div class="info-card" style="margin-top:10px;">
            <strong>${state.lang === "en" ? "Majors" : "التخصصات"}</strong>
            <div class="meta-line">${buildRecommendations().map((r) => r.title[state.lang]).join(" • ")}</div>
          </div>
          <div class="info-card" style="margin-top:10px;">
            <strong>${state.lang === "en" ? "Career tracks" : "المسارات المهنية"}</strong>
            <div class="meta-line">${state.lang === "en" ? "Developer • Analyst • Designer" : "مطور • محلل • مصمم"}</div>
          </div>
          <div class="info-card" style="margin-top:10px;">
            <strong>${state.lang === "en" ? "Skill paths" : "مسارات المهارات"}</strong>
            <div class="meta-line">${state.lang === "en" ? "Foundations • Applied projects • Advanced skills" : "أساسيات • مشاريع تطبيقية • مهارات متقدمة"}</div>
          </div>
        ` : `<div class="meta-note">${t("dashboardNoRecs")}</div>`}
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <h3>${t("dashboardProgress")}</h3>
      <div class="stat-grid">
        <div class="stat-card"><span>${state.lang === "en" ? "Assessments" : "التقييمات"}</span><strong>${state.assessmentDone ? "✓" : "--"}</strong></div>
        <div class="stat-card"><span>${state.lang === "en" ? "Saved items" : "العناصر المحفوظة"}</span><strong>${state.savedItems.length}</strong></div>
        <div class="stat-card"><span>${state.lang === "en" ? "Workshops attended" : "ورش حضرتها"}</span><strong>${state.userEngagement.attendance.length}</strong></div>
      </div>
    </div>
  `;

  el.querySelectorAll("[data-route]").forEach((btn) => {
    btn.onclick = () => setRoute(btn.dataset.route);
  });

  const saveBtn = el.querySelector("#dash-save");
  if (saveBtn) {
    saveBtn.onclick = () => {
      state.userProfile.major = el.querySelector("#dash-major").value;
      state.userProfile.year = el.querySelector("#dash-year").value;
      state.userProfile.skills = el.querySelector("#dash-skills").value.trim();
      state.userProfile.timeAvailability = el.querySelector("#dash-time").value;
      state.environment.internet = el.querySelector("#dash-internet").value;
      state.userProfile.location = el.querySelector("#dash-location").value;
      persistStore();
      onEnvironmentChange();
      showToast(state.lang === "en" ? "Profile updated." : "تم تحديث البيانات.");
    };
  }
}

function renderAuth() {
  const el = document.getElementById("screen-auth");
  const isSignIn = state.authTab === "signin";
  el.innerHTML = `
    <div class="auth-wrap">
      <div class="tabs">
        <button class="tab-btn ${isSignIn ? "active" : ""}" data-tab="signin">${t("tabSignIn")}</button>
        <button class="tab-btn ${!isSignIn ? "active" : ""}" data-tab="signup">${t("tabSignUp")}</button>
      </div>
      <div class="card">
        ${isSignIn ? renderSignInForm() : renderSignUpForm()}
      </div>
    </div>
  `;
  el.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.onclick = () => {
      state.authTab = btn.dataset.tab;
      renderAuth();
    };
  });
  bindAuthEvents();
}

function renderSignInForm() {
  return `
    <div class="center">
      <h2>${t("signInTitle")}</h2>
      <p>${t("signInSub")}</p>
    </div>
    <div class="field">
      <label>${t("username")}</label>
      <input id="signin-username" />
    </div>
    <div class="field">
      <label>${t("password")}</label>
      <input id="signin-password" type="password" />
    </div>
    <div class="error" id="signin-error"></div>
    <button class="btn" id="signin-btn">${t("tabSignIn")}</button>
  `;
}

function renderSignUpForm() {
  if (state.signupStep === 1) {
    return `
      <div class="center">
        <h2>${t("signUpTitle")}</h2>
        <p>${t("signUpSub")}</p>
      </div>
      <div class="field">
        <label>${t("userTypeStep")}</label>
        <div class="options">
          <div class="option ${state.form.userType === "university" ? "selected" : ""}" data-user-type="university">
            <strong>${t("university")}</strong><br/>
            <small>${t("uniHint")}</small>
          </div>
          <div class="option ${state.form.userType === "universityAdmin" ? "selected" : ""}" data-user-type="universityAdmin">
            <strong>${t("universityAdmin")}</strong><br/>
            <small>${t("uniAdminHint")}</small>
          </div>
          <div class="option ${state.form.userType === "school" ? "selected" : ""}" data-user-type="school">
            <strong>${t("highSchool")}</strong><br/>
            <small>${t("schoolHint")}</small>
          </div>
        </div>
      </div>
      <div class="error" id="signup-error"></div>
      <button class="btn" id="signup-next">${t("next")}</button>
    `;
  }

  const isUni = ["university", "universityAdmin"].includes(state.form.userType);
  return `
    <div class="center">
      <h2>${t("signUpTitle")}</h2>
      <p>${t("signUpSub")}</p>
    </div>
    <div class="field">
      <label>${t("accountStep")}</label>
    </div>
    <div class="field">
      <label>${t("username")}</label>
      <input id="su-username" />
      <div class="error" id="err-username"></div>
    </div>
    <div class="field">
      <label>${t("password")}</label>
      <input id="su-password" type="password" />
      <div class="error" id="err-password"></div>
    </div>
    <div class="field">
      <label>${t("confirm")}</label>
      <input id="su-confirm" type="password" />
      <div class="error" id="err-confirm"></div>
    </div>
    ${isUni ? renderUniFields() : renderSchoolFields()}
    <div class="error" id="signup-error"></div>
    <div style="display:flex; gap:12px;">
      <button class="btn ghost" id="signup-back">${t("back")}</button>
      <button class="btn" id="signup-create">${t("createAccount")}</button>
    </div>
  `;
}

function renderUniFields() {
  return `
    <div class="field">
      <label>${t("uniEmail")}</label>
      <input id="su-uni-email" />
      <div class="error" id="err-uni-email"></div>
    </div>
    <div class="field">
      <label>${t("regNumber")}</label>
      <input id="su-uni-reg" />
      <div class="error" id="err-uni-reg"></div>
    </div>
    <div class="field">
      <label>${t("uniName")}</label>
      <input id="su-uni-name" />
      <div class="error" id="err-uni-name"></div>
    </div>
  `;
}

function renderSchoolFields() {
  return `
    <div class="field">
      <label>${t("nationalId")}</label>
      <input id="su-id" />
      <div class="error" id="err-id"></div>
    </div>
    <div class="field">
      <label>${t("schoolName")}</label>
      <input id="su-school" />
      <div class="error" id="err-school"></div>
    </div>
    <div class="field">
      <label>${t("grade")}</label>
      <select id="su-grade">
        <option value="">--</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <div class="error" id="err-grade"></div>
    </div>
  `;
}

function bindAuthEvents() {
  const el = document.getElementById("screen-auth");
  const signinBtn = el.querySelector("#signin-btn");
  if (signinBtn) {
    signinBtn.onclick = () => {
      const username = el.querySelector("#signin-username").value.trim();
      if (username.toLowerCase() === "admin") {
        state.currentUser = { id: "admin", username: "admin", role: "Admin", universityId: "" };
      } else if (state.currentUser?.username === username && state.currentUser?.id !== "guest") {
        state.currentUser = { ...state.currentUser };
      } else {
        state.currentUser = {
          id: uid("user"),
          username: username || "Student",
          role: "Student",
          universityId: "",
        };
        if (!state.userProfile.educationLevel) {
          state.userProfile.educationLevel = "School";
        }
      }
      persistStore();
      if (isUniversityStudent()) {
        setRoute("dashboard");
      } else {
        setRoute("assessment");
      }
    };
  }
  const nextBtn = el.querySelector("#signup-next");
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (!state.form.userType) {
        el.querySelector("#signup-error").textContent = t("errorUserType");
        return;
      }
      state.signupStep = 2;
      renderAuth();
    };
  }
  const backBtn = el.querySelector("#signup-back");
  if (backBtn) {
    backBtn.onclick = () => {
      state.signupStep = 1;
      renderAuth();
    };
  }
  const createBtn = el.querySelector("#signup-create");
  if (createBtn) {
    createBtn.onclick = () => {
      const username = el.querySelector("#su-username")?.value?.trim() || "User";
      const isUniAdmin = state.form.userType === "universityAdmin";
      const isUniStudent = state.form.userType === "university";
      const uniName = el.querySelector("#su-uni-name")?.value?.trim() || "";
      const uniEmail = el.querySelector("#su-uni-email")?.value?.trim() || "";
      const uniId = isUniAdmin ? upsertUniversityProfileFromSignup({ name: uniName, email: uniEmail }) : "";
      state.currentUser = {
        id: uid("user"),
        username,
        role: isUniAdmin ? "UniversityAdmin" : isUniStudent ? "UniversityStudent" : "Student",
        universityId: uniId,
      };
      state.userProfile.educationLevel = isUniAdmin || isUniStudent ? "University" : "School";
      persistStore();
      if (isUniStudent) {
        setRoute("dashboard");
      } else {
        setRoute("assessment");
      }
    };
  }
  el.querySelectorAll("[data-user-type]").forEach((option) => {
    option.onclick = () => {
      state.form.userType = option.dataset.userType;
      renderAuth();
    };
  });
}

function renderAssessment() {
  const el = document.getElementById("screen-assessment");
  if (state.assessmentDone) {
    const scores = calculateScores();
    const top = getTopDomains(scores);
    el.innerHTML = `
      <div class="section-header">
        <h2>${t("assessmentTitle")}</h2>
      </div>
      <div class="card">
        <h3>${t("resultsTitle")}</h3>
        ${Object.keys(domains)
          .map(
            (key) => `
              <div style="margin:10px 0;">
                <strong>${domains[key][state.lang]}</strong>
                <div class="progress"><span style="width:${(scores[key] / 20) * 100}%"></span></div>
              </div>`
          )
          .join("")}
        <h4 style="margin-top:12px;">${t("topDomains")}</h4>
        <div class="skills">
          ${top.map((d) => `<span class="skill">${domains[d][state.lang]}</span>`).join("")}
        </div>
       
        <button class="btn" data-route="analysis">${t("continueAI")}</button>
      </div>
    `;
    el.querySelector("[data-route]").onclick = () => setRoute("analysis");
    return;
  }

  const pageSize = ASSESSMENT_PAGE_SIZE;
  const total = assessmentQuestions.length;
  const start = state.assessmentIndex;
  const end = Math.min(start + pageSize, total);
  const progress = (end / total) * 100;
  el.innerHTML = `
    <div class="section-header">
      <h2>${t("assessmentTitle")}</h2>
      <p>${t("assessmentSub")}</p>
      <p>${t("assessmentNote")}</p>
    </div>
    <div class="progress"><span style="width:${progress}%"></span></div>
    <div class="card" style="margin-top:16px;">
      <div class="meta">Questions ${start + 1} - ${end} / ${total}</div>
      <div class="question-grid" style="margin-top:12px;">
        ${assessmentQuestions.slice(start, end).map((q, localIdx) => {
          const qIndex = start + localIdx;
          const otherIndex = q.a.length;
          const otherSelected = state.assessmentAnswers[qIndex] === otherIndex;
          return `
            <div class="question-card">
              <div class="question-title">${q.q[state.lang]}</div>
              <div class="options compact" style="margin-top:10px;">
                ${q.a
                  .map(
                    (opt, idx) => `
                      <div class="option compact ${state.assessmentAnswers[qIndex] === idx ? "selected" : ""}" data-q="${qIndex}" data-answer="${idx}">
                        ${opt[state.lang] || opt.en}
                      </div>`
                  )
                  .join("")}
                <div class="option compact ${otherSelected ? "selected" : ""}" data-q="${qIndex}" data-answer="${otherIndex}">
                  ${t("otherOption")}
                </div>
              </div>
              ${otherSelected ? `
                <div class="field" style="margin-top:10px;">
                  <input class="input assess-other" data-q="${qIndex}" placeholder="${t("otherPlaceholder")}" value="${state.assessmentOtherAnswers[qIndex] || ""}" />
                </div>` : ""}
            </div>
          `;
        }).join("")}
      </div>
      <div class="error" id="assess-error"></div>
      <div style="display:flex; gap:12px; margin-top:16px;">
        <button class="btn ghost" id="assess-back">${t("back")}</button>
        <button class="btn" id="assess-next">${end === total ? t("finish") : t("next")}</button>
      </div>
    </div>
  `;
  el.querySelectorAll("[data-answer]").forEach((opt) => {
    opt.onclick = () => {
      const qIndex = Number(opt.dataset.q);
      state.assessmentAnswers[qIndex] = Number(opt.dataset.answer);
      renderAssessment();
    };
  });
  el.querySelectorAll(".assess-other").forEach((input) => {
    input.oninput = (e) => {
      const qIndex = Number(e.target.dataset.q);
      state.assessmentOtherAnswers[qIndex] = e.target.value;
    };
  });
  el.querySelector("#assess-back").onclick = () => {
    if (start > 0) {
      state.assessmentIndex = Math.max(0, start - pageSize);
      renderAssessment();
    }
  };
  const handleNext = () => {
    const result = validateAssessmentPage(start, end);
    if (!result.ok) {
      el.querySelector("#assess-error").textContent = t(result.errorKey);
      return;
    }
    if (end === total) {
      state.assessmentDone = true;
    } else {
      state.assessmentIndex = start + pageSize;
    }
    renderAssessment();
  };
  el.querySelector("#assess-next").onclick = handleNext;
  el.tabIndex = 0;
  if (document.activeElement === document.body) {
    el.focus();
  }
  el.onkeydown = (e) => {
    if (e.key !== "Enter") return;
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    e.preventDefault();
    handleNext();
  };
}

function isAnalysisComplete() {
  const env = state.environment;
  return (
    state.psychoDone &&
    env.internet &&
    env.location &&
    env.crisis &&
    env.market &&
    env.device
  );
}

function renderAnalysis() {
  const el = document.getElementById("screen-analysis");
  if (!state.assessmentDone) {
    el.innerHTML = `
      <div class="section-header">
        <h2>${t("analysisTitle")}</h2>
        <p>${t("analysisSub")}</p>
      </div>
      <div class="card center">
        <p>${t("analysisRequired")}</p>
        <button class="btn" data-route="assessment">${t("navAssess")}</button>
      </div>
    `;
    el.querySelector("[data-route]").onclick = () => setRoute("assessment");
    return;
  }

  if (state.analysisStep === 1) {
    const pageSize = PSYCHO_PAGE_SIZE;
    const total = psychoQuestions.length;
    const start = state.psychoIndex;
    const end = Math.min(start + pageSize, total);
    const progress = (end / total) * 100;
    el.innerHTML = `
      <div class="section-header">
        <span class="badge">${t("analysisTitle")}</span>
        <h2>${t("psychoTitle")}</h2>
        <p>${t("psychoSub")}</p>
      </div>
      <div class="progress"><span style="width:${progress}%"></span></div>
      <div class="card" style="margin-top:16px;">
        <div class="meta">${t("stepPsycho")} — ${start + 1} - ${end} / ${total}</div>
        <div class="question-grid" style="margin-top:12px;">
          ${psychoQuestions.slice(start, end).map((q, localIdx) => {
            const qIndex = start + localIdx;
            return `
              <div class="question-card">
                <div class="question-title">${q.q[state.lang]}</div>
                <div class="likert compact">
                  ${[1, 2, 3, 4, 5]
                    .map(
                      (value) => `
                        <button class="likert-option compact ${
                          state.psychoAnswers[qIndex] === value ? "selected" : ""
                        }" data-q="${qIndex}" data-likert="${value}">
                          <strong>${value}</strong>
                          <span>${t(`likert${value}`)}</span>
                        </button>`
                    )
                    .join("")}
                </div>
              </div>
            `;
          }).join("")}
        </div>
        <div class="error" id="psycho-error"></div>
        <div style="display:flex; gap:12px; margin-top:16px;">
          <button class="btn ghost" id="psycho-back">${t("back")}</button>
          <button class="btn" id="psycho-next">${
            end === total ? t("next") : t("next")
          }</button>
        </div>
      </div>
    `;
    el.querySelectorAll("[data-likert]").forEach((btn) => {
      btn.onclick = () => {
        const qIndex = Number(btn.dataset.q);
        state.psychoAnswers[qIndex] = Number(btn.dataset.likert);
        renderAnalysis();
      };
    });
    el.querySelector("#psycho-back").onclick = () => {
      if (start > 0) {
        state.psychoIndex = Math.max(0, start - pageSize);
        renderAnalysis();
      }
    };
    el.querySelector("#psycho-next").onclick = () => {
      const result = validatePsychoPage(start, end);
      if (!result.ok) {
        el.querySelector("#psycho-error").textContent = t(result.errorKey);
        return;
      }
      if (end === total) {
        state.psychoDone = true;
        state.analysisStep = 2;
      } else {
        state.psychoIndex = start + pageSize;
      }
      renderAnalysis();
    };
    return;
  }

  const profile = calculatePsychoProfile();
  const env = state.environment;
  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("analysisTitle")}</span>
      <h2>${t("environmentTitle")}</h2>
      <p>${t("environmentSub")}</p>
    </div>
    <div class="card">
      <h3>${t("psychoTitle")}</h3>
      <div class="stat-grid">
        <div class="stat-card">
          <span>${t("stressTolerance")}</span>
          <strong>${profile.levels.stress}</strong>
        </div>
        <div class="stat-card">
          <span>${t("focusStability")}</span>
          <strong>${profile.levels.focus}</strong>
        </div>
        <div class="stat-card">
          <span>${t("socialTolerance")}</span>
          <strong>${profile.levels.social}</strong>
        </div>
        <div class="stat-card">
          <span>${t("resilienceIndex")}</span>
          <strong>${profile.levels.resilience}</strong>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:16px;">
      <h3>${t("environmentTitle")}</h3>
      <div class="field">
        <label>${t("internetLabel")}</label>
        <select id="env-internet">
          <option value="">--</option>
          <option value="stable">${t("internetStable")}</option>
          <option value="limited">${t("internetLimited")}</option>
          <option value="offline">${t("internetOffline")}</option>
        </select>
      </div>
      <div class="field">
        <label>${t("locationLabel")}</label>
        <select id="env-location">
          <option value="">--</option>
          <option value="urban">${t("locationUrban")}</option>
          <option value="remote">${t("locationRemote")}</option>
          <option value="crisis">${t("locationCrisis")}</option>
        </select>
      </div>
      <div class="field">
        <label>${t("crisisLabel")}</label>
        <select id="env-crisis">
          <option value="">--</option>
          <option value="yes">${t("crisisYes")}</option>
          <option value="no">${t("crisisNo")}</option>
        </select>
      </div>
      <div class="field">
        <label>${t("marketLabel")}</label>
        <select id="env-market">
          <option value="">--</option>
          <option value="high">${t("marketHigh")}</option>
          <option value="medium">${t("marketMedium")}</option>
          <option value="low">${t("marketLow")}</option>
        </select>
      </div>
      <div class="field">
        <label>${t("deviceLabel")}</label>
        <select id="env-device">
          <option value="">--</option>
          <option value="laptop">${t("deviceLaptop")}</option>
          <option value="mobile">${t("deviceMobile")}</option>
        </select>
      </div>
      <div class="error" id="env-error"></div>
      <div style="display:flex; gap:12px;">
        <button class="btn ghost" id="env-back">${t("back")}</button>
        <button class="btn" id="env-finish">${t("generateRecs")}</button>
      </div>
    </div>
  `;
  const internetSelect = el.querySelector("#env-internet");
  const locationSelect = el.querySelector("#env-location");
  const crisisSelect = el.querySelector("#env-crisis");
  const marketSelect = el.querySelector("#env-market");
  const deviceSelect = el.querySelector("#env-device");
  internetSelect.value = env.internet || "";
  locationSelect.value = env.location || "";
  crisisSelect.value = env.crisis || "";
  marketSelect.value = env.market || "";
  deviceSelect.value = env.device || "";
  internetSelect.onchange = (e) => {
    state.environment.internet = e.target.value;
    onEnvironmentChange();
  };
  locationSelect.onchange = (e) => {
    state.environment.location = e.target.value;
    onEnvironmentChange();
  };
  crisisSelect.onchange = (e) => {
    state.environment.crisis = e.target.value;
    onEnvironmentChange();
  };
  marketSelect.onchange = (e) => {
    state.environment.market = e.target.value;
    onEnvironmentChange();
  };
  deviceSelect.onchange = (e) => {
    state.environment.device = e.target.value;
    onEnvironmentChange();
  };
  el.querySelector("#env-back").onclick = () => {
    state.analysisStep = 1;
    renderAnalysis();
  };
  el.querySelector("#env-finish").onclick = () => {
    if (!isAnalysisComplete()) {
      el.querySelector("#env-error").textContent = t("errorFix");
      return;
    }
    state.recsGenerated = true;
setRoute("recommendations");

  };
}

function renderArchitecture() {
  const el = document.getElementById("screen-architecture");
  const content = architectureContent[state.lang];
  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("architectureTitle")}</span>
      <h2>${t("architectureTitle")}</h2>
      <p>${t("architectureSub")}</p>
    </div>
    <div class="card" style="margin-bottom:16px;">
      <p>${content.intro}</p>
    </div>
    <div class="architecture-grid">
      ${content.layers
        .map(
          (layer) => `
            <div class="info-card">
              <h3>${layer.title}</h3>
              <div class="label">${t("purpose")}</div>
              <p>${layer.purpose}</p>
              <div class="label">${t("dataCollected")}</div>
              <ul>
                ${layer.data.map((item) => `<li>${item}</li>`).join("")}
              </ul>
              <div class="label">${t("output")}</div>
              <p>${layer.output}</p>
            </div>`
        )
        .join("")}
    </div>
    <div class="info-card" style="margin-top:16px;">
      <h3>${content.logic.title}</h3>
      <ul>
        ${content.logic.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
    <div class="info-card callout">
      <h3>${content.psychoBehavior.title}</h3>
      <p><strong>${content.psychoBehavior.text}</strong></p>
      <p>${content.psychoBehavior.example}</p>
    </div>
    <div class="architecture-grid">
      <div class="info-card">
        <h3>${content.crisis.title}</h3>
        <ul>
          ${content.crisis.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
      <div class="info-card">
        <h3>${content.exampleScores.title}</h3>
        <ul>
          ${content.exampleScores.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="info-card" style="margin-top:16px;">
      <h3>${content.why.title}</h3>
      <ul>
        ${content.why.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function inferDomainScores(text) {
  const scores = { T: 0, S: 0, B: 0, C: 0, H: 0, E: 0 };
  if (!text) return scores;
  const lower = text.toLowerCase();
  const has = (terms, source) => terms.some((term) => source.includes(term));
  const addScore = (key, matched) => {
    if (matched) scores[key] += 2;
  };

  addScore("T", has(["code", "coding", "program", "developer", "software", "ai", "data", "tech", "computer", "cyber", "robot", "network"], lower) ||
    has(["تقنية", "برمجة", "حاسوب", "تكنولوجيا", "شبكات", "ذكاء", "بيانات", "سيبراني", "روبوت"], text));
  addScore("S", has(["science", "lab", "research", "chemistry", "biology", "physics", "experiment"], lower) ||
    has(["علم", "مختبر", "بحث", "كيمياء", "أحياء", "فيزياء", "تجربة", "تجارب"], text));
  addScore("B", has(["business", "management", "marketing", "finance", "economics", "startup", "entrepreneur", "sales", "accounting"], lower) ||
    has(["أعمال", "إدارة", "تسويق", "مالية", "اقتصاد", "مشروع", "ريادة", "مبيعات", "محاسبة"], text));
  addScore("C", has(["design", "art", "creative", "media", "video", "ui", "ux", "graphics", "music", "writing"], lower) ||
    has(["تصميم", "فن", "إبداع", "وسائط", "مرئي", "جرافيك", "موسيقى", "كتابة"], text));
  addScore("H", has(["health", "medical", "nursing", "doctor", "pharmacy", "therapy", "clinic"], lower) ||
    has(["صحة", "طب", "تمريض", "صيدلة", "علاج", "عيادة"], text));
  addScore("E", has(["teach", "education", "training", "mentor", "school", "class", "tutor"], lower) ||
    has(["تعليم", "تدريس", "مدرس", "تربية", "شرح", "طلاب"], text));

  return scores;
}

function calculateScores() {
  const scores = { T: 0, S: 0, B: 0, C: 0, H: 0, E: 0 };
  assessmentQuestions.forEach((q, idx) => {
    const choice = state.assessmentAnswers[idx];
    if (choice == null) return;
    if (choice >= q.a.length) {
      const otherText = state.assessmentOtherAnswers[idx] || "";
      const inferred = inferDomainScores(otherText);
      Object.keys(inferred).forEach((key) => {
        scores[key] += inferred[key];
      });
    } else {
      const scoreMap = q.a[choice].s;
      Object.keys(scoreMap).forEach((key) => {
        scores[key] += scoreMap[key];
      });
    }
  });
  return scores;
}

function getTopDomains(scores) {
  return Object.keys(scores)
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 3);
}

function buildMajors(top) {
  const list = [];
  if (top.length === 0) return list;
  list.push(...majors[top[0]][state.lang].slice(0, 3));
  if (top.length > 1) {
    list.push(...majors[top[1]][state.lang].slice(0, 2));
  }
  return list;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function scoreToLevel(score) {
  if (score < 40) return t("low");
  if (score < 70) return t("medium");
  return t("high");
}

function calculateInterestVector() {
  const scores = calculateScores();
  const normalized = {};
  Object.keys(scores).forEach((key) => {
    normalized[key] = Math.round((scores[key] / 20) * 100);
  });
  return normalized;
}

function calculatePsychoProfile() {
  const buckets = { stress: [], focus: [], social: [], resilience: [] };
  psychoQuestions.forEach((q, idx) => {
    const raw = state.psychoAnswers[idx];
    if (raw == null) return;
    const adjusted = q.reverse ? 6 - raw : raw;
    buckets[q.cat].push(adjusted);
  });
  const scores = {};
  const levels = {};
  Object.keys(buckets).forEach((key) => {
    if (!buckets[key].length) {
      scores[key] = 50;
      levels[key] = scoreToLevel(50);
      return;
    }
    const avg = buckets[key].reduce((sum, v) => sum + v, 0) / buckets[key].length;
    const normalized = Math.round(((avg - 1) / 4) * 100);
    scores[key] = normalized;
    levels[key] = scoreToLevel(normalized);
  });
  return { scores, levels };
}

function addToBoard(item) {
  if (state.savedItems.some((x) => x.title === item.title)) return;
  state.savedItems.unshift(item);
}

function openMajor(majorId) {
  state.selectedMajorId = majorId;
  state.majorHubTab = "community"; 

 
  if (!state.game.unlockedLevelByMajor[majorId]) {
    state.game.unlockedLevelByMajor[majorId] = 1;
  }

  if (!state.game.starsByMajor) state.game.starsByMajor = {};
  if (!state.game.completedByMajor) state.game.completedByMajor = {};

  if (!state.game.starsByMajor[majorId]) state.game.starsByMajor[majorId] = {};
  if (!state.game.completedByMajor[majorId]) state.game.completedByMajor[majorId] = {};

  setRoute("major");
}

function showToast(text) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1400);
}

function starsToText(n) {
  const s = "★★★";
  if (n <= 0) return "☆☆☆";
  if (n === 1) return "★☆☆";
  if (n === 2) return "★★☆";
  return s;
}
function renderMajor() {
  const el = document.getElementById("screen-major");
  if (!el) return;

  const majorId = state.selectedMajorId;

  // Handle case where no major is selected
  if (!majorId) {
    el.innerHTML = `
      <div class="card center">
        <h3>${state.lang === "en" ? "No major selected yet." : "لم يتم اختيار تخصص بعد."}</h3>
        <button class="btn ghost" onclick="setRoute('recommendations')">${t("back")}</button>
      </div>
    `;
    return;
  }

  // Get Major Data
  const major = getMajorById(majorId); // Uses your existing helper
  const exp = majorExperience[majorId] || { story: {}, facts: {}, levels: [], workshops: [], videos: [] };

  const story = exp.story?.[state.lang] || (state.lang === "en" ? "Explore this major." : "استكشف هذا التخصص.");
  const facts = exp.facts?.[state.lang] || [];
  const videos = exp.videos || [];
  
  // Logic for Game/Levels
  if (!state.game) state.game = { unlockedLevelByMajor: {}, completedByMajor: {}, starsByMajor: {}, xp: 0 };
  if (!state.game.unlockedLevelByMajor[majorId]) state.game.unlockedLevelByMajor[majorId] = 1;
  const nextLevelId = state.game.unlockedLevelByMajor[majorId];
  const lvl = (exp.levels || []).find((x) => x.id === nextLevelId) || (exp.levels || [])[0];

  // Helper to render Save Button
  function renderSaveButton(item) {
    const exists = state.savedItems.some((x) => x.type === item.type && x.title === item.title);
    return `
      <button class="btn ghost" onclick='toggleSaveItem(${JSON.stringify(item).replace(/'/g, "&#39;")})'>
        ${exists ? (state.lang === "en" ? "Saved ✓" : "تم الحفظ ✓") : (state.lang === "en" ? "Save" : "حفظ")}
      </button>
    `;
  }

  const tab = state.majorHubTab;

  el.innerHTML = `
    <div class="section-header">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <button class="btn ghost small" onclick="setRoute('recommendations')">${t("back")}</button>
        <span class="badge">${t("recBadge")}</span>
      </div>
      <h2>${major?.title?.[state.lang] || majorId}</h2>
      <p style="max-width:720px;margin:auto;">${story}</p>
    </div>

    <div class="card" style="margin-bottom:16px; padding: 10px;">
      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
        <button class="btn ${tab === "community" ? "" : "secondary"}" onclick="switchMajorTab('community')">
          ${state.lang === "en" ? "Community" : "المجتمع"}
        </button>
        <button class="btn ${tab === "workshops" ? "" : "secondary"}" onclick="switchMajorTab('workshops')">
          ${state.lang === "en" ? "Workshops" : "الورش"}
        </button>
        <button class="btn ${tab === "videos" ? "" : "secondary"}" onclick="switchMajorTab('videos')">
          ${state.lang === "en" ? "Videos" : "الفيديوهات"}
        </button>
        <button class="btn ${tab === "game" ? "" : "secondary"}" onclick="switchMajorTab('game')">
          ${state.lang === "en" ? "Game Levels" : "مستويات اللعبة"}
        </button>
        <button class="btn ${tab === "saved" ? "" : "secondary"}" onclick="switchMajorTab('saved')">
          ${state.lang === "en" ? "Saved Board" : "المحفوظات"}
        </button>
      </div>
    </div>

    <div class="major-content">
      
      ${tab === "community" ? renderCommunity() : ""}

      ${tab === "workshops" ? `
        <h3>${state.lang === "en" ? "University Workshops" : "ورش الجامعات"}</h3>
        <div style="margin-top:12px; display:grid; gap:12px;">
          ${getWorkshopsForMajor(majorId).length ? getWorkshopsForMajor(majorId).map(w => `
            <div class="info-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <strong>${w.title}</strong>
                  <div style="color:#666; font-size:13px; margin-top:4px;">${w.date} • ${w.location}</div>
                </div>
                ${renderSaveButton({type: 'workshop', title: w.title, uni: w.university_id, date: w.date})}
              </div>
            </div>
          `).join('') : `<p>${state.lang === "en" ? "No workshops found." : "لا توجد ورش."}</p>`}
        </div>
      ` : ""}

      ${tab === "videos" ? `
        <h3>${state.lang === "en" ? "Related Videos" : "فيديوهات ذات صلة"}</h3>
        <div style="margin-top:12px; display:grid; gap:12px;">
          ${videos.length ? videos.map(v => `
            <div class="info-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <strong>${v.title}</strong>
                  <div style="color:#666; font-size:13px; margin-top:4px;">${v.source} • ${v.duration}</div>
                </div>
                ${renderSaveButton({type: 'video', title: v.title, source: v.source, duration: v.duration})}
              </div>
            </div>
          `).join('') : `<p>${state.lang === "en" ? "No videos found." : "لا توجد فيديوهات."}</p>`}
        </div>
      ` : ""}

      ${tab === "game" ? `
        <h3>${state.lang === "en" ? "Game Level" : "مستوى اللعبة"}</h3>
        <div class="info-card center" style="margin-top:20px; padding:30px;">
          ${lvl ? `
            <h3>${lvl.title[state.lang]}</h3>
            <p style="margin-bottom:20px;">${state.lang === 'en' ? 'Complete this level to earn XP.' : 'أكمل المستوى لكسب نقاط الخبرة.'}</p>
            <button class="btn" onclick="launchExternalGame({majorId: '${majorId}', levelId: ${lvl.id}})">
              ${state.lang === 'en' ? 'Start Level' : 'ابدأ المستوى'}
            </button>
          ` : `<p>${state.lang === 'en' ? 'No levels available.' : 'لا توجد مستويات.'}</p>`}
        </div>
      ` : ""}

      ${tab === "saved" ? `
        <h3>${state.lang === "en" ? "Saved Board" : "لوحة المحفوظات"}</h3>
        <div style="margin-top:12px; display:grid; gap:12px;">
           ${state.savedItems.length ? state.savedItems.map((item, idx) => `
             <div class="info-card">
               <strong>${item.title}</strong>
               <button class="btn ghost small" onclick="toggleSaveItem(null, ${idx})" style="float:${state.lang === 'en'?'right':'left'}">
                 ${state.lang === 'en' ? 'Remove' : 'إزالة'}
               </button>
             </div>
           `).join('') : `<p>${state.lang === "en" ? "Nothing saved yet." : "لا يوجد شيء محفوظ."}</p>`}
        </div>
      ` : ""}
    </div>
  `;
}

// Helper to switch tabs
function switchMajorTab(tabName) {
  state.majorHubTab = tabName;
  renderMajor();
}

// Helper to toggle saved items
function toggleSaveItem(item, removeIdx = null) {
  if (removeIdx !== null) {
    state.savedItems.splice(removeIdx, 1);
  } else {
    const existsIdx = state.savedItems.findIndex(x => x.title === item.title);
    if (existsIdx >= 0) state.savedItems.splice(existsIdx, 1);
    else state.savedItems.push(item);
  }
  renderMajor();
}
/* -------------------------------------------------------------------------- */
/* COMMUNITY FEATURE LOGIC                                                    */
/* -------------------------------------------------------------------------- */

function renderCommunity() {
  const posts = state.communityPosts; 
  const canPost = !isUniversityStudent();

  return `
    ${
      canPost
        ? `<div class="card" style="border-left: 4px solid var(--primary); margin-bottom: 24px;">
            <h3>${state.lang === 'en' ? 'Ask a University Student' : 'اسأل طالب جامعي'}</h3>
            <p style="color:#666; font-size:0.9rem; margin-bottom:12px;">
              ${state.lang === 'en' 
                ? 'Connect directly with verified students studying this major.' 
                : 'تواصل مباشرة مع طلاب جامعيين يدرسون هذا التخصص.'}
            </p>
            
            <div class="field">
              <textarea id="new-post-text" class="input" rows="3" 
                placeholder="${state.lang === 'en' ? 'Type your question here...' : 'اكتب سؤالك هنا...'}"></textarea>
            </div>
            <div style="display:flex; justify-content:flex-end;">
              <button class="btn small" onclick="addCommunityPost()">
                ${state.lang === 'en' ? 'Post Question' : 'نشر السؤال'}
              </button>
            </div>
          </div>`
        : `<div class="card" style="margin-bottom: 24px;">
            <h3>${state.lang === 'en' ? 'Community' : 'المجتمع'}</h3>
            <p style="color:#666; font-size:0.9rem;">
              ${state.lang === 'en' ? 'University students can view community posts only.' : 'طلاب الجامعات يستطيعون عرض المنشورات فقط.'}
            </p>
          </div>`
    }

    <div class="feed">
      ${posts.length === 0 
        ? `<div class="card center"><p>${state.lang === 'en' ? 'No questions yet.' : 'لا توجد أسئلة بعد.'}</p></div>` 
        : posts.map(post => renderPostCard(post)).join('')}
    </div>
  `;
}

function renderPostCard(post) {
  const isUni = post.role === 'University';
  const badgeClass = isUni ? 'success' : 'secondary';
  const badgeText = isUni 
    ? (state.lang === 'en' ? 'University Student' : 'طالب جامعي')
    : (state.lang === 'en' ? 'High School Student' : 'طالب مدرسة');
  const canReply = !isUniversityStudent();

  return `
    <div class="card" style="margin-bottom: 16px; padding: 18px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; background:${isUni ? '#e3f2fd' : '#f5f5f5'}; color:${isUni ? '#1976d2' : '#757575'}; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">
            ${post.author.charAt(0)}
          </div>
          <div>
            <div style="font-weight:bold; font-size:0.95rem;">${post.author}</div>
            <span class="badge ${badgeClass}" style="font-size:0.7rem; padding:2px 8px;">${badgeText}</span>
          </div>
        </div>
      </div>

      <p style="font-size:1.05rem; line-height:1.5; color:#333; margin-bottom:14px;">
        ${post.text}
      </p>

      <div style="display:flex; gap:16px; font-size:0.9rem; color:#666; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:12px;">
        <span onclick="likePost(${post.id})" style="cursor:pointer; display:flex; align-items:center; gap:5px;">
          ❤️ ${post.likes}
        </span>
        <span style="display:flex; align-items:center; gap:5px;">
          💬 ${post.replies.length} ${state.lang === 'en' ? 'Replies' : 'ردود'}
        </span>
      </div>

      <div class="replies" style="background:#fafafa; border-radius:8px; padding:12px;">
        ${post.replies.map(reply => `
          <div class="reply" style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid #eee;">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
              <strong style="font-size:0.9rem; color:${reply.role === 'University' ? '#1976d2' : '#444'}">
                ${reply.author}
              </strong>
              ${reply.role === 'University' ? '✅' : ''}
            </div>
            <div style="font-size:0.95rem;">${reply.text}</div>
          </div>
        `).join('')}

        ${
          canReply
            ? `<div style="display:flex; gap:8px; margin-top:8px;">
                <input type="text" id="reply-input-${post.id}" 
                  placeholder="${state.lang === 'en' ? 'Write a reply...' : 'اكتب ردك...'}" 
                  style="flex:1; border:1px solid #ddd; border-radius:20px; padding:8px 12px; font-size:0.9rem;">
                <button class="btn ghost small" onclick="addReply(${post.id})">➤</button>
              </div>`
            : ""
        }
      </div>
    </div>
  `;
}

// Logic Functions
function addCommunityPost() {
  if (isUniversityStudent()) return;
  const input = document.getElementById('new-post-text');
  const text = input.value.trim();
  if (!text) return;

  const newPost = {
    id: Date.now(),
    author: state.currentUser.username || "Guest",
    role: state.currentUser.role || "Student",
    major: state.selectedMajorId,
    text: text,
    likes: 0,
    replies: []
  };

  state.communityPosts.unshift(newPost);
  persistStore();
  renderMajor();
}

function addReply(postId) {
  if (isUniversityStudent()) return;
  const input = document.getElementById(`reply-input-${postId}`);
  const text = input.value.trim();
  if (!text) return;

  const post = state.communityPosts.find(p => p.id === postId);
  if (post) {
    post.replies.push({
      author: state.currentUser.username || "Guest",
      role: state.currentUser.role || "Student",
      text: text
    });
    persistStore();
    renderMajor();
  }
}

function likePost(postId) {
  const post = state.communityPosts.find(p => p.id === postId);
  if (post) {
    post.likes++;
    renderMajor();
  }
}

function renderUniversities() {
  const el = document.getElementById("screen-universities");
  if (!el) return;
  ensureNajahUniversity();
  const filterGov = state.universityFilters.governorate;
  const filterMajor = state.universityFilters.major;
  const visibleUniversities = state.universities.filter((u) => u.verified || canManageUniversity(u.id) || isAdmin());
  const matchesMajorFilter = (u) => {
    if (!filterMajor) return true;
    return u.majors.includes(filterMajor);
  };
  const matchesGovFilter = (u) => !filterGov || u.location.governorate === filterGov;
  const universities = visibleUniversities.filter((u) => matchesGovFilter(u) && matchesMajorFilter(u));
  const closestUniversities = filterGov ? visibleUniversities.filter((u) => u.location.governorate === filterGov) : [];
  const closestFallback = filterGov && !closestUniversities.length ? visibleUniversities : [];
  const needsProfile = isUniversityAdmin() && !getUniversityById(state.currentUser.universityId);
  const pendingUniversities = state.universities.filter((u) => !u.verified);
  const pendingWorkshops = state.workshops.filter((w) => !w.approved);

  const renderUniversityCard = (u, badgeLabel) => {
    const majorsLabel = u.majors.slice(0, 3).map((id) => getMajorTitle(id)).join(" • ");
    return `
      <div class="info-card">
        <div class="uni-card">
          <img src="${u.logo}" alt="${u.name[state.lang]}" />
          <div>
            <strong>${u.name[state.lang]}</strong>
            <div class="meta-line">${u.location.governorate || "--"} • ${u.location.city || "--"}</div>
            <div class="meta-line">${majorsLabel || "--"}</div>
            <div class="badge-row">
              ${u.verified ? `<span class="pill success">${t("verified")}</span>` : `<span class="pill warn">${t("pendingVerification")}</span>`}
              ${badgeLabel ? `<span class="pill info">${badgeLabel}</span>` : ""}
            </div>
          </div>
        </div>
        <div style="margin-top:12px;">
          <button class="btn ghost" data-action="open-uni" data-id="${u.id}">${t("universityProfile")}</button>
        </div>
      </div>
    `;
  };

  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("universitiesTitle")}</span>
      <h2>${t("universitiesTitle")}</h2>
      <p>${t("universitiesSub")}</p>
    </div>
    <div class="card filter-row">
      <div class="field">
        <label>${t("locationLabelUser")}</label>
        <select id="uni-filter-gov">
          <option value="">--</option>
          ${GOVERNORATES.map((g) => `<option value="${g}" ${g === filterGov ? "selected" : ""}>${g}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label>${t("availableMajors")}</label>
        <select id="uni-filter-major">
          <option value="">--</option>
          ${majorCatalog.map((m) => `<option value="${m.id}" ${m.id === filterMajor ? "selected" : ""}>${m.title[state.lang]}</option>`).join("")}
        </select>
      </div>
      <div class="meta-note">${t("privacyNote")}</div>
    </div>

    ${
      needsProfile
        ? `<div class="card center" style="margin-top:16px;">
            <h3>${t("createProfile")}</h3>
            <p>${state.lang === "en" ? "Create a verified university profile to start publishing." : "أنشئ بروفايل جامعة موثّق للبدء بالنشر."}</p>
            <button class="btn" data-action="create-uni-profile">${t("createProfile")}</button>
          </div>`
        : ""
    }

    ${
      isAdmin() && (pendingUniversities.length || pendingWorkshops.length)
        ? `<div class="card" style="margin-top:16px;">
            <h3>${t("adminModeration")}</h3>
            <div class="moderation-list">
              ${pendingUniversities
                .map(
                  (u) => `
                    <div class="moderation-item">
                      <span>${u.name[state.lang]}</span>
                      <button class="btn secondary" data-action="approve-uni" data-id="${u.id}">${t("approve")}</button>
                    </div>`
                )
                .join("")}
              ${pendingWorkshops
                .map(
                  (w) => `
                    <div class="moderation-item">
                      <span>${w.title}</span>
                      <button class="btn secondary" data-action="approve-workshop" data-id="${w.workshop_id}">${t("approve")}</button>
                    </div>`
                )
                .join("")}
            </div>
          </div>`
        : ""
    }

    ${
      filterGov
        ? `<div style="margin-top:18px;">
            <h3 style="margin-bottom:10px;">${t("closestToYou")}</h3>
            <div class="grid-3">
              ${
                closestUniversities.length
                  ? closestUniversities.map((u) => renderUniversityCard(u, t("closestToYou"))).join("")
                  : `<div class="card center">
                      ${t("noNearby")}
                      ${closestFallback.length ? `<div class="meta-note">${t("showingAll")}</div>` : ""}
                    </div>`
              }
            </div>
            ${
              !closestUniversities.length && closestFallback.length
                ? `<div class="grid-3" style="margin-top:12px;">
                    ${closestFallback.map((u) => renderUniversityCard(u, t("closestToYou"))).join("")}
                  </div>`
                : ""
            }
          </div>`
        : ""
    }

    ${
      !filterGov
        ? `<div class="grid-3" style="margin-top:18px;">
            ${
              universities.length
                ? universities.map((u) => renderUniversityCard(u, "")).join("")
                : `<div class="card center">${state.lang === "en" ? "No universities found." : "لا توجد جامعات مطابقة."}</div>`
            }
          </div>`
        : ""
    }
  `;

  const govSelect = el.querySelector("#uni-filter-gov");
  const majorSelect = el.querySelector("#uni-filter-major");
  if (govSelect) {
    govSelect.onchange = (e) => {
      state.universityFilters.governorate = e.target.value;
      renderUniversities();
    };
  }
  if (majorSelect) {
    majorSelect.onchange = (e) => {
      state.universityFilters.major = e.target.value;
      renderUniversities();
    };
  }
  el.querySelectorAll("[data-action='open-uni']").forEach((btn) => {
    btn.onclick = () => openUniversity(btn.dataset.id);
  });
  el.querySelectorAll("[data-action='approve-uni']").forEach((btn) => {
    btn.onclick = () => {
      const uni = getUniversityById(btn.dataset.id);
      if (uni) {
        uni.verified = true;
        persistStore();
        renderUniversities();
      }
    };
  });
  el.querySelectorAll("[data-action='approve-workshop']").forEach((btn) => {
    btn.onclick = () => {
      const workshop = getWorkshopById(btn.dataset.id);
      if (workshop) {
        workshop.approved = true;
        persistStore();
        notifyWorkshopPublished(workshop);
        renderUniversities();
      }
    };
  });
  el.querySelectorAll("[data-action='create-uni-profile']").forEach((btn) => {
    btn.onclick = () => {
      state.selectedUniversityId = state.currentUser.universityId;
      state.ui.editingUniversity = true;
      setRoute("university");
    };
  });
}

function renderUniversityProfile() {
  const el = document.getElementById("screen-university");
  if (!el) return;
  if (!state.selectedUniversityId && state.currentUser?.universityId) {
    state.selectedUniversityId = state.currentUser.universityId;
  }
  const uni = getUniversityById(state.selectedUniversityId);
  if (!uni) {
    el.innerHTML = `
      <div class="card center">
        <h3>${state.lang === "en" ? "Select a university first." : "اختر جامعة أولًا."}</h3>
        <button class="btn ghost" data-route="universities">${t("back")}</button>
      </div>
    `;
    el.querySelector("[data-route]").onclick = () => setRoute("universities");
    return;
  }

  const canEdit = canManageUniversity(uni.id);
  const isEditing = state.ui.editingUniversity && canEdit;
  const uniWorkshops = state.workshops.filter((w) => w.university_id === uni.id && canSeeWorkshop(w));
  const editingWorkshop = state.ui.editingWorkshopId ? getWorkshopById(state.ui.editingWorkshopId) : null;

  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("universityProfile")}</span>
      <h2>${uni.name[state.lang]}</h2>
      <p>${uni.location.governorate || "--"} • ${uni.location.city || "--"}</p>
    </div>

    <div class="card">
      <div class="uni-card">
        <img src="${uni.logo}" alt="${uni.name[state.lang]}" />
        <div>
          <div class="badge-row">
            ${uni.verified ? `<span class="pill success">${t("verified")}</span>` : `<span class="pill warn">${t("pendingVerification")}</span>`}
          </div>
          <div class="meta-line">${t("availableMajors")}: ${uni.majors.map((id) => getMajorTitle(id)).join(" • ") || "--"}</div>
          <div class="meta-line">${t("targetAudience")}: ${uni.targetAudience.join(" • ") || "--"}</div>
          <div class="meta-line">${t("contactInfo")}: ${uni.contact.email || "--"} ${uni.contact.website ? `• ${uni.contact.website}` : ""}</div>
        </div>
      </div>
      ${
        canEdit
          ? `<div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
              <button class="btn ghost" data-action="toggle-edit">${isEditing ? (state.lang === "en" ? "Cancel" : "إلغاء") : t("editProfile")}</button>
              <button class="btn secondary" data-action="delete-profile">${state.lang === "en" ? "Delete profile" : "حذف البروفايل"}</button>
            </div>`
          : ""
      }
    </div>

    ${
      isEditing
        ? `<div class="card" style="margin-top:16px;">
            <h3>${t("editProfile")}</h3>
            <div class="grid-2">
              <div class="field">
                <label>${state.lang === "en" ? "University name" : "اسم الجامعة"}</label>
                <input id="uni-name" value="${uni.name.en}" />
              </div>
              <div class="field">
                <label>${state.lang === "en" ? "Logo URL" : "رابط الشعار"}</label>
                <input id="uni-logo" value="${uni.logo}" />
              </div>
              <div class="field">
                <label>${state.lang === "en" ? "Governorate" : "المحافظة"}</label>
                <select id="uni-gov">
                  <option value="">--</option>
                  ${GOVERNORATES.map((g) => `<option value="${g}" ${g === uni.location.governorate ? "selected" : ""}>${g}</option>`).join("")}
                </select>
              </div>
              <div class="field">
                <label>${state.lang === "en" ? "City" : "المدينة"}</label>
                <input id="uni-city" value="${uni.location.city || ""}" />
              </div>
            </div>
              <div class="field">
                <label>${t("availableMajors")}</label>
                <div class="chip-grid" id="uni-majors">
                ${majorCatalog
                  .map(
                    (m) => `
                      <label class="chip">
                        <input type="checkbox" value="${m.id}" ${uni.majors.includes(m.id) ? "checked" : ""} />
                        ${m.title[state.lang]}
                      </label>`
                  )
                  .join("")}
              </div>
            </div>
            <div class="field">
              <label>${t("targetAudience")}</label>
                <div class="chip-grid" id="uni-audience">
                  ${AUDIENCE_LEVELS.map(
                  (lvl) => `
                    <label class="chip">
                      <input type="checkbox" value="${lvl}" ${uni.targetAudience.includes(lvl) ? "checked" : ""} />
                      ${formatTargetLevel(lvl)}
                    </label>`
                ).join("")}
              </div>
            </div>
            <div class="grid-2">
              <div class="field">
                <label>Email</label>
                <input id="uni-email" value="${uni.contact.email || ""}" />
              </div>
              <div class="field">
                <label>Website</label>
                <input id="uni-website" value="${uni.contact.website || ""}" />
              </div>
            </div>
            ${isAdmin() ? `<div class="field"><label><input type="checkbox" id="uni-verified" ${uni.verified ? "checked" : ""} /> ${t("verified")}</label></div>` : ""}
            <button class="btn" data-action="save-profile">${t("saveChanges")}</button>
          </div>`
        : ""
    }

    <div class="card" style="margin-top:16px;">
      <h3>${t("workshopBoard")}</h3>
      ${
        canEdit
          ? `<div style="margin-top:12px;">
              <h4>${editingWorkshop ? t("editWorkshop") : t("createWorkshop")}</h4>
              <div class="grid-2">
                <div class="field">
                  <label>${state.lang === "en" ? "Title" : "العنوان"}</label>
                  <input id="ws-title" value="${editingWorkshop?.title || ""}" />
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Major category" : "التخصص"}</label>
                  <select id="ws-major">
                    ${majorCatalog
                      .map((m) => `<option value="${m.id}" ${editingWorkshop?.major_category === m.id ? "selected" : ""}>${m.title[state.lang]}</option>`)
                      .join("")}
                  </select>
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Target level" : "المستوى المستهدف"}</label>
                  <select id="ws-level">
                    ${TARGET_LEVELS.map((lvl) => `<option value="${lvl}" ${editingWorkshop?.target_level === lvl ? "selected" : ""}>${formatTargetLevel(lvl)}</option>`).join("")}
                  </select>
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Date" : "التاريخ"}</label>
                  <input id="ws-date" type="date" value="${editingWorkshop?.date || ""}" />
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Start time" : "وقت البدء"}</label>
                  <input id="ws-time" type="time" value="${editingWorkshop?.start_time || ""}" />
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Duration" : "المدة"}</label>
                  <input id="ws-duration" value="${editingWorkshop?.duration || ""}" />
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Location mode" : "نوع الحضور"}</label>
                  <select id="ws-location">
                    ${WORKSHOP_LOCATIONS.map((loc) => `<option value="${loc}" ${editingWorkshop?.location === loc ? "selected" : ""}>${loc}</option>`).join("")}
                  </select>
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Governorate" : "المحافظة"}</label>
                  <select id="ws-gov">
                    ${GOVERNORATES.map((g) => `<option value="${g}" ${editingWorkshop?.governorate === g ? "selected" : ""}>${g}</option>`).join("")}
                  </select>
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Max participants" : "الحد الأقصى للمشاركين"}</label>
                  <input id="ws-max" type="number" min="0" value="${editingWorkshop?.max_participants || 0}" />
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Registration required" : "يتطلب تسجيل"}</label>
                  <select id="ws-reg">
                    <option value="true" ${editingWorkshop?.registration_required ? "selected" : ""}>true</option>
                    <option value="false" ${editingWorkshop && !editingWorkshop.registration_required ? "selected" : ""}>false</option>
                  </select>
                </div>
                <div class="field">
                  <label>${t("workshopStatus")}</label>
                  <select id="ws-status">
                    ${WORKSHOP_STATUSES.map((s) => `<option value="${s}" ${editingWorkshop?.status === s ? "selected" : ""}>${formatWorkshopStatus(s)}</option>`).join("")}
                  </select>
                </div>
                <div class="field">
                  <label>${state.lang === "en" ? "Recording URL" : "رابط التسجيل"}</label>
                  <input id="ws-recording" value="${editingWorkshop?.recording_url || ""}" />
                </div>
              </div>
              <div class="field">
                <label>${state.lang === "en" ? "Description" : "الوصف"}</label>
                <textarea id="ws-desc" rows="3">${editingWorkshop?.description || ""}</textarea>
              </div>
              <button class="btn" data-action="save-workshop">${editingWorkshop ? t("saveChanges") : t("createWorkshop")}</button>
            </div>`
          : `<p class="meta-note">${state.lang === "en" ? "Only university admins can publish workshops." : "النشر متاح فقط لمسؤولي الجامعات."}</p>`
      }

      <div style="margin-top:16px; display:grid; gap:12px;">
        ${
          uniWorkshops.length
            ? uniWorkshops
                .map((w) => {
                  const statusLabel = formatWorkshopStatus(w.status);
                  const approvals = w.approved ? `<span class="pill success">${t("approved")}</span>` : `<span class="pill warn">${t("pendingVerification")}</span>`;
                  return `
                    <div class="info-card">
                      <strong>${w.title}</strong>
                      <div class="meta-line">${statusLabel} • ${w.location} • ${w.date}</div>
                      <div class="badge-row">${approvals}</div>
                      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
                        <button class="btn ghost" data-action="open-workshop" data-id="${w.workshop_id}">${t("workshopDetails")}</button>
                        ${
                          canEdit
                            ? `<button class="btn secondary" data-action="edit-workshop" data-id="${w.workshop_id}">${t("editWorkshop")}</button>`
                            : ""
                        }
                      </div>
                    </div>
                  `;
                })
                .join("")
            : `<p>${state.lang === "en" ? "No workshops yet." : "لا توجد ورش بعد."}</p>`
        }
      </div>
    </div>

    <div style="display:flex;justify-content:center;gap:12px;margin-top:18px;flex-wrap:wrap;">
      <button class="btn ghost" data-route="universities">${t("back")}</button>
    </div>
  `;

  el.querySelector("[data-route]").onclick = () => setRoute("universities");

  const toggleBtn = el.querySelector("[data-action='toggle-edit']");
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      state.ui.editingUniversity = !state.ui.editingUniversity;
      renderUniversityProfile();
    };
  }
  const deleteBtn = el.querySelector("[data-action='delete-profile']");
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      state.universities = state.universities.filter((u) => u.id !== uni.id);
      if (state.currentUser?.universityId === uni.id) {
        state.currentUser.universityId = "";
      }
      persistStore();
      setRoute("universities");
    };
  }

  const saveProfileBtn = el.querySelector("[data-action='save-profile']");
  if (saveProfileBtn) {
    saveProfileBtn.onclick = () => {
      const name = el.querySelector("#uni-name").value.trim();
      const logo = el.querySelector("#uni-logo").value.trim() || "assets/logo.png";
      const gov = el.querySelector("#uni-gov").value;
      const city = el.querySelector("#uni-city").value.trim();
      const majors = Array.from(el.querySelectorAll("#uni-majors input[type='checkbox']")).filter((c) => c.checked && c.value).map((c) => c.value);
      const targetAudience = Array.from(el.querySelectorAll("#uni-audience input[type='checkbox']")).filter((c) => c.checked && AUDIENCE_LEVELS.includes(c.value)).map((c) => c.value);
      const email = el.querySelector("#uni-email").value.trim();
      const website = el.querySelector("#uni-website").value.trim();
      uni.name = { en: name || uni.name.en, ar: name || uni.name.ar };
      uni.logo = logo;
      uni.location = { governorate: gov, city };
      uni.majors = majors;
      uni.targetAudience = targetAudience.length ? targetAudience : uni.targetAudience;
      uni.contact = { email, website };
      if (isAdmin()) {
        uni.verified = !!el.querySelector("#uni-verified")?.checked;
      }
      state.ui.editingUniversity = false;
      persistStore();
      renderUniversityProfile();
    };
  }

  el.querySelectorAll("[data-action='open-workshop']").forEach((btn) => {
    btn.onclick = () => openWorkshop(btn.dataset.id);
  });
  el.querySelectorAll("[data-action='edit-workshop']").forEach((btn) => {
    btn.onclick = () => {
      state.ui.editingWorkshopId = btn.dataset.id;
      renderUniversityProfile();
    };
  });

  const saveWorkshopBtn = el.querySelector("[data-action='save-workshop']");
  if (saveWorkshopBtn) {
    saveWorkshopBtn.onclick = () => {
      const isEdit = !!state.ui.editingWorkshopId;
      const workshop = isEdit ? getWorkshopById(state.ui.editingWorkshopId) : null;
      const data = {
        workshop_id: workshop?.workshop_id || uid("ws"),
        university_id: uni.id,
        title: el.querySelector("#ws-title").value.trim(),
        description: el.querySelector("#ws-desc").value.trim(),
        major_category: el.querySelector("#ws-major").value,
        target_level: el.querySelector("#ws-level").value,
        date: el.querySelector("#ws-date").value,
        start_time: el.querySelector("#ws-time").value,
        duration: el.querySelector("#ws-duration").value,
        location: el.querySelector("#ws-location").value,
        governorate: el.querySelector("#ws-gov").value,
        max_participants: Number(el.querySelector("#ws-max").value) || 0,
        registration_required: el.querySelector("#ws-reg").value === "true",
        recording_url: el.querySelector("#ws-recording").value.trim(),
        status: el.querySelector("#ws-status").value,
        approved: workshop ? workshop.approved : false,
      };
      if (isEdit && workshop) {
        Object.assign(workshop, data);
      } else {
        state.workshops.unshift(data);
      }
      state.ui.editingWorkshopId = "";
      persistStore();
      if (data.approved) {
        notifyWorkshopPublished(data);
      }
      if (data.status === "Finished") {
        notifyRecordingForGaza(data);
      }
      renderUniversityProfile();
    };
  }
}

function renderWorkshopDetails() {
  const el = document.getElementById("screen-workshop");
  if (!el) return;
  const workshop = getWorkshopById(state.selectedWorkshopId);
  if (!workshop) {
    el.innerHTML = `
      <div class="card center">
        <h3>${state.lang === "en" ? "Workshop not found." : "الورشة غير موجودة."}</h3>
        <button class="btn ghost" data-route="universities">${t("back")}</button>
      </div>
    `;
    el.querySelector("[data-route]").onclick = () => setRoute("universities");
    return;
  }
  const uni = getUniversityById(workshop.university_id);
  const isRegistered = state.userEngagement.registrations.includes(workshop.workshop_id);
  const isAttended = state.userEngagement.attendance.includes(workshop.workshop_id);
  const canEdit = canManageUniversity(workshop.university_id);
  const recordingVisible = workshop.status === "Finished" && workshop.recording_url;

  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("workshopDetails")}</span>
      <h2>${workshop.title}</h2>
      <p>${uni ? uni.name[state.lang] : "--"} • ${workshop.governorate} • ${formatWorkshopStatus(workshop.status)}</p>
    </div>
    <div class="card">
      <div class="meta-line">${workshop.description || "--"}</div>
      <div class="stat-grid" style="margin-top:12px;">
        <div class="stat-card"><span>${t("workshopStatus")}</span><strong>${formatWorkshopStatus(workshop.status)}</strong></div>
        <div class="stat-card"><span>${state.lang === "en" ? "Target" : "المستهدف"}</span><strong>${formatTargetLevel(workshop.target_level)}</strong></div>
        <div class="stat-card"><span>${state.lang === "en" ? "Date" : "التاريخ"}</span><strong>${workshop.date} ${workshop.start_time || ""}</strong></div>
      </div>
      <div class="meta-note" style="margin-top:10px;">
        ${workshop.location} • ${workshop.duration || "--"} • ${state.lang === "en" ? "Max participants" : "الحد الأقصى"}: ${workshop.max_participants || "--"}
      </div>
      ${
        recordingVisible
          ? `<div class="meta-note"><a href="${workshop.recording_url}" target="_blank">${t("recordingAvailable")}</a></div>`
          : workshop.recording_url
            ? `<div class="meta-note">${t("recordingHidden")}</div>`
            : ""
      }
      <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
        ${
          workshop.registration_required
            ? `<button class="btn ${isRegistered ? "secondary" : ""}" data-action="register-workshop" data-id="${workshop.workshop_id}">
                ${isRegistered ? t("registered") : t("register")}
              </button>`
            : ""
        }
        ${
          workshop.status === "Finished"
            ? `<button class="btn ghost" data-action="mark-attended" data-id="${workshop.workshop_id}">
                ${isAttended ? t("attendanceRecorded") : t("markAttended")}
              </button>`
            : ""
        }
        ${canEdit ? `<button class="btn secondary" data-action="edit-workshop">${t("editWorkshop")}</button>` : ""}
      </div>
    </div>
    <div style="display:flex;justify-content:center;gap:12px;margin-top:18px;flex-wrap:wrap;">
      <button class="btn ghost" data-route="universities">${t("back")}</button>
    </div>
  `;

  el.querySelector("[data-route]").onclick = () => setRoute("universities");
  const registerBtn = el.querySelector("[data-action='register-workshop']");
  if (registerBtn) {
    registerBtn.onclick = () => {
      registerForWorkshop(registerBtn.dataset.id);
      renderWorkshopDetails();
    };
  }
  const attendBtn = el.querySelector("[data-action='mark-attended']");
  if (attendBtn) {
    attendBtn.onclick = () => {
      markWorkshopAttended(attendBtn.dataset.id);
      renderWorkshopDetails();
    };
  }
  const editBtn = el.querySelector("[data-action='edit-workshop']");
  if (editBtn) {
    editBtn.onclick = () => {
      state.selectedUniversityId = workshop.university_id;
      state.ui.editingWorkshopId = workshop.workshop_id;
      setRoute("university");
    };
  }
}

function renderNotifications() {
  const el = document.getElementById("screen-notifications");
  if (!el) return;
  const notifications = state.notifications;

  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("notificationsTitle")}</span>
      <h2>${t("notificationsTitle")}</h2>
      <p>${t("notificationsSub")}</p>
      <div class="meta-note">${t("notificationsHint")}</div>
    </div>
    <div class="card">
      <h3>${state.lang === "en" ? "Inbox" : "الوارد"}</h3>
      <div class="notification-list">
        ${
          notifications.length
            ? notifications
                .map(
                  (n) => `
                    <div class="notification-item ${n.read ? "" : "unread"}">
                      <div>
                        <strong>${n.title}</strong>
                        <div class="meta-line">${n.message}</div>
                      </div>
                    </div>`
                )
                .join("")
            : `<div class="meta-note">${t("noNotifications")}</div>`
        }
      </div>
    </div>
  `;
}

function renderAnalytics() {
  const el = document.getElementById("screen-analytics");
  if (!el) return;
  const totalViews = Object.values(state.analytics.workshopViews).reduce((sum, v) => sum + v, 0);
  const totalRegs = Object.values(state.analytics.registrations).reduce((sum, v) => sum + v, 0);
  const totalAttend = Object.values(state.analytics.attendance).reduce((sum, v) => sum + v, 0);
  const totalGaza = Object.values(state.analytics.recordingReach).reduce((sum, v) => sum + v, 0);
  const conversionRate = totalRegs ? Math.round((totalAttend / totalRegs) * 100) : 0;
  const dropouts = Math.max(0, totalRegs - totalAttend);
  const regionHeatmap = GOVERNORATES.map((gov) => {
    const ids = state.workshops.filter((w) => w.governorate === gov).map((w) => w.workshop_id);
    const views = ids.reduce((sum, id) => sum + (state.analytics.workshopViews[id] || 0), 0);
    return { gov, views };
  }).filter((x) => x.views > 0).sort((a, b) => b.views - a.views).slice(0, 5);
  const uni = isUniversityAdmin() ? getUniversityById(state.currentUser.universityId) : null;
  const uniWorkshops = uni ? state.workshops.filter((w) => w.university_id === uni.id) : [];

  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("analyticsTitle")}</span>
      <h2>${t("analyticsTitle")}</h2>
      <p>${t("analyticsSub")}</p>
    </div>
    <div class="card">
      <h3>${state.lang === "en" ? "System impact" : "أثر النظام"}</h3>
      <div class="stat-grid">
        <div class="stat-card"><span>Views</span><strong>${totalViews}</strong></div>
        <div class="stat-card"><span>Registrations</span><strong>${totalRegs}</strong></div>
        <div class="stat-card"><span>Attendance</span><strong>${totalAttend}</strong></div>
        <div class="stat-card"><span>Gaza reach</span><strong>${totalGaza}</strong></div>
        <div class="stat-card"><span>Conversion</span><strong>${conversionRate}%</strong></div>
        <div class="stat-card"><span>Dropout signals</span><strong>${dropouts}</strong></div>
      </div>
      ${
        regionHeatmap.length
          ? `<div class="meta-note" style="margin-top:12px;">
              ${state.lang === "en" ? "Engagement heatmap (top regions):" : "خريطة التفاعل (أهم المناطق):"}
              ${regionHeatmap.map((r) => `${r.gov} (${r.views})`).join(" • ")}
            </div>`
          : ""
      }
    </div>
    ${
      uni
        ? `<div class="card" style="margin-top:16px;">
            <h3>${uni.name[state.lang]}</h3>
            <div class="stat-grid">
              <div class="stat-card"><span>Views</span><strong>${uniWorkshops.reduce((sum, w) => sum + (state.analytics.workshopViews[w.workshop_id] || 0), 0)}</strong></div>
              <div class="stat-card"><span>Registrations</span><strong>${uniWorkshops.reduce((sum, w) => sum + (state.analytics.registrations[w.workshop_id] || 0), 0)}</strong></div>
              <div class="stat-card"><span>Attendance</span><strong>${uniWorkshops.reduce((sum, w) => sum + (state.analytics.attendance[w.workshop_id] || 0), 0)}</strong></div>
              <div class="stat-card"><span>Gaza reach</span><strong>${uniWorkshops.reduce((sum, w) => sum + (state.analytics.recordingReach[w.workshop_id] || 0), 0)}</strong></div>
            </div>
          </div>`
        : ""
    }
  `;
}








function calculateEnvironmentProfile() {
  const env = state.environment;
  const internetPenalty = {
    stable: 0,
    limited: 20,
    offline: 40,
  };
  const locationPenalty = {
    urban: 0,
    remote: 15,
    crisis: 35,
  };
  const crisisPenalty = env.crisis === "yes" ? 30 : 0;
  const devicePenalty = env.device === "mobile" ? 10 : 0;
  const marketBoost = {
    high: 10,
    medium: 0,
    low: -10,
  };
  const disruptionIndex = clamp(
    (internetPenalty[env.internet] || 0) +
      (locationPenalty[env.location] || 0) +
      crisisPenalty +
      devicePenalty,
    0,
    100
  );
  return {
    disruptionIndex,
    marketBoost: marketBoost[env.market] || 0,
    internet: env.internet,
    location: env.location,
    crisis: env.crisis,
    device: env.device,
  };
}

function onEnvironmentChange() {
  if (state.recsGenerated) {
    renderRecommendations();
    renderDashboard();
  }
}

function formatEnvValue(type, value) {
  if (!value) return "--";
  const map = {
    internet: {
      stable: t("internetStable"),
      limited: t("internetLimited"),
      offline: t("internetOffline"),
    },
    location: {
      urban: t("locationUrban"),
      remote: t("locationRemote"),
      crisis: t("locationCrisis"),
    },
    crisis: {
      yes: t("crisisYes"),
      no: t("crisisNo"),
    },
    market: {
      high: t("marketHigh"),
      medium: t("marketMedium"),
      low: t("marketLow"),
    },
    device: {
      laptop: t("deviceLaptop"),
      mobile: t("deviceMobile"),
    },
  };
  return map[type]?.[value] || value;
}

function formatLevelLabel(level) {
  if (!level) return "--";
  const map = {
    High: state.lang === "en" ? "High" : "مرتفع",
    Medium: state.lang === "en" ? "Medium" : "متوسط",
    Low: state.lang === "en" ? "Low" : "منخفض",
  };
  return map[level] || level;
}

function formatDemandLevel(level) {
  return formatLevelLabel(level);
}

function formatStudyLoad(level) {
  return formatLevelLabel(level);
}

function retrieveUniversityPrograms(majorId) {
  const results = [];
  UNIVERSITY_KB.forEach((uni) => {
    (uni.programs || []).forEach((program) => {
      if (program.majorId === majorId) {
        results.push({ ...program, universityId: uni.universityId });
      }
    });
  });
  return results;
}

function retrieveLaborSignals(majorId) {
  return LABOR_MARKET[majorId] || { demand: "Medium", remoteFriendly: false, localDemand: "Medium", globalDemand: "Medium" };
}

function retrieveWorkshops(majorId, envProfile) {
  const list = state.workshops.filter((w) => w.major_category === majorId && canSeeWorkshop(w));
  const upcoming = list.filter((w) => w.status === "Upcoming" || w.status === "Live");
  const recordings = list.filter((w) => w.status === "Finished" && w.recording_url);
  const remote = list.filter((w) => w.location === "Online" || w.location === "Hybrid");
  const accessRecommended = envProfile.disruptionIndex >= 40 || envProfile.internet !== "stable";
  return {
    count: list.length,
    upcoming: upcoming.length,
    recordings: recordings.length,
    remote: remote.length,
    accessRecommended,
  };
}

function applyPsychRules(psychoProfile, envProfile, programLoad, laborSignal) {
  let riskDelta = 0;
  let adaptabilityDelta = 0;
  const notes = [];

  PSYCH_RULES.forEach((rule) => {
    if (rule.when(psychoProfile, envProfile)) {
      notes.push(rule.note?.[state.lang] || rule.note?.en || "");
    }
  });

  if ((psychoProfile.scores?.stress ?? 50) < 40 && programLoad === "High") {
    riskDelta += 8;
  }
  if ((psychoProfile.scores?.focus ?? 50) < 40) {
    adaptabilityDelta += laborSignal.remoteFriendly ? 6 : 2;
  }
  if (envProfile.disruptionIndex >= 40) {
    adaptabilityDelta += laborSignal.remoteFriendly ? 8 : -4;
  }
  if (envProfile.internet !== "stable") {
    adaptabilityDelta += laborSignal.remoteFriendly ? 4 : -6;
  }

  return { riskDelta, adaptabilityDelta, notes: notes.filter(Boolean) };
}

function buildRagExplanation(ragContext) {
  if (!ragContext) return "";
  const demand = formatDemandLevel(ragContext.labor?.demand);
  const programsCount = ragContext.programs?.length ?? 0;
  const workshopsCount = ragContext.workshops?.count ?? 0;
  const load = formatStudyLoad(ragContext.programLoad);
  const remote = ragContext.labor?.remoteFriendly ? t("ragYes") : t("ragNo");

  return `${t("ragBasedOnData")} ${t("ragDemandLabel")}: ${demand}. ${t("ragProgramsLabel")}: ${programsCount}. ${t("ragWorkshopsLabel")}: ${workshopsCount}. ${t("ragLoadLabel")}: ${load}. ${t("ragRemoteLabel")}: ${remote}.`;
}

function buildChatContext(recs) {
  const interestVector = calculateInterestVector();
  const psycho = calculatePsychoProfile();
  const env = calculateEnvironmentProfile();
  const topRec = recs?.[0] || null;
  const alternatives = recs?.slice(1, 3) || [];
  return {
    interestVector,
    topDomains: getTopDomains(interestVector),
    psycho,
    env,
    topRec,
    alternatives,
  };
}

function formatDomainList(domainIds) {
  return domainIds.map((d) => domains[d]?.[state.lang] || d).join(" • ");
}

function buildChatResponse(intent, context) {
  const top = context.topRec;
  if (!top) {
    return state.lang === "en"
      ? "Complete the assessment to generate recommendations, then I can explain them."
      : "أكمل التقييم لتوليد التوصيات، وبعدها أقدر أشرح لك النتائج.";
  }
  const domainName = domains[top.domain]?.[state.lang] || top.domain;
  const demand = formatDemandLevel(top.ragContext?.labor?.demand);
  const programCount = top.ragContext?.programs?.length ?? 0;
  const workshopCount = top.ragContext?.workshops?.count ?? 0;
  const load = formatStudyLoad(top.ragContext?.programLoad);
  const remote = top.ragContext?.labor?.remoteFriendly ? t("ragYes") : t("ragNo");
  const env = context.env;
  const psych = context.psycho;
  const stress = psych.scores?.stress ?? 50;
  const focus = psych.scores?.focus ?? 50;
  const alternatives = context.alternatives.map((r) => r.title[state.lang]).join(" • ");

  if (intent === "why") {
    return state.lang === "en"
      ? `This recommendation fits your interest in ${domainName} with ${top.fit}% fit. Market demand is ${demand}, and there are ${programCount} university program(s) plus ${workshopCount} related workshop(s). Study load is ${load}, remote-friendly: ${remote}.`
      : `هذا التخصص مناسب لاهتمامك بمجال ${domainName} بنسبة ملاءمة ${top.fit}%. الطلب في السوق ${demand} وهناك ${programCount} برنامج جامعي و${workshopCount} ورش مرتبطة. ضغط الدراسة ${load}، وعن بُعد: ${remote}.`;
  }
  if (intent === "risks") {
    return state.lang === "en"
      ? `Risk is ${top.risk}%. Your stress score (${stress}) and focus score (${focus}) influence this, along with study load (${load}) and your environment (internet: ${formatEnvValue("internet", env.internet)}, crisis: ${formatEnvValue("crisis", env.crisis)}).`
      : `المخاطر ${top.risk}%. درجات الضغط (${stress}) والتركيز (${focus}) تؤثر، إضافةً لضغط الدراسة (${load}) والظروف (الإنترنت: ${formatEnvValue("internet", env.internet)}، الأزمة: ${formatEnvValue("crisis", env.crisis)}).`;
  }
  if (intent === "fit") {
    return state.lang === "en"
      ? `Adaptability is ${top.adaptability}%. With your environment (internet: ${formatEnvValue("internet", env.internet)}, location: ${formatEnvValue("location", env.location)}), a remote-friendly path (${remote}) and available workshops (${workshopCount}) improve suitability.`
      : `قابلية التكيف ${top.adaptability}%. مع ظروفك (الإنترنت: ${formatEnvValue("internet", env.internet)}، الموقع: ${formatEnvValue("location", env.location)}) فإن المسار عن بُعد (${remote}) والورش المتاحة (${workshopCount}) تزيد الملاءمة.`;
  }
  if (intent === "alternatives") {
    return state.lang === "en"
      ? `Alternative options based on your profile: ${alternatives || "No close alternatives found."}.`
      : `بدائل مقترحة بناءً على ملفك: ${alternatives || "لا توجد بدائل قريبة حالياً."}.`;
  }
  if (intent === "next") {
    return state.lang === "en"
      ? `Next steps: review the recommendation summary, explore ${top.title[state.lang]}, and attend related workshops (${workshopCount}). Keep updating your environment data to refine the advice.`
      : `الخطوة التالية: راجع ملخص التوصية، واستكشف ${top.title[state.lang]}، واحضر الورش المرتبطة (${workshopCount}). حدّث بيانات الظروف لتحسين الإرشاد.`;
  }
  return state.lang === "en"
    ? `Your top domains are ${formatDomainList(context.topDomains)}. The best match is ${top.title[state.lang]} with ${top.fit}% fit and ${top.adaptability}% adaptability. Demand: ${demand}.`
    : `أهم المجالات لديك: ${formatDomainList(context.topDomains)}. أفضل تطابق هو ${top.title[state.lang]} بملاءمة ${top.fit}% وقابلية تكيّف ${top.adaptability}%. الطلب: ${demand}.`;
}

function classifyChatIntent(text) {
  const input = (text || "").toLowerCase();
  if (input.includes("why") || input.includes("why this") || input.includes("ليش") || input.includes("لماذا")) return "why";
  if (input.includes("risk") || input.includes("مخاطر")) return "risks";
  if (input.includes("suitable") || input.includes("fit") || input.includes("يناسب") || input.includes("ملائم")) return "fit";
  if (input.includes("alternative") || input.includes("بدائل")) return "alternatives";
  if (input.includes("next") || input.includes("بعد") || input.includes("خطوة")) return "next";
  return "summary";
}

function appendChatMessage(role, text) {
  state.chat.messages.push({ role, text });
}

const RAG_SOURCES = [
  { id: "university_kb", description: "University programs, admission, study load, learning mode" },
  { id: "labor_market", description: "Market demand and remote-friendly indicators" },
  { id: "workshops", description: "Upcoming and recorded workshops" },
  { id: "psych_rules", description: "Non-clinical psychological adaptation rules" },
];

function renderChatbotPanel(chatContext) {
  return `
    <aside class="chatbot-panel">
      <div class="chatbot-header">
        <h3>${t("chatTitle")}</h3>
        <div class="meta-note">${t("chatSub")}</div>
      </div>
      <div class="chatbot-quick">
        <button class="btn ghost small" data-intent="why">${t("chatQuickWhy")}</button>
        <button class="btn ghost small" data-intent="risks">${t("chatQuickRisks")}</button>
        <button class="btn ghost small" data-intent="fit">${t("chatQuickFit")}</button>
        <button class="btn ghost small" data-intent="alternatives">${t("chatQuickAlternatives")}</button>
        <button class="btn ghost small" data-intent="next">${t("chatQuickNext")}</button>
      </div>
      <div class="chatbot-messages" id="chatMessages">
        ${state.chat.messages.map((m) => `
          <div class="chat-msg ${m.role}">
            <div class="chat-bubble">${m.text}</div>
          </div>
        `).join("")}
      </div>
      <div class="chatbot-input">
        <input id="chatInput" placeholder="${t("chatPlaceholder")}" />
        <button class="btn" id="chatSend">${t("chatSend")}</button>
      </div>
    </aside>
  `;
}

function bindChatbotHandlers(root, chatContext) {
  const sendChat = (intent, text) => {
    if (!state.chat.messages.length) {
      appendChatMessage("guide", buildChatResponse("summary", chatContext));
    }
    if (text) appendChatMessage("user", text);
    const response = buildChatResponse(intent, chatContext);
    appendChatMessage("guide", response);
    renderRecommendations();
  };

  root.querySelectorAll("[data-intent]").forEach((btn) => {
    btn.onclick = () => sendChat(btn.dataset.intent);
  });

  const chatInput = root.querySelector("#chatInput");
  const chatSend = root.querySelector("#chatSend");
  if (chatSend && chatInput) {
    chatSend.onclick = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      const intent = classifyChatIntent(text);
      chatInput.value = "";
      sendChat(intent, text);
    };
    chatInput.onkeydown = (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      chatSend.click();
    };
  }
}

function calculateCareerScores(career, interestVector, psychoProfile, envProfile) {
  const weights = career.domainWeights || {};
  let fit = 0;
  let weightSum = 0;
  Object.keys(weights).forEach((key) => {
    fit += (interestVector[key] || 0) * weights[key];
    weightSum += weights[key];
  });
  const fitScore = weightSum > 0 ? Math.round(fit / weightSum) : 50;

  const tolerance = psychoProfile.scores || {};
  const load = career.psychLoad || {};
  const gaps = ["stress", "focus", "social", "resilience"].map((key) => {
    const requirement = load[key] ?? 60;
    const available = tolerance[key] ?? 50;
    return Math.max(0, requirement - available);
  });
  const loadPenalty = gaps.reduce((sum, v) => sum + v, 0) / gaps.length;
  let riskScore = loadPenalty * 0.8 + (career.structureRigidity || 50) * 0.2;
  if (envProfile.disruptionIndex >= 40 && (career.structureRigidity || 0) > 70) {
    riskScore += 10;
  }
  riskScore = Math.round(clamp(riskScore, 5, 95));

  let adaptability = 60;
  if (envProfile.disruptionIndex >= 40) {
    adaptability += career.remoteFriendly ? 15 : -20;
  }
  if (career.requiresStableInternet && envProfile.internet !== "stable") {
    adaptability -= envProfile.internet === "offline" ? 25 : 12;
  }
  if (career.modularLearning) {
    adaptability += 10;
  }
  adaptability += envProfile.marketBoost;
  adaptability = Math.round(clamp(adaptability, 10, 95));

  return {
    fit: fitScore,
    risk: riskScore,
    adaptability,
    total: Math.round(fitScore * 0.5 + (100 - riskScore) * 0.2 + adaptability * 0.3),
  };
}

function buildRecommendations() {
  const interestVector = calculateInterestVector();
  const psychoProfile = calculatePsychoProfile();
  const envProfile = calculateEnvironmentProfile();
  const boosts = getWorkshopBoosts();

  const scored = majorCatalog.map((m) => {
    const boost = boosts[m.id] || 0;
    const programs = retrieveUniversityPrograms(m.id);
    const labor = retrieveLaborSignals(m.id);
    const workshops = retrieveWorkshops(m.id, envProfile);
    const programLoad = programs[0]?.studyLoad || "Medium";
    const psychAdjust = applyPsychRules(psychoProfile, envProfile, programLoad, labor);

    let fit = Math.min(100, (interestVector[m.domain] || 0) + boost);
    if (programs.length) fit += 3;
    else fit -= 5;
    fit = Math.round(clamp(fit, 5, 100));

    const stress = psychoProfile.scores.stress ?? 50;
    const focus = psychoProfile.scores.focus ?? 50;

    const focusNeed =
      m.domain === "T" || m.domain === "S" ? 70 :
      m.domain === "H" ? 65 :
      55;

    const stressNeed =
      m.domain === "H" ? 70 :
      m.domain === "B" ? 60 :
      55;

    const focusGap = Math.max(0, focusNeed - focus);
    const stressGap = Math.max(0, stressNeed - stress);

    let risk = 30 + focusGap * 0.6 + stressGap * 0.4;

    if (envProfile.internet === "offline") risk += 15;
    if (envProfile.location === "crisis") risk += 10;
    if (envProfile.device === "mobile") risk += 8;
    if (programLoad === "High") risk += 4;
    if (labor.demand === "Low") risk += 6;
    if (labor.demand === "High") risk -= 3;
    risk += psychAdjust.riskDelta;

    risk = Math.round(clamp(risk, 5, 95));

    let adaptability = 60;
    if (envProfile.disruptionIndex >= 40) adaptability += 10;
    if (envProfile.internet !== "stable") adaptability -= 10;
    adaptability += envProfile.marketBoost;
    if (labor.remoteFriendly) adaptability += 6;
    if (workshops.recordings > 0 && envProfile.internet !== "stable") adaptability += 4;
    adaptability += psychAdjust.adaptabilityDelta;
    adaptability = Math.round(clamp(adaptability, 10, 95));

    const total = Math.round(fit * 0.55 + (100 - risk) * 0.20 + adaptability * 0.25);

    const ragContext = {
      programs,
      labor,
      workshops,
      programLoad,
      notes: psychAdjust.notes,
    };
    const ragExplanation = buildRagExplanation(ragContext);

    return { ...m, fit, risk, adaptability, total, ragContext, ragExplanation };
  });

  return scored.sort((a, b) => b.total - a.total).slice(0, 6);
}


function renderRecommendations() {
  const el = document.getElementById("screen-recommendations");

  if (!state.recsGenerated) {
    el.innerHTML = `
      <div class="card center">
        <h3>${state.lang === "en"
          ? "Run AI analysis to generate recommendations."
          : "قم بتشغيل التحليل لإنشاء التوصيات."}
        </h3>
      </div>
    `;
    return;
  }

  const recs = buildRecommendations();
  const chatContext = buildChatContext(recs);

  el.innerHTML = `
    <div class="section-header">
      <span class="badge">${t("recBadge")}</span>
      <h2>${t("recTitle")}</h2>
    </div>

    <div class="recs-layout">
      <div class="recs-main">
        <div class="recommend-grid">
          ${recs.map((c) => `
            <div class="career-card">
              <div class="career-body">
                <h3>${c.title[state.lang]}</h3>

                <div class="stat-grid">
                  <div class="stat-card">
                    <span>Fit</span>
                    <strong>${c.fit}%</strong>
                  </div>
                  <div class="stat-card">
                    <span>Risk</span>
                    <strong>${c.risk}%</strong>
                  </div>
                  <div class="stat-card">
                    <span>Adaptability</span>
                    <strong>${c.adaptability}%</strong>
                  </div>
                </div>
                <div class="meta-note" style="margin-top:10px;">
                  ${c.ragExplanation || ""}
                </div>

                <button class="btn ghost"
                  style="margin-top:12px;"
                  data-major="${c.id}">
                  ${t("exploreMore")}
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      ${renderChatbotPanel(chatContext)}
    </div>
  `;

  
  el.querySelectorAll("[data-major]").forEach((btn) => {
    btn.onclick = () => openMajor(btn.dataset.major);
  });

  bindChatbotHandlers(el, chatContext);
}
//1
const gameContent = {
  se: {
    levels: {
      1: [
        {
          q: {
            en: "Which role focuses on the UI (buttons, pages, layout)?",
            ar: "أي دور يركز على الواجهة (الأزرار، الصفحات، التنسيق)؟",
          },
          options: {
            en: ["Backend", "Frontend", "DevOps"],
            ar: ["Back-end", "Front-end", "DevOps"],
          },
          correct: 1,
          explain: {
            en: "Frontend developers build what users see and interact with.",
            ar: "Front-end يركز على ما يراه المستخدم ويتفاعل معه.",
          },
        },
        {
          q: {
            en: "What is debugging?",
            ar: "ما هو Debugging؟",
          },
          options: {
            en: ["Writing random code fast", "Finding and fixing bugs", "Designing logos"],
            ar: ["كتابة كود عشوائي بسرعة", "إيجاد الأخطاء وإصلاحها", "تصميم شعارات"],
          },
          correct: 1,
          explain: {
            en: "Debugging = identify the problem and fix it step by step.",
            ar: "Debugging يعني تحديد المشكلة وإصلاحها خطوة بخطوة.",
          },
        },
      ],
      2: [
        {
          q: {
            en: "A login form must at least have:",
            ar: "نموذج تسجيل الدخول يجب أن يحتوي على الأقل على:",
          },
          options: {
            en: ["Email + Password", "Only username", "Only a button"],
            ar: ["إيميل + كلمة مرور", "اسم مستخدم فقط", "زر فقط"],
          },
          correct: 0,
          explain: {
            en: "Most login flows require identifier + secret (password).",
            ar: "غالبًا تسجيل الدخول يحتاج مُعرّف + كلمة مرور.",
          },
        },
        {
          q: {
            en: "If password is too short, the best UX is to:",
            ar: "إذا كانت كلمة المرور قصيرة، أفضل تجربة مستخدم هي:",
          },
          options: {
            en: ["Show a clear error message", "Close the app", "Ignore it"],
            ar: ["إظهار رسالة خطأ واضحة", "إغلاق التطبيق", "تجاهل الأمر"],
          },
          correct: 0,
          explain: {
            en: "Clear messages help the user fix the issue quickly.",
            ar: "الرسائل الواضحة تساعد المستخدم على تصحيح الخطأ بسرعة.",
          },
        },
      ],
      3: [
        {
          q: {
            en: "Which is a good variable name?",
            ar: "أي اسم متغير أفضل؟",
          },
          options: {
            en: ["x", "data1", "userEmail"],
            ar: ["x", "data1", "userEmail"],
          },
          correct: 2,
          explain: {
            en: "Good names explain the meaning (userEmail).",
            ar: "الاسم الجيد يوضح المعنى مثل userEmail.",
          },
        },
        {
          q: {
            en: "A bug is:",
            ar: "الـ Bug هو:",
          },
          options: {
            en: ["A feature that works", "A mistake that causes wrong behavior", "A design color"],
            ar: ["ميزة تعمل", "خطأ يسبب سلوكًا غير صحيح", "لون تصميم"],
          },
          correct: 1,
          explain: {
            en: "Bugs are errors that break expected behavior.",
            ar: "الأخطاء هي التي تكسر السلوك المتوقع.",
          },
        },
      ],
      4: [
        {
          q: {
            en: "A simple app plan should include:",
            ar: "خطة تطبيق بسيطة يجب أن تشمل:",
          },
          options: {
            en: ["Screens + navigation", "Only colors", "Only marketing"],
            ar: ["الشاشات + التنقل", "ألوان فقط", "تسويق فقط"],
          },
          correct: 0,
          explain: {
            en: "Planning screens and navigation is the base of any app.",
            ar: "تخطيط الشاشات والتنقل هو أساس أي تطبيق.",
          },
        },
        {
          q: {
            en: "Where do you store user data in a prototype (no database)?",
            ar: "أين نخزن بيانات المستخدم في بروتوتايب بدون قاعدة بيانات؟",
          },
          options: {
            en: ["In memory (state) or localStorage", "In Google", "You can't store anything"],
            ar: ["في الذاكرة (state) أو localStorage", "في جوجل", "لا يمكن تخزين شيء"],
          },
          correct: 0,
          explain: {
            en: "Prototype can store temporarily in state/localStorage.",
            ar: "في البروتوتايب يمكن التخزين مؤقتًا في state أو localStorage.",
          },
        },
      ],
    },
  },

  ds: {
    levels: {
      1: [
        {
          q: { en: "Data Science mainly works with:", ar: "علم البيانات يعمل أساسًا مع:" },
          options: { en: ["Data + patterns", "Painting", "Car engines"], ar: ["البيانات والأنماط", "الرسم", "محركات السيارات"] },
          correct: 0,
          explain: { en: "You analyze datasets to find insights.", ar: "تحلل بيانات لاستخراج نتائج." },
        },
        {
          q: { en: "Missing values are:", ar: "القيم الناقصة هي:" },
          options: { en: ["Empty/unknown cells in data", "Faster internet", "UI buttons"], ar: ["خانات فارغة/مجهولة", "إنترنت أسرع", "أزرار واجهة"] },
          correct: 0,
          explain: { en: "They need cleaning or handling.", ar: "تحتاج معالجة/تنظيف." },
        },
      ],
      2: [
        {
          q: { en: "Duplicates in data mean:", ar: "التكرار في البيانات يعني:" },
          options: { en: ["Same row repeated", "Better accuracy always", "More colors"], ar: ["نفس السطر مكرر", "دقة أعلى دائمًا", "ألوان أكثر"] },
          correct: 0,
          explain: { en: "Duplicates can distort results.", ar: "قد يسبب نتائج مضللة." },
        },
        {
          q: { en: "A good first step is:", ar: "خطوة أولى جيدة هي:" },
          options: { en: ["Explore (describe) the data", "Train a huge model", "Ignore outliers"], ar: ["استكشاف البيانات", "تدريب نموذج ضخم", "تجاهل القيم الشاذة"] },
          correct: 0,
          explain: { en: "Understand before modeling.", ar: "افهم البيانات قبل النمذجة." },
        },
      ],
    },
  },

  ux: {
    levels: {
      1: [
        {
          q: { en: "UX stands for:", ar: "UX اختصار لـ:" },
          options: { en: ["User Experience", "Ultra X", "User Excel"], ar: ["تجربة المستخدم", "Ultra X", "User Excel"] },
          correct: 0,
          explain: { en: "UX = how the user feels using the product.", ar: "UX = شعور وتجربة المستخدم مع المنتج." },
        },
        {
          q: { en: "A user journey describes:", ar: "User Journey يصف:" },
          options: { en: ["Steps user takes to reach a goal", "Only colors", "Only code"], ar: ["خطوات المستخدم لتحقيق هدف", "ألوان فقط", "كود فقط"] },
          correct: 0,
          explain: { en: "It maps the flow end-to-end.", ar: "يرسم مسار الاستخدام من البداية للنهاية." },
        },
      ],
      2: [
        {
          q: { en: "Wireframe is:", ar: "الـ Wireframe هو:" },
          options: { en: ["Simple layout sketch", "Final design with colors", "Database schema"], ar: ["رسم تخطيطي بسيط", "تصميم نهائي بالألوان", "مخطط قاعدة بيانات"] },
          correct: 0,
          explain: { en: "It focuses on structure, not styling.", ar: "يركز على البنية وليس الألوان." },
        },
      ],
    },
  },
};



function startStoryGame(majorId, levelId = 1) {
  state.gameSession = {
    majorId: majorId,
    levelId: levelId,
    scene: 0,
    line: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    selectedAnswer: null,
    finished: false,
  };

  setRoute("game");   
}

let typingTimer = null;
let typingDone = false;

function stopTyping() {
  if (typingTimer) clearInterval(typingTimer);
  typingTimer = null;
  typingDone = true;
}

function typeText(el, fullText, speed = 18) {
  stopTyping();
  typingDone = false;

  el.innerHTML = ""; 
  const span = document.createElement("span");
  const caret = document.createElement("span");
  caret.className = "caret";
  caret.textContent = "▍";

  el.appendChild(span);
  el.appendChild(caret);

  let i = 0;
  typingTimer = setInterval(() => {
    i++;
    span.textContent = fullText.slice(0, i);
    if (i >= fullText.length) {
      clearInterval(typingTimer);
      typingTimer = null;
      typingDone = true;
      caret.remove(); 
    }
  }, speed);
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function speak(text) {
  if (!state.tts?.enabled) return;
  if (!("speechSynthesis" in window)) return;

  stopSpeech();
  const u = new SpeechSynthesisUtterance(text);

 
  u.rate = state.tts.rate ?? 1;
  u.pitch = state.tts.pitch ?? 1;
  u.volume = state.tts.volume ?? 1;

 
  u.lang = state.lang === "ar" ? "ar-SA" : "en-US";

  window.speechSynthesis.speak(u);
}

function toggleTTS() {
  state.tts.enabled = !state.tts.enabled;
  if (!state.tts.enabled) stopSpeech();
  renderStoryGame();
}


function setSpeakerFocus(who) {
  const hero = document.getElementById("char-hero");
  const mentor = document.getElementById("char-mentor");
  const bot = document.getElementById("char-bot");

  if (!hero || !mentor || !bot) return;


  [hero, mentor, bot].forEach((x) => {
    x.classList.remove("is-speaking", "is-dim", "game-slot-left", "game-slot-center", "game-slot-right");
  });

  const setSlotsDefault = () => {
    hero.classList.add("game-slot-left");
    mentor.classList.add("game-slot-center");
    bot.classList.add("game-slot-right");
  };

  const dimOthers = (speakerEl) => {
    [hero, mentor, bot].forEach((x) => {
      if (x === speakerEl) x.classList.add("is-speaking");
      else x.classList.add("is-dim");
    });
  };

  if (who === "hero") {

    hero.classList.add("game-slot-right");
    mentor.classList.add("game-slot-center");
    bot.classList.add("game-slot-left");
    dimOthers(hero);
  } else if (who === "bot") {
    setSlotsDefault();
    dimOthers(bot);
  } else if (who === "mentor") {
    setSlotsDefault();
    dimOthers(mentor);
  } else {
    setSlotsDefault();
  }
}

function unlockNextLevel(majorId, levelId) {
  if (!state.game.unlockedLevelByMajor) state.game.unlockedLevelByMajor = {};
  const currentUnlocked = state.game.unlockedLevelByMajor[majorId] || 1;
  const next = levelId + 1;
  if (next > currentUnlocked) state.game.unlockedLevelByMajor[majorId] = next;
}

function finishLevel(majorId, levelId, stars = 3) {
  if (!state.game.completedByMajor) state.game.completedByMajor = {};
  if (!state.game.starsByMajor) state.game.starsByMajor = {};
  if (!state.game.completedByMajor[majorId]) state.game.completedByMajor[majorId] = {};
  if (!state.game.starsByMajor[majorId]) state.game.starsByMajor[majorId] = {};

  state.game.completedByMajor[majorId][levelId] = true;
  state.game.starsByMajor[majorId][levelId] = Math.max(state.game.starsByMajor[majorId][levelId] || 0, stars);

  unlockNextLevel(majorId, levelId);
}



function startStoryGame(majorId, levelId) {

  state.gameSession = {
    majorId,
    levelId,
    sceneIndex: 0,
    lineIndex: 0,
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    finished: false,


    selectedAnswer: null,
    quizLocked: false, 
  };

  setRoute("game");
  renderStoryGame();
}

function renderStoryGame() {
  const el = document.getElementById("screen-game");
  if (!el) return;


  if (!state.gameSession) {
    el.innerHTML = `<div class="card center"><h3>Game session missing.</h3></div>`;
    return;
  }

  const { majorId, levelId, sceneIndex, lineIndex } = state.gameSession;

 const story = storyGameData?.[majorId]?.levels?.[levelId];
const scene = story?.scenes?.[sceneIndex];
const line = scene?.lines?.[lineIndex];

if (!story || !scene) {
  el.innerHTML = `<div class="card center"><h3>No story data found for this major.</h3></div>`;
  return;
}


 
  if (!scene || !line) {
    state.gameSession.finished = true;

    const accuracy =
      state.gameSession.totalQuestions > 0
        ? state.gameSession.correctAnswers / state.gameSession.totalQuestions
        : 1;

    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.6 ? 2 : 1;


    if (typeof finishLevel === "function") {
      finishLevel(majorId, levelId, stars);
    }

   
    const nextLevel = exp?.levels?.find((x) => x.id === levelId + 1);

    el.innerHTML = `
      <div class="card center">
        <h2>${state.lang === "en" ? "Level complete!" : "تم إنهاء المستوى!"}</h2>
        <p>${state.lang === "en" ? "Next level unlocked." : "تم فتح المستوى التالي."}</p>
        <p style="opacity:.85;margin-top:8px;">
          ${state.lang === "en" ? "Stars" : "النجوم"}: <strong>${starsToText(stars)}</strong>
        </p>
        <div style="margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          <button class="btn ghost" id="backToMajor">${state.lang === "en" ? "Back" : "رجوع"}</button>
          ${
            nextLevel
              ? `<button class="btn" id="goNext">${state.lang === "en" ? "Next Level" : "المستوى التالي"}</button>`
              : ""
          }
        </div>
      </div>
    `;

    document.getElementById("backToMajor").onclick = () => {
      stopTyping?.();
      stopSpeech?.();
      setRoute("major");
      renderMajor();
    };

    if (nextLevel) {
      document.getElementById("goNext").onclick = () => {
        startStoryGame(majorId, levelId + 1);
      };
    }

    return;
  }

 
  const totalLines = scene.lines.length || 1;
  const progress = Math.round(((lineIndex + 1) / totalLines) * 100);


  const text = line.text?.[state.lang] ?? line.text ?? "";
  const speakerLabel =
    line.speaker?.[state.lang] ??
    line.speaker ??
    (line.who === "hero"
      ? state.lang === "en"
        ? "You"
        : "أنت"
      : line.who === "mentor"
      ? state.lang === "en"
        ? "Mentor"
        : "المرشد"
      : state.lang === "en"
      ? "Bot"
      : "بوت");

 
  el.innerHTML = `
    <div class="game-stage card" style="padding:0;">
      <div class="game-bg" style="background-image:url('${scene.bg || ""}')"></div>

      <div class="game-ui-top">
        <div class="game-progress"><span style="width:${progress}%"></span></div>
        <div class="game-score">
          ${state.lang === "en" ? "Score" : "النقاط"}: ${state.gameSession.score}
        </div>

        <button class="game-tts-btn ${state.tts?.enabled ? "" : "off"}" id="ttsBtn">
          ${
            state.tts?.enabled
              ? state.lang === "en"
                ? "🔊 Voice"
                : "🔊 صوت"
              : state.lang === "en"
              ? "🔇 Muted"
              : "🔇 صامت"
          }
        </button>
      </div>

      <div class="game-chars">
        <img id="char-hero" class="game-char" src="assets/game/hero.png" alt="hero">
        <img id="char-mentor" class="game-char" src="assets/game/mentor.png" alt="mentor">
        <img id="char-bot" class="game-char" src="assets/game/bot.png" alt="bot">
      </div>

      <div class="game-dialog">
        <div class="game-speaker" id="speakerName">${speakerLabel}</div>
        <div class="game-text" id="dialogText"></div>

        <div id="quizMount" style="margin-top:12px;"></div>

        <div class="game-actions">
          <button class="btn ghost" id="exitBtn">${state.lang === "en" ? "Exit" : "خروج"}</button>
          <button class="btn" id="nextBtn">${state.lang === "en" ? "Next" : "التالي"}</button>
        </div>
      </div>
    </div>
  `;


  document.getElementById("exitBtn").onclick = () => {
    stopTyping?.();
    stopSpeech?.();
    setRoute("major");
    renderMajor();
  };

  document.getElementById("ttsBtn").onclick = () => toggleTTS?.();

  document.getElementById("nextBtn").onclick = () => nextLine();

  
  if (typeof setSpeakerFocus === "function") {
    setSpeakerFocus(line.who || "mentor");
  }

 
  const dialogTextEl = document.getElementById("dialogText");
  if (typeof typeText === "function") {
    typeText(dialogTextEl, text, 16);
  } else {
    dialogTextEl.textContent = text;
  }

  if (state.tts?.enabled && typeof speak === "function") {
    speak(text);
  }


  if (line.quiz) renderQuiz(line.quiz);
  else {
   
    state.gameSession.selectedAnswer = null;
    state.gameSession.quizLocked = false;
  }
}

function nextLine() {
  const s = state.gameSession;
  if (!s) return;

  const exp = majorExperience?.[s.majorId];
  const level = exp?.levels?.find((x) => x.id === s.levelId);
  const scene = level?.scenes?.[s.sceneIndex];
  const line = scene?.lines?.[s.lineIndex];
  if (!line) return;

  const dialogTextEl = document.getElementById("dialogText");
  const fullText = line.text?.[state.lang] ?? line.text ?? "";


  if (typeof typingDone !== "undefined" && !typingDone) {
    stopTyping?.();
    if (dialogTextEl) dialogTextEl.textContent = fullText;
    return;
  }

  
  if (line.quiz && s.selectedAnswer == null) {
    showToast?.(state.lang === "en" ? "Answer the question first." : "أجب على السؤال أولاً.");
    return;
  }

  s.selectedAnswer = null;
  s.quizLocked = false;
  stopSpeech?.();

  s.lineIndex++;

  if (scene && s.lineIndex >= (scene.lines?.length || 0)) {
    s.sceneIndex++;
    s.lineIndex = 0;
  }

  renderStoryGame();
}

function renderQuiz(quiz) {
  const mount = document.getElementById("quizMount");
  if (!mount) return;

  const qText = quiz.q?.[state.lang] ?? quiz.q ?? "";
  const opts = quiz.options?.[state.lang] ?? quiz.options ?? [];

  const locked = !!state.gameSession.quizLocked;
  const selected = state.gameSession.selectedAnswer;

  mount.innerHTML = `
    <div class="quiz-box">
      <div style="font-weight:800;margin-bottom:8px;">${qText}</div>

      <div class="quiz-options">
        ${opts
          .map((o, idx) => {
            const isSel = selected === idx;
            return `
              <button class="quiz-opt ${isSel ? "selected" : ""}"
                      data-opt="${idx}"
                      ${locked ? "disabled" : ""}>
                ${o}
              </button>
            `;
          })
          .join("")}
      </div>

      <div id="quizFeedback" class="quiz-feedback"></div>
    </div>
  `;

  const fb = document.getElementById("quizFeedback");
  const correct = quiz.correctIndex;

  
  if (locked && selected != null) {
    fb.innerHTML =
      selected === correct
        ? `<div class="quiz-ok">${state.lang === "en" ? "Correct ✅" : "صحيح ✅"}</div>`
        : `
            <div class="quiz-bad">${state.lang === "en" ? "Wrong ❌" : "خطأ ❌"}</div>
            ${
              quiz.explain
                ? `<div class="quiz-explain">${quiz.explain?.[state.lang] ?? quiz.explain}</div>`
                : ""
            }
          `;
    return;
  }

 
  mount.querySelectorAll("[data-opt]").forEach((btn) => {
    btn.onclick = () => {
      if (state.gameSession.quizLocked) return; 
      const idx = Number(btn.dataset.opt);
      state.gameSession.selectedAnswer = idx;
      state.gameSession.quizLocked = true;

     
      state.gameSession.totalQuestions++;
      if (idx === correct) {
        state.gameSession.correctAnswers++;
        state.gameSession.score += quiz.points ?? 10;
        fb.innerHTML = `<div class="quiz-ok">${state.lang === "en" ? "Correct ✅" : "صحيح ✅"}</div>`;
      } else {
        fb.innerHTML = `
          <div class="quiz-bad">${state.lang === "en" ? "Wrong ❌" : "خطأ ❌"}</div>
          ${
            quiz.explain
              ? `<div class="quiz-explain">${quiz.explain?.[state.lang] ?? quiz.explain}</div>`
              : ""
          }
        `;
      }

      
      const scoreEl = document.querySelector(".game-score");
      if (scoreEl) {
        scoreEl.textContent = `${state.lang === "en" ? "Score" : "النقاط"}: ${state.gameSession.score}`;
      }

      
      mount.querySelectorAll(".quiz-opt").forEach((b) => (b.disabled = true));
      btn.classList.add("selected");
    };
  });
}


function starsToText(n) {
  if (n === 3) return "★★★";
  if (n === 2) return "★★☆";
  return "★☆☆";
}
function renderGame() {
  const el = document.getElementById("screen-game");
  if (!el) return;

  if (state.route !== "game") {
    el.innerHTML = "";
    return;
  }

  if (!state.gameSession) {
    state.gameSession = {
      majorId: state.selectedMajorId || "se",
      levelId: state.selectedLevelId || 1,
      sceneIndex: 0,
      lineIndex: 0,
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      finished: false,
      selectedAnswer: null
    };
  }

 
  const majorId = state.selectedMajorId || state.gameSession.majorId || "se";
  const levelId = state.selectedLevelId || state.gameSession.levelId || 1;

  if (state.gameSession.majorId !== majorId || state.gameSession.levelId !== levelId) {
    state.gameSession.majorId = majorId;
    state.gameSession.levelId = levelId;
    state.gameSession.sceneIndex = 0;
    state.gameSession.lineIndex = 0;
    state.gameSession.score = 0;
    state.gameSession.totalQuestions = 0;
    state.gameSession.correctAnswers = 0;
    state.gameSession.finished = false;
    state.gameSession.selectedAnswer = null;
  }

 
  renderStoryGame();
}



function render() {
  const langSelect = document.getElementById("langSelect");
  if (langSelect.value !== state.lang) {
    langSelect.value = state.lang;
  }
  const navLabels = {
    splash: t("navHome"),
    dashboard: t("navDashboard"),
    onboarding: t("navHow"),
    auth: t("navAuth"),
    assessment: t("navAssess"),
    analysis: t("navAnalysis"),
    recommendations: t("navRecs"),
    universities: t("navUniversities"),
    notifications: t("navNotifications"),
    analytics: t("navAnalytics"),
    major: state.lang === "en" ? "Major" : "التخصص",
game: state.lang === "en" ? "Game" : "اللعبة",

  };
  document.querySelectorAll(".nav button").forEach((btn) => {
    const label = navLabels[btn.dataset.route];
    if (label) {
      btn.textContent = label;
    }
  });
  renderSplash();
  renderOnboarding();
  renderDashboard();
  renderAuth();
  renderAssessment();
  renderAnalysis();
  renderRecommendations();
  renderMajor();
  renderUniversities();
  renderUniversityProfile();
  renderWorkshopDetails();
  renderNotifications();
  renderAnalytics();
  if (state.route === "game") renderStoryGame();



}

document.addEventListener("DOMContentLoaded", () => {
  initStore();
  document.getElementById("langSelect").addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.onclick = () => setRoute(btn.dataset.route);
  });
  setLanguage("en");
  restoreAfterGameReturn();
  setRoute("splash");
});

// Public modules map for clearer architecture boundaries.
const AppModules = Object.freeze({
  data: {
    UNIVERSITY_KB,
    LABOR_MARKET,
    PSYCH_RULES,
    DEFAULT_UNIVERSITIES,
    DEFAULT_WORKSHOPS,
    RAG_SOURCES,
  },
  rag: {
    retrieveUniversityPrograms,
    retrieveLaborSignals,
    retrieveWorkshops,
    applyPsychRules,
    buildRagExplanation,
  },
  logic: {
    calculateScores,
    calculatePsychoProfile,
    calculateEnvironmentProfile,
    buildRecommendations,
    validateAssessmentPage,
    validatePsychoPage,
  },
  ui: {
    renderSplash,
    renderOnboarding,
    renderAssessment,
    renderAnalysis,
    renderRecommendations,
    renderDashboard,
    renderMajor,
    renderUniversities,
    renderUniversityProfile,
    renderWorkshopDetails,
    renderNotifications,
    renderAnalytics,
  },
  core: {
    setRoute,
    setLanguage,
    persistStore,
    initStore,
  },
});
