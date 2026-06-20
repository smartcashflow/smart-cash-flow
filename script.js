const TRANSACTIONS_KEY = "smartCashFlowPrototypeTransactions";
const SETTINGS_KEY = "smartCashFlowPrototypeSettings";
const USER_KEY = "smartCashFlowPrototypeUser";
const PRODUCTS_KEY = "smartCashFlowPrototypeProducts";
const STOCK_MOVEMENTS_KEY = "smartCashFlowPrototypeStockMovements";
const DEMO_OPENING_BALANCE = 100000;

const state = {
  transactions: [],
  products: [],
  stockMovements: [],
  user: null,
  settings: {
    businessName: "Small Business Suite",
    ownerName: "Demo Owner",
    email: "owner@smartcashflow.demo",
    currency: "USD",
    businessType: "Retail",
    openingBalance: DEMO_OPENING_BALANCE,
    openingBalanceCustom: false,
    lightTheme: false,
    language: "en"
  },
  activeSection: "dashboard",
  highlightedTransactionId: null,
  analytics: {
    period: "last14",
    rows: [],
    compare: null
  },
  report: {
    month: String(new Date().getMonth() + 1).padStart(2, "0"),
    year: String(new Date().getFullYear())
  },
  charts: {}
};

const elements = {};
let reportToastTimer = null;

const translations = {
  en: {
    navDashboard: "Dashboard",
    navTransactions: "Transactions",
    navInventory: "Inventory",
    navAnalytics: "Analytics",
    navForecasting: "Forecasting",
    navReports: "Reports",
    navSettings: "Settings",
    landingTagline: "Financial clarity for small businesses",
    cashIntelligence: "Cash Intelligence",
    landingHeroTitle: "Track inflows.<br>Control outflows.<br>Forecast with confidence.",
    landingHeroCopy: "Smart Cash Flow helps small business owners monitor daily money movement, understand financial health, and preview short-term forecasts.",
    productFlow: "Product Flow",
    howItWorks: "How it works",
    registerStepTitle: "Register your business",
    registerStepCopy: "Create your business account and set your basic profile.",
    transactionsStepTitle: "Add inflows and outflows",
    transactionsStepCopy: "Record money coming in and money going out.",
    dashboardStepTitle: "View dashboard and forecasts",
    dashboardStepCopy: "Monitor performance, reports, and short-term projections.",
    coreFeatures: "Core Features",
    featuresHeading: "Everything you need to understand your cash flow",
    dailyCashTracking: "Daily Cash Tracking",
    dailyCashTrackingCopy: "Monitor inflows and outflows as they happen.",
    smartForecasting: "Smart Forecasting",
    smartForecastingCopy: "Preview short-term cash pressure before it arrives.",
    visualReports: "Visual Reports",
    visualReportsCopy: "Turn business activity into clear financial insight.",
    welcome: "Welcome",
    welcomeTitle: "Welcome to Smart Cash Flow",
    welcomeCopy: "Track inflows, control expenses, understand your cash position, and present forecasts with a modern fintech dashboard.",
    createBusinessAccount: "Create Business Account",
    login: "Login",
    backToWelcome: "Back to Welcome",
    backToRegister: "Back to Register",
    createAccount: "Create Account",
    registerBusinessTitle: "Register your business",
    registerSupport: "Set up your demo workspace in less than a minute.",
    email: "Email",
    password: "Password",
    alreadyHaveAccount: "Already have an account?",
    welcomeBack: "Welcome Back",
    loginSupport: "Return to your saved business dashboard and continue your cash flow review.",
    newHere: "New here?",
    onboarding: "Onboarding",
    onboardingTitle: "How do you want to start?",
    onboardingCopy: "Choose demo data for a rich presentation, or start empty for a clean workspace.",
    startWithDemoData: "Start with Demo Data",
    startEmpty: "Start Empty",
    cashHealth: "Cash Health",
    demoDataReady: "Your demo data is ready.",
    headerEyebrow: "Premium Financial Dashboard",
    headerSubtitle: "Gain clarity. Make smarter decisions. Grow your business.",
    searchPlaceholder: "Search transactions, categories, notes",
    today: "Today",
    dashboardTitle: "Smart Cash Flow",
    todaysInflows: "Today's Cash Inflows",
    todaysOutflows: "Cash Outflows Today",
    netCashFlow: "Net Cash Flow",
    businessStatus: "Business Status",
    inflowDelta: "Live from demo ledger",
    outflowDelta: "Expenses tracked today",
    netCaption: "Inflows minus outflows",
    dashboardTodayTitle: "Today's Cash Movement",
    dashboardTodayHelper: "These cards show today's inflows, outflows, net movement, and status only.",
    controls: "Controls",
    quickControls: "Quick Controls",
    addTransaction: "Add Transaction",
    generateReport: "Generate Report",
    viewMonthlyReports: "View Monthly Reports",
    viewForecast: "View Forecast",
    cashRunway: "Cash Runway",
    runwayCaption: "Based on available cash and average daily outflows",
    runwayCaptionPeriod: "Based on available cash and average daily outflows over {period}",
    operatingCashFlow: "Operating Cash Flow",
    operatingCashFlowCaption: "Across stored transactions",
    topExpenseCategory: "Top Expense Category",
    topExpenseCategoryCaption: "Across stored transactions",
    snapshot: "Snapshot",
    businessSnapshot: "Business Snapshot",
    businessSnapshotHelper: "Based on stored transactions and recent activity.",
    quickInsights: "Quick Insights",
    quickInsightsHelper: "Snapshot metrics use stored transaction history.",
    recentActivity: "Recent Activity",
    recentTransactions: "Recent Transactions",
    viewAll: "View all",
    cashLedger: "Cash Ledger",
    transactions: "Transactions",
    newEntry: "New Entry",
    transactionType: "Transaction type",
    inflow: "inflow",
    outflow: "outflow",
    inflowLabel: "Inflow",
    outflowLabel: "Outflow",
    amount: "Amount",
    category: "Category",
    date: "Date",
    notes: "Notes",
    categoryPlaceholder: "Sales, rent, payroll...",
    notesPlaceholder: "Optional transaction details",
    productName: "Product Name",
    quantity: "Quantity",
    purchaseUnitPrice: "Purchase Unit Price",
    sellingUnitPrice: "Selling Unit Price",
    product: "Product",
    profit: "Profit",
    inventory: "Inventory",
    stockControl: "Stock Control",
    inventoryManagement: "Inventory Management",
    totalProducts: "Total Products",
    totalStockValue: "Total Stock Value",
    lowStockItems: "Low Stock Items",
    outOfStockItems: "Out of Stock Items",
    products: "Products",
    addProduct: "Add Product",
    productCategoryPlaceholder: "Accessories",
    openingQuantity: "Opening Quantity",
    minimumStock: "Minimum Stock",
    optionalProductNotes: "Optional product notes",
    stockMovement: "Stock Movement",
    recordStockMovement: "Record Stock Movement",
    movementType: "Movement Type",
    stockInPurchase: "Stock In / Purchase Stock",
    stockOutSell: "Stock Out / Sell Product",
    saveMovement: "Save Movement",
    optionalMovementNotes: "Optional movement notes",
    productList: "Product List",
    inventoryProducts: "Inventory Products",
    currentStock: "Current Stock",
    stockValue: "Stock Value",
    status: "Status",
    actions: "Actions",
    outOfStock: "Out of Stock",
    lowStock: "Low Stock",
    inStock: "In Stock",
    stockHistory: "Stock History",
    stockMovements: "Stock Movements",
    movement: "Movement",
    unitPrice: "Unit Price",
    totalAmount: "Total Amount",
    linkedTransaction: "Linked Transaction",
    noProductsYet: "No products yet. Add a product to start managing inventory.",
    noStockMovementsYet: "No stock movements yet.",
    selectProduct: "Select product",
    inventoryProductRequired: "Product name is required.",
    inventoryInvalidPrice: "Prices must be zero or positive.",
    inventoryInvalidQuantity: "Quantities must be zero or positive.",
    movementProductRequired: "Select a product first.",
    movementInvalidQuantity: "Quantity must be greater than zero.",
    movementInsufficientStock: "Cannot sell more than current stock.",
    deleteProductConfirm: "Delete this product and its stock movements? Linked cash transactions will stay in the ledger.",
    inventoryPurchaseCategory: "Inventory Purchase",
    productSalesCategory: "Product Sales",
    linkedTransactionLabel: "Linked transaction",
    action: "Action",
    type: "Type",
    delete: "Delete",
    history: "History",
    exactDate: "Exact date",
    monthFilter: "Month filter",
    month: "Month",
    year: "Year",
    clear: "Clear",
    clearFilters: "Clear filters",
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    clearSearch: "Clear search",
    searchCategory: "Search category",
    allTypes: "All types",
    inflows: "Inflows",
    outflows: "Outflows",
    transactionsTable: "Transactions Table",
    performanceIntelligence: "Performance Intelligence",
    analytics: "Analytics",
    totalInflows: "Total Inflows",
    totalOutflows: "Total Outflows",
    averageNetCashFlow: "Average Net Cash Flow",
    averageNetCaption: "Per calendar day in selected period",
    numberOfTransactions: "Number of Transactions",
    analysisControls: "Analysis Controls",
    analyticsPeriod: "Analytics Period",
    analysisPeriod: "Analysis Period",
    analyticsHelperText: "Choose a period or compare multiple months to understand business performance.",
    showingAnalyticsFor: "Analyzing:",
    last7Days: "Last 7 Days",
    last14Days: "Last 14 Days",
    last30Days: "Last 30 Days",
    currentMonthToDate: "Current Month to Date",
    previousMonth: "Previous Month",
    customRange: "Custom Range",
    monthlyComparison: "Monthly Comparison",
    fromDate: "From Date",
    toDate: "To Date",
    apply: "Apply",
    invalidDateRange: "From Date must be before or equal to To Date.",
    invalidMonthRange: "Start month must be before or equal to end month.",
    selectDateRange: "Select both dates to analyze a custom range.",
    selectWiderMonthRange: "Select a wider month range to compare multiple months.",
    noAnalyticsTransactions: "No transactions found for this analytics period.",
    startMonth: "Start Month",
    startYear: "Start Year",
    endMonth: "End Month",
    endYear: "End Year",
    comparedWith: "compared with",
    difference: "Difference",
    transactionCountDifference: "Transaction Count Difference",
    averageDifference: "Average Daily Net Difference",
    compareMonthlyPerformance: "Compare monthly cash flow performance",
    monthlyComparisonSubtitle: "Compare inflows, outflows, and net cash flow across selected months.",
    monthlyPerformanceTable: "Monthly Performance Table",
    monthlyComparisonInsightsTitle: "Monthly Comparison Insights",
    insights: "Insights",
    averageDailyNet: "Average Daily Net",
    bestMonth: "Best month",
    weakestMonth: "Weakest month",
    highestOutflowMonth: "Highest outflow month",
    highestInflowMonth: "Highest inflow month",
    withNetCashFlow: "with net cash flow",
    withOutflows: "with outflows",
    withInflows: "with inflows",
    dailyMovement: "Daily Movement",
    inflowsVsOutflows: "Inflows vs Outflows",
    trend: "Trend",
    netCashFlowTrend: "Net Cash Flow Trend",
    categories: "Categories",
    topCategoryAnalysis: "Top Category Analysis",
    planning: "Planning",
    forecasting: "Forecasting",
    shortTermOutlook: "Short-Term Outlook",
    forecastChart: "Projected Net Movement Forecast",
    after7: "After 7 days",
    after14: "After 14 days",
    after30: "After 30 days",
    projectedNetMovement7: "Projected Net Movement in 7 Days",
    projectedNetMovement14: "Projected Net Movement in 14 Days",
    projectedNetMovement30: "Projected Net Movement in 30 Days",
    forecastMovementHelper: "Forecast is based on recent average daily net cash flow over the last 7 calendar days. It estimates cash movement, not guaranteed future balance.",
    forecastCardHelper: "Based on recent daily average",
    executiveView: "Executive View",
    reports: "Reports",
    exportReport: "Export Report",
    exportPdf: "Export PDF",
    reportControls: "Report Controls",
    reportMonth: "Report Month",
    reportYear: "Report Year",
    generateUpdateReport: "Generate Report",
    reportAutoUpdateHelper: "Report updates automatically when month or year changes.",
    showingReportFor: "Showing report for:",
    reportSelectedMonthOnly: "Reports are calculated from the selected month only and update automatically when month or year changes.",
    monthlyFinancialReport: "Monthly Financial Report",
    monthlySummary: "Monthly Summary",
    currentMonth: "Current Month",
    financialSummary: "Financial Summary",
    performanceDetails: "Performance Details",
    visualAnalysis: "Visual Analysis",
    recommendedActions: "Recommended Actions",
    cashFlowMix: "Cash Flow Mix",
    analysis: "Analysis",
    noExpenseCategoriesThisPeriod: "No expense categories recorded this period.",
    noReportActivity: "No activity recorded for this selected month.",
    recommendationSurplusOne: "Keep monitoring {category} because it has the highest impact on cash movement.",
    recommendationSurplusTwo: "Cash flow is positive, so short-term spending can be planned more safely.",
    recommendationSurplusThree: "Review outflows weekly to protect the current surplus.",
    recommendationDeficitOne: "Reduce or review {category}.",
    recommendationDeficitTwo: "Delay non-essential spending until cash flow improves.",
    recommendationDeficitThree: "Increase inflow sources or follow up on pending payments.",
    recommendationBalancedOne: "Monitor daily inflows and outflows closely.",
    recommendationBalancedTwo: "Avoid unnecessary spending to prevent moving into deficit.",
    recommendationBalancedThree: "Build a small reserve from future positive cash flow.",
    recommendationEmptyOne: "Add monthly inflows and outflows to make this report actionable.",
    recommendationEmptyTwo: "Review the selected month to confirm whether activity was recorded elsewhere.",
    recommendationEmptyThree: "Use Reset Demo Data in Settings if you want to restore sample financial activity.",
    transactionsSummary: "Transactions Summary",
    bestDay: "Best Day",
    worstDay: "Worst Day",
    recentMonthlyActivity: "Recent Monthly Activity",
    selectedMonthInflows: "Selected month inflows",
    selectedMonthOutflows: "Selected month outflows",
    inflowsMinusOutflows: "Inflows minus outflows",
    monthlyCashPosition: "Monthly cash position",
    selectedMonthRecords: "Selected month records",
    dailyMonthlyAverage: "Daily monthly average",
    workspace: "Workspace",
    settings: "Settings",
    businessProfile: "Business Profile",
    preferences: "Preferences",
    businessName: "Business name",
    ownerName: "Owner name",
    currency: "Currency",
    businessType: "Business Type",
    businessNamePlaceholder: "Your business name",
    ownerNamePlaceholder: "Owner name",
    retail: "Retail",
    restaurant: "Restaurant",
    services: "Services",
    onlineStore: "Online Store",
    other: "Other",
    usdCurrency: "USD - US Dollar",
    eurCurrency: "EUR - Euro",
    gbpCurrency: "GBP - British Pound",
    egpCurrency: "EGP - Egyptian Pound",
    englishLanguage: "English",
    arabicLanguage: "Arabic",
    language: "Language",
    themeToggle: "Theme toggle",
    themeCopy: "Switch between executive dark and bright review mode.",
    resetDemoData: "Reset Demo Data",
    clearDemoData: "Clear Demo Data",
    logout: "Logout",
    openingBalance: "Opening Balance",
    openingBalanceHelper: "Optional. Starting cash available when you begin using the system.",
    invalidOpeningBalance: "Opening Balance must be a valid non-negative number.",
    availableCash: "Available Cash",
    avgDailyOutflows: "Avg Daily Outflows",
    sevenDayAverage: "7-day average",
    largestExpense: "Largest expense",
    transactionsStored: "Transactions stored",
    records: "records",
    noMatchingResults: "No matching results found",
    noExpenseCategories: "No expense categories yet.",
    noMonthlyTransactions: "No monthly transactions found.",
    noTransactionsYet: "No transactions yet. Add one manually to populate the dashboard.",
    reportNoTransactionsInsight: "{month} has no recorded transactions yet. Add inflows or outflows to build the monthly view.",
    reportSurplusInsight: "{month} is showing a healthy {net} surplus with inflows ahead of outflows.",
    reportDeficitInsight: "{month} is showing a {net} deficit, so outflows need closer review.",
    reportBalancedInsight: "{month} is balanced, with inflows and outflows nearly equal across recorded activity.",
    forecastPositive: "Healthy outlook: projected cash flow remains positive based on recent average daily net cash flow.",
    forecastNegative: "Warning: projected cash flow is negative based on recent average daily net cash flow.",
    forecastMovementPositive: "Projected net movement is positive based on recent average daily net cash flow.",
    forecastMovementNegative: "Projected net movement is negative based on recent average daily net cash flow.",
    balancedLabel: "Balanced",
    surplusLabel: "Surplus",
    deficitLabel: "Warning / Deficit",
    balancedShort: "Balanced",
    surplusShort: "Surplus",
    deficitShort: "Deficit",
    balancedCopy: "Cash movement is neutral today.",
    surplusCopy: "Cash inflows are higher than outflows today.",
    deficitCopy: "Cash outflows are higher than inflows today.",
    balancedAlert: "Balanced: today's inflows and outflows are equal. Keep watching upcoming expenses.",
    surplusAlert: "Healthy surplus: cash inflows are ahead today. Consider reserving part of the gain for upcoming obligations.",
    deficitAlert: "Warning: cash moved into deficit today. Review supplier payments, payroll timing, and discretionary spending.",
    transactionSingular: "transaction",
    transactionPlural: "transactions",
    restoreConfirm: "Restore demo data?",
    clearConfirm: "Clear all demo transactions and inventory data?",
    restoredToast: "Demo data restored successfully.",
    clearedToast: "Demo data cleared successfully.",
    pdfSuccess: "PDF report downloaded successfully.",
    pdfError: "Could not generate the report. Please try again.",
    loginError: "Login details do not match.",
    noOutflows: "No outflows",
    daysUnit: "days",
    avgDailyOutflows90: "Avg Daily Outflows (90 days)",
    runwayCaption90: "Based on available cash and 90-day average daily outflows",
    avgDailyOutflowsLast30: "Avg Daily Outflows (Last 30 days)",
    avgDailyOutflowsStoredRange: "Avg Daily Outflows (stored date range)",
    last30CalendarDays: "last 30 calendar days",
    storedDateRange: "stored transaction date range",
    cashFlowProjection: "Projected Net Movement",
    after7Short: "After 7d",
    after14Short: "After 14d",
    after30Short: "After 30d",
    ownerFallback: "Owner",
    demoFallback: "Demo",
    to: "to"
  },
  ar: {}
};

const arabicPhaseOneTranslations = {};

const arabicUiTranslations = {};

Object.assign(arabicUiTranslations, {
  navDashboard: "لوحة التحكم",
  navTransactions: "المعاملات",
  navInventory: "المخزن",
  navAnalytics: "التحليلات",
  navForecasting: "التوقعات",
  navReports: "التقارير",
  navSettings: "الإعدادات",
  landingTagline: "وضوح مالي للشركات الصغيرة",
  cashIntelligence: "ذكاء التدفق النقدي",
  landingHeroTitle: "تابع التدفقات الداخلة.<br>تحكم في المصروفات.<br>توقع بثقة.",
  landingHeroCopy: "يساعد Smart Cash Flow أصحاب الشركات الصغيرة على متابعة حركة النقد اليومية وفهم الوضع المالي واستعراض التوقعات قصيرة الأجل.",
  productFlow: "مسار المنتج",
  howItWorks: "كيف يعمل",
  registerStepTitle: "سجل نشاطك التجاري",
  registerStepCopy: "أنشئ حساب النشاط وأدخل بياناتك الأساسية.",
  transactionsStepTitle: "أضف التدفقات الداخلة والمصروفات",
  transactionsStepCopy: "سجل الأموال الداخلة والخارجة من النشاط.",
  dashboardStepTitle: "اعرض لوحة التحكم والتوقعات",
  dashboardStepCopy: "تابع الأداء والتقارير والتوقعات قصيرة الأجل.",
  coreFeatures: "الميزات الأساسية",
  featuresHeading: "كل ما تحتاجه لفهم التدفق النقدي",
  dailyCashTracking: "متابعة النقد اليومية",
  dailyCashTrackingCopy: "راقب التدفقات الداخلة والمصروفات فور حدوثها.",
  smartForecasting: "توقعات ذكية",
  smartForecastingCopy: "استعرض ضغوط النقد قصيرة الأجل قبل حدوثها.",
  visualReports: "تقارير مرئية",
  visualReportsCopy: "حوّل نشاط العمل إلى مؤشرات مالية واضحة.",
  welcome: "مرحبًا",
  welcomeTitle: "مرحبًا بك في Smart Cash Flow",
  welcomeCopy: "تابع التدفقات الداخلة، تحكم في المصروفات، افهم وضع النقد، واعرض التوقعات من خلال لوحة مالية حديثة.",
  createBusinessAccount: "إنشاء حساب نشاط",
  login: "تسجيل الدخول",
  backToWelcome: "العودة إلى الترحيب",
  backToRegister: "العودة إلى التسجيل",
  createAccount: "إنشاء حساب",
  registerBusinessTitle: "سجل نشاطك التجاري",
  registerSupport: "أنشئ مساحة العمل التجريبية في أقل من دقيقة.",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  alreadyHaveAccount: "لديك حساب بالفعل؟",
  welcomeBack: "مرحبًا بعودتك",
  loginSupport: "عد إلى لوحة نشاطك المحفوظة واستكمل مراجعة التدفق النقدي.",
  newHere: "مستخدم جديد؟",
  onboarding: "التهيئة",
  onboardingTitle: "كيف تريد أن تبدأ؟",
  onboardingCopy: "اختر بيانات تجريبية لعرض غني، أو ابدأ فارغًا لمساحة عمل نظيفة.",
  startWithDemoData: "البدء ببيانات تجريبية",
  startEmpty: "البدء فارغًا",
  cashHealth: "صحة النقد",
  demoDataReady: "البيانات التجريبية جاهزة.",
  headerEyebrow: "لوحة مالية احترافية",
  headerSubtitle: "افهم وضعك المالي. اتخذ قرارات أفضل. نمّ عملك.",
  searchPlaceholder: "ابحث في المعاملات أو الفئات أو الملاحظات",
  today: "اليوم",
  dashboardTitle: "Smart Cash Flow",
  todaysInflows: "التدفقات الداخلة اليوم",
  todaysOutflows: "المصروفات اليوم",
  netCashFlow: "صافي التدفق النقدي",
  businessStatus: "حالة النشاط",
  inflowDelta: "مباشر من السجل التجريبي",
  outflowDelta: "مصروفات اليوم المسجلة",
  netCaption: "التدفقات الداخلة ناقص المصروفات",
  dashboardTodayTitle: "حركة النقد اليوم",
  dashboardTodayHelper: "تعرض هذه البطاقات التدفقات الداخلة والخارجة وصافي الحركة والحالة الخاصة باليوم فقط.",
  controls: "التحكم",
  quickControls: "إجراءات سريعة",
  addTransaction: "إضافة معاملة",
  generateReport: "إنشاء تقرير",
  viewMonthlyReports: "عرض التقارير الشهرية",
  viewForecast: "عرض التوقعات",
  cashRunway: "مدة كفاية النقد",
  runwayCaption: "بناءً على النقد المتاح ومتوسط المصروفات اليومية",
  runwayCaptionPeriod: "بناءً على النقد المتاح ومتوسط المصروفات اليومية خلال {period}",
  operatingCashFlow: "التدفق النقدي التشغيلي",
  operatingCashFlowCaption: "عبر المعاملات المحفوظة",
  topExpenseCategory: "أكبر فئة مصروفات",
  topExpenseCategoryCaption: "عبر المعاملات المحفوظة",
  snapshot: "لمحة سريعة",
  businessSnapshot: "لمحة عن النشاط",
  businessSnapshotHelper: "بناءً على سجل المعاملات المحفوظ والنشاط الأخير.",
  quickInsights: "مؤشرات سريعة",
  quickInsightsHelper: "تعتمد مؤشرات اللمحة على سجل المعاملات المحفوظ.",
  recentActivity: "النشاط الأخير",
  recentTransactions: "آخر المعاملات",
  viewAll: "عرض الكل",
  cashLedger: "سجل النقد",
  transactions: "المعاملات",
  newEntry: "إدخال جديد",
  transactionType: "نوع المعاملة",
  inflow: "تدفق داخل",
  outflow: "مصروف",
  inflowLabel: "تدفق داخل",
  outflowLabel: "مصروف",
  amount: "المبلغ",
  category: "الفئة",
  date: "التاريخ",
  notes: "ملاحظات",
  categoryPlaceholder: "مبيعات، إيجار، رواتب...",
  notesPlaceholder: "تفاصيل اختيارية للمعاملة",
  productName: "اسم الصنف",
  quantity: "الكمية",
  purchaseUnitPrice: "سعر شراء الوحدة",
  sellingUnitPrice: "سعر بيع الوحدة",
  product: "الصنف",
  profit: "الربح",
  inventory: "المخزن",
  stockControl: "إدارة المخزون",
  inventoryManagement: "إدارة المخزن",
  totalProducts: "إجمالي الأصناف",
  totalStockValue: "قيمة المخزون",
  lowStockItems: "أصناف قربت تخلص",
  outOfStockItems: "أصناف نفدت",
  products: "الأصناف",
  addProduct: "إضافة صنف",
  productCategoryPlaceholder: "إكسسوارات",
  openingQuantity: "الكمية الافتتاحية",
  minimumStock: "الحد الأدنى للمخزون",
  optionalProductNotes: "ملاحظات اختيارية عن الصنف",
  stockMovement: "حركة المخزون",
  recordStockMovement: "تسجيل حركة مخزون",
  movementType: "نوع الحركة",
  stockInPurchase: "دخول مخزون / شراء بضاعة",
  stockOutSell: "خروج مخزون / بيع بضاعة",
  saveMovement: "حفظ الحركة",
  optionalMovementNotes: "ملاحظات اختيارية عن الحركة",
  productList: "قائمة الأصناف",
  inventoryProducts: "أصناف المخزن",
  currentStock: "الكمية الحالية",
  stockValue: "قيمة المخزون",
  status: "الحالة",
  actions: "إجراءات",
  outOfStock: "نفد المخزون",
  lowStock: "مخزون منخفض",
  inStock: "متوفر",
  stockHistory: "سجل المخزون",
  stockMovements: "حركات المخزون",
  movement: "الحركة",
  unitPrice: "سعر الوحدة",
  totalAmount: "الإجمالي",
  linkedTransaction: "المعاملة المرتبطة",
  noProductsYet: "لا توجد أصناف بعد. أضف صنفًا لبدء إدارة المخزون.",
  noStockMovementsYet: "لا توجد حركات مخزون بعد.",
  selectProduct: "اختر الصنف",
  inventoryProductRequired: "اسم الصنف مطلوب.",
  inventoryInvalidPrice: "يجب أن تكون الأسعار صفرًا أو أكبر.",
  inventoryInvalidQuantity: "يجب أن تكون الكميات صفرًا أو أكبر.",
  movementProductRequired: "اختر صنفًا أولًا.",
  movementInvalidQuantity: "يجب أن تكون الكمية أكبر من صفر.",
  movementInsufficientStock: "لا يمكن بيع كمية أكبر من المخزون الحالي.",
  deleteProductConfirm: "هل تريد حذف هذا الصنف وحركات المخزون الخاصة به؟ ستبقى المعاملات المالية المرتبطة في السجل.",
  inventoryPurchaseCategory: "مشتريات مخزون",
  productSalesCategory: "مبيعات منتجات",
  linkedTransactionLabel: "معاملة مرتبطة",
  action: "الإجراء",
  type: "النوع",
  delete: "حذف",
  history: "السجل",
  exactDate: "تاريخ محدد",
  monthFilter: "تصفية بالشهر",
  month: "الشهر",
  year: "السنة",
  clear: "مسح",
  clearFilters: "مسح الفلاتر",
  january: "يناير",
  february: "فبراير",
  march: "مارس",
  april: "أبريل",
  may: "مايو",
  june: "يونيو",
  july: "يوليو",
  august: "أغسطس",
  september: "سبتمبر",
  october: "أكتوبر",
  november: "نوفمبر",
  december: "ديسمبر",
  clearSearch: "مسح البحث",
  searchCategory: "بحث الفئة",
  allTypes: "كل الأنواع",
  inflows: "التدفقات الداخلة",
  outflows: "المصروفات",
  transactionsTable: "جدول المعاملات",
  performanceIntelligence: "ذكاء الأداء",
  analytics: "التحليلات",
  totalInflows: "إجمالي التدفقات الداخلة",
  totalOutflows: "إجمالي المصروفات",
  averageNetCashFlow: "متوسط صافي التدفق النقدي",
  averageNetCaption: "لكل يوم تقويمي في الفترة المحددة",
  numberOfTransactions: "عدد المعاملات",
  analysisControls: "عناصر التحكم في التحليل",
  analyticsPeriod: "فترة التحليل",
  analysisPeriod: "فترة التحليل",
  analyticsHelperText: "اختر فترة أو قارن عدة أشهر لفهم أداء النشاط.",
  showingAnalyticsFor: "تحليل:",
  last7Days: "آخر 7 أيام",
  last14Days: "آخر 14 يومًا",
  last30Days: "آخر 30 يومًا",
  currentMonthToDate: "الشهر الحالي حتى اليوم",
  previousMonth: "الشهر السابق",
  customRange: "نطاق مخصص",
  monthlyComparison: "مقارنة شهرية",
  fromDate: "من تاريخ",
  toDate: "إلى تاريخ",
  apply: "تطبيق",
  invalidDateRange: "يجب أن يكون تاريخ البداية قبل تاريخ النهاية أو مساويًا له.",
  invalidMonthRange: "يجب أن يكون شهر البداية قبل شهر النهاية أو مساويًا له.",
  selectDateRange: "اختر تاريخ البداية والنهاية لتحليل نطاق مخصص.",
  selectWiderMonthRange: "اختر نطاقًا أوسع لمقارنة عدة أشهر.",
  noAnalyticsTransactions: "لا توجد معاملات لهذه الفترة.",
  startMonth: "شهر البداية",
  startYear: "سنة البداية",
  endMonth: "شهر النهاية",
  endYear: "سنة النهاية",
  comparedWith: "مقارنة مع",
  difference: "الفرق",
  transactionCountDifference: "فرق عدد المعاملات",
  averageDifference: "فرق متوسط صافي التدفق اليومي",
  compareMonthlyPerformance: "قارن أداء التدفق النقدي الشهري",
  monthlyComparisonSubtitle: "قارن التدفقات الداخلة والمصروفات وصافي التدفق النقدي عبر الأشهر المحددة.",
  monthlyPerformanceTable: "جدول الأداء الشهري",
  monthlyComparisonInsightsTitle: "مؤشرات المقارنة الشهرية",
  insights: "مؤشرات",
  averageDailyNet: "متوسط صافي التدفق اليومي",
  bestMonth: "أفضل شهر",
  weakestMonth: "أضعف شهر",
  highestOutflowMonth: "أعلى شهر في المصروفات",
  highestInflowMonth: "أعلى شهر في التدفقات الداخلة",
  withNetCashFlow: "بصافي تدفق نقدي",
  withOutflows: "بمصروفات",
  withInflows: "بتدفقات داخلة",
  dailyMovement: "الحركة اليومية",
  inflowsVsOutflows: "التدفقات الداخلة مقابل المصروفات",
  trend: "الاتجاه",
  netCashFlowTrend: "اتجاه صافي التدفق النقدي",
  categories: "الفئات",
  topCategoryAnalysis: "تحليل أكبر الفئات",
  planning: "التخطيط",
  forecasting: "التوقعات",
  shortTermOutlook: "نظرة قصيرة الأجل",
  forecastChart: "توقع صافي الحركة النقدية",
  after7: "بعد 7 أيام",
  after14: "بعد 14 يومًا",
  after30: "بعد 30 يومًا",
  projectedNetMovement7: "صافي الحركة المتوقع خلال 7 أيام",
  projectedNetMovement14: "صافي الحركة المتوقع خلال 14 يومًا",
  projectedNetMovement30: "صافي الحركة المتوقع خلال 30 يومًا",
  forecastMovementHelper: "تعتمد التوقعات على متوسط صافي الحركة النقدية اليومية خلال آخر 7 أيام تقويمية. وهي تقدّر حركة النقد وليست رصيدًا مستقبليًا مضمونًا.",
  forecastCardHelper: "بناءً على المتوسط اليومي الحديث",
  executiveView: "عرض تنفيذي",
  reports: "التقارير",
  exportReport: "تصدير التقرير",
  exportPdf: "تصدير PDF",
  reportControls: "عناصر التقرير",
  reportMonth: "شهر التقرير",
  reportYear: "سنة التقرير",
  generateUpdateReport: "إنشاء تقرير",
  reportAutoUpdateHelper: "يتم تحديث التقرير تلقائيًا عند تغيير الشهر أو السنة.",
  showingReportFor: "فترة التقرير:",
  reportSelectedMonthOnly: "يتم حساب التقرير من الشهر المحدد فقط ويتحدث تلقائيًا عند تغيير الشهر أو السنة.",
  monthlyFinancialReport: "تقرير مالي شهري",
  monthlySummary: "ملخص شهري",
  currentMonth: "الشهر الحالي",
  financialSummary: "ملخص مالي",
  performanceDetails: "تفاصيل الأداء",
  visualAnalysis: "تحليل مرئي",
  recommendedActions: "إجراءات مقترحة",
  cashFlowMix: "مزيج التدفق النقدي",
  analysis: "التحليل",
  noExpenseCategoriesThisPeriod: "لا توجد فئات مصروفات مسجلة في هذه الفترة.",
  noReportActivity: "لا يوجد نشاط مسجل لهذا الشهر المحدد.",
  recommendationSurplusOne: "استمر في متابعة {category} لأنها الأكثر تأثيرًا على حركة النقد.",
  recommendationSurplusTwo: "التدفق النقدي موجب، لذلك يمكن تخطيط المصروفات القصيرة الأجل بأمان أكبر.",
  recommendationSurplusThree: "راجع المصروفات أسبوعيًا لحماية الفائض الحالي.",
  recommendationDeficitOne: "راجع أو خفّض {category}.",
  recommendationDeficitTwo: "أجّل المصروفات غير الضرورية حتى يتحسن التدفق النقدي.",
  recommendationDeficitThree: "عزّز مصادر الدخل أو تابع المدفوعات المعلقة.",
  recommendationBalancedOne: "راقب التدفقات الداخلة والمصروفات اليومية عن قرب.",
  recommendationBalancedTwo: "تجنب المصروفات غير الضرورية حتى لا يتحول الوضع إلى عجز.",
  recommendationBalancedThree: "كوّن احتياطيًا صغيرًا من أي تدفق نقدي موجب لاحق.",
  recommendationEmptyOne: "أضف تدفقات داخلة ومصروفات شهرية حتى يصبح التقرير قابلًا للتحليل.",
  recommendationEmptyTwo: "راجع الشهر المحدد للتأكد من تسجيل النشاط في الفترة الصحيحة.",
  recommendationEmptyThree: "استخدم إعادة بيانات العرض في الإعدادات إذا كنت تريد استرجاع البيانات التجريبية.",
  transactionsSummary: "ملخص المعاملات",
  bestDay: "أفضل يوم",
  worstDay: "أسوأ يوم",
  recentMonthlyActivity: "النشاط الشهري الأخير",
  selectedMonthInflows: "تدفقات الشهر المحدد الداخلة",
  selectedMonthOutflows: "مصروفات الشهر المحدد",
  inflowsMinusOutflows: "التدفقات الداخلة ناقص المصروفات",
  monthlyCashPosition: "وضع النقد الشهري",
  selectedMonthRecords: "سجلات الشهر المحدد",
  dailyMonthlyAverage: "المتوسط اليومي للشهر",
  workspace: "مساحة العمل",
  settings: "الإعدادات",
  businessProfile: "ملف النشاط",
  preferences: "التفضيلات",
  businessName: "اسم النشاط",
  ownerName: "اسم المالك",
  currency: "العملة",
  businessType: "نوع النشاط",
  businessNamePlaceholder: "اسم نشاطك",
  ownerNamePlaceholder: "اسم المالك",
  retail: "تجزئة",
  restaurant: "مطعم",
  services: "خدمات",
  onlineStore: "متجر إلكتروني",
  other: "أخرى",
  usdCurrency: "USD - دولار أمريكي",
  eurCurrency: "EUR - يورو",
  gbpCurrency: "GBP - جنيه إسترليني",
  egpCurrency: "EGP - جنيه مصري",
  englishLanguage: "الإنجليزية",
  arabicLanguage: "العربية",
  language: "اللغة",
  themeToggle: "تبديل المظهر",
  themeCopy: "التبديل بين الوضع الداكن التنفيذي ووضع المراجعة الفاتح.",
  resetDemoData: "استعادة البيانات التجريبية",
  clearDemoData: "مسح البيانات التجريبية",
  logout: "تسجيل الخروج",
  openingBalance: "الرصيد الافتتاحي",
  openingBalanceHelper: "اختياري. الرصيد النقدي المتاح عند بداية استخدام النظام.",
  invalidOpeningBalance: "يجب أن يكون الرصيد الافتتاحي رقمًا صحيحًا وغير سالب.",
  availableCash: "النقد المتاح",
  avgDailyOutflows: "متوسط المصروفات اليومية",
  sevenDayAverage: "متوسط 7 أيام",
  largestExpense: "أكبر مصروف",
  transactionsStored: "المعاملات المحفوظة",
  records: "سجلات",
  noMatchingResults: "لا توجد نتائج مطابقة",
  noExpenseCategories: "لا توجد فئات مصروفات بعد.",
  noMonthlyTransactions: "لا توجد معاملات لهذا الشهر.",
  noTransactionsYet: "لا توجد معاملات بعد. أضف معاملة يدويًا لعرض بيانات اللوحة.",
  reportNoTransactionsInsight: "{month} لا يحتوي على معاملات مسجلة بعد. أضف تدفقات داخلة أو مصروفات لبناء العرض الشهري.",
  reportSurplusInsight: "{month} يظهر فائضًا صحيًا بقيمة {net} مع تدفقات داخلة أعلى من المصروفات.",
  reportDeficitInsight: "{month} يظهر عجزًا بقيمة {net}، لذلك تحتاج المصروفات إلى مراجعة أدق.",
  reportBalancedInsight: "{month} متوازن، حيث إن التدفقات الداخلة والمصروفات متقاربة عبر النشاط المسجل.",
  forecastPositive: "توقع صحي: يظل التدفق النقدي المتوقع موجبًا بناءً على متوسط صافي التدفق اليومي الأخير.",
  forecastNegative: "تنبيه: التدفق النقدي المتوقع سلبي بناءً على متوسط صافي التدفق اليومي الأخير.",
  forecastMovementPositive: "صافي الحركة المتوقع موجب بناءً على متوسط صافي التدفق اليومي الأخير.",
  forecastMovementNegative: "صافي الحركة المتوقع سلبي بناءً على متوسط صافي التدفق اليومي الأخير.",
  balancedLabel: "متوازن",
  surplusLabel: "فائض",
  deficitLabel: "تحذير / عجز",
  balancedShort: "متوازن",
  surplusShort: "فائض",
  deficitShort: "عجز",
  balancedCopy: "حركة النقد متعادلة اليوم.",
  surplusCopy: "التدفقات الداخلة أعلى من المصروفات اليوم.",
  deficitCopy: "المصروفات أعلى من التدفقات الداخلة اليوم.",
  balancedAlert: "متوازن: التدفقات الداخلة والمصروفات متساوية اليوم. راقب المصروفات القادمة.",
  surplusAlert: "فائض صحي: التدفقات الداخلة أعلى اليوم. خصص جزءًا من الفائض للالتزامات القادمة.",
  deficitAlert: "تحذير: حركة النقد دخلت في عجز اليوم. راجع مدفوعات الموردين وتوقيت الرواتب والمصروفات غير الأساسية.",
  transactionSingular: "معاملة",
  transactionPlural: "معاملات",
  restoreConfirm: "هل تريد استعادة البيانات التجريبية؟",
  clearConfirm: "هل تريد مسح كل المعاملات وبيانات المخزون التجريبية؟",
  restoredToast: "تمت استعادة البيانات التجريبية بنجاح.",
  clearedToast: "تم مسح البيانات التجريبية بنجاح.",
  pdfSuccess: "تم تنزيل تقرير PDF بنجاح.",
  pdfError: "تعذر إنشاء التقرير. حاول مرة أخرى.",
  loginError: "بيانات تسجيل الدخول غير صحيحة.",
  noOutflows: "لا توجد مصروفات",
  daysUnit: "يوم",
  avgDailyOutflows90: "متوسط المصروفات اليومية (90 يومًا)",
  runwayCaption90: "بناءً على النقد المتاح ومتوسط المصروفات اليومية خلال 90 يومًا",
  avgDailyOutflowsLast30: "متوسط المصروفات اليومية (آخر 30 يومًا)",
  avgDailyOutflowsStoredRange: "متوسط المصروفات اليومية (نطاق المعاملات المحفوظة)",
  last30CalendarDays: "آخر 30 يومًا تقويميًا",
  storedDateRange: "نطاق تواريخ المعاملات المحفوظة",
  cashFlowProjection: "صافي الحركة المتوقع",
  after7Short: "بعد 7 أيام",
  after14Short: "بعد 14 يومًا",
  after30Short: "بعد 30 يومًا",
  ownerFallback: "المالك",
  demoFallback: "تجريبي",
  to: "إلى"
});

function currentLanguage() {
  return state.settings.language === "ar" ? "ar" : "en";
}

function t(key) {
  const language = currentLanguage();
  if (language === "ar" && Object.prototype.hasOwnProperty.call(arabicUiTranslations, key)) {
    return arabicUiTranslations[key];
  }
  if (language === "ar" && Object.prototype.hasOwnProperty.call(arabicPhaseOneTranslations, key)) {
    return arabicPhaseOneTranslations[key];
  }
  return translations[language][key] || translations.en[key] || key;
}

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function getTodayDateString() {
  return toDateString(new Date());
}

function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateString, days) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function currencyFormatter(fractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: state.settings.currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  });
}

function formatCurrency(value) {
  const amount = roundMoney(value || 0);
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;

  return currencyFormatter(fractionDigits).format(amount);
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat(currentLanguage() === "ar" ? "ar-EG-u-nu-latn" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function formatShortDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat(currentLanguage() === "ar" ? "ar-EG-u-nu-latn" : "en-US", {
    month: "short",
    day: "numeric"
  }).format(new Date(year, month - 1, day));
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const CLIENT_MEDICAL_PRODUCT_ROWS = [
  { name: "جهاز قياس ضغط دم الكترونى", purchaseUnitPrice: 1500, sellingUnitPrice: 1700, quantities: [2, 1, 1] },
  { name: "جهاز قياس سكر بالدم", purchaseUnitPrice: 650, sellingUnitPrice: 850, quantities: [3, 1, 1] },
  { name: "جهاز قياس نسبه الاكسجين بالدم", purchaseUnitPrice: 1100, sellingUnitPrice: 1500, quantities: [5, 5, 5] },
  { name: "ميزان طبى رقمى", purchaseUnitPrice: 1200, sellingUnitPrice: 1800, quantities: [5, 4, 4] },
  { name: "ترمومتر", purchaseUnitPrice: 300, sellingUnitPrice: 500, quantities: [5, 2, 2] },
  { name: "جهاز استنشاق", purchaseUnitPrice: 450, sellingUnitPrice: 650, quantities: [5, 5, 5] },
  { name: "جهاز تركيز الاوكسجين", purchaseUnitPrice: 19000, sellingUnitPrice: 22000, quantities: [1, 1, 1] },
  { name: "جهاز شفط الافرازات", purchaseUnitPrice: 5000, sellingUnitPrice: 7000, quantities: [4, 4, 4] },
  { name: "اسطوانه اكسجين", purchaseUnitPrice: 4000, sellingUnitPrice: 5500, quantities: [5, 5, 5] },
  { name: "عكازات", purchaseUnitPrice: 450, sellingUnitPrice: 700, quantities: [5, 5, 5] },
  { name: "مشيات كبار السن", purchaseUnitPrice: 1200, sellingUnitPrice: 1800, quantities: [5, 5, 5] },
  { name: "كراسى متحركه", purchaseUnitPrice: 5000, sellingUnitPrice: 7500, quantities: [15, 5, 5] },
  { name: "ركبه طبيه", purchaseUnitPrice: 600, sellingUnitPrice: 900, quantities: [20, 10, 100] },
  { name: "سماعات طبيه", purchaseUnitPrice: 1200, sellingUnitPrice: 1800, quantities: [12, 12, 12] },
  { name: "شاش طبى", purchaseUnitPrice: 700, sellingUnitPrice: 1000, quantities: [50, 20, 50] },
  { name: "قطن طبى", purchaseUnitPrice: 220, sellingUnitPrice: 320, quantities: [100, 10, 10] },
  { name: "لاصقات جروح", purchaseUnitPrice: 80, sellingUnitPrice: 150, quantities: [150, 25, 25] },
  { name: "مطهرات", purchaseUnitPrice: 40, sellingUnitPrice: 60, quantities: [150, 25, 25] },
  { name: "اربطه ضغطه", purchaseUnitPrice: 80, sellingUnitPrice: 120, quantities: [25, 25, 25] },
  { name: "قفازات طبيه", purchaseUnitPrice: 180, sellingUnitPrice: 250, quantities: [200, 25, 150] },
  { name: "حفاضات كبار السن", purchaseUnitPrice: 220, sellingUnitPrice: 300, quantities: [150, 25, 25] },
  { name: "اكياس بول", purchaseUnitPrice: 25, sellingUnitPrice: 40, quantities: [175, 25, 25] },
  { name: "جهاز قياس الضعط الزئقى", purchaseUnitPrice: 1400, sellingUnitPrice: 1800, quantities: [10, 10, 10] },
  { name: "سرنجات وابر", purchaseUnitPrice: 180, sellingUnitPrice: 250, quantities: [250, 25, 250] },
  { name: "كمامات طبيه", purchaseUnitPrice: 80, sellingUnitPrice: 120, quantities: [500, 25, 250] },
  { name: "معقمات طبيه", purchaseUnitPrice: 70, sellingUnitPrice: 100, quantities: [20, 20, 250] }
];

const CLIENT_DEMO_EXPENSE_ROWS = [
  { day: 2, amount: 20000, notes: "مرحلة لفرع القاهرة" },
  { day: 9, amount: 20000, notes: "مرحلة لفرع القاهرة" },
  { day: 16, amount: 25000, notes: "مرحلة لفرع القاهرة" },
  { day: 18, amount: 3600, notes: "عمولة ke298د/ محمد عبد الغفار/ السبد محمد السيد" },
  { day: 27, amount: 50, notes: "اكراميات مستشفى التطبيقيين+مستشفى الف سلامة" },
  { day: 28, amount: 145, notes: "فاتورة مياة مكتب سوهاج" },
  { day: 30, amount: 35000, notes: "مرحلة لفرع القاهرة" },
  { day: 31, amount: 100, notes: "نظافة مكتب سوهاج" },
  { day: 31, amount: 4400, notes: "عمولة ke298د/ محمد عبد الغفار/ ريان عماد حمدى" },
  { day: 0, amount: 4125, notes: "مصروفات عادل" },
  { day: 0, amount: 4400, notes: "عمولة ke298د/ محمد عبد الغفار/ منى امين حماد" },
  { day: 0, amount: 5000, notes: "عمولة ke3cicد/ محمد عبد الغفار/ عبد الحميد ماجد" },
  { day: 0, amount: 4400, notes: "عمولة ke298د/ محمد عبد الغفار/ هدية محمد احمد" }
];

const CLIENT_DEMO_MONTHS = [
  { monthOffset: 2, quantityIndex: 0 },
  { monthOffset: 1, quantityIndex: 1 },
  { monthOffset: 0, quantityIndex: 2 }
];

function getClientDemoMonthInfo(monthOffset) {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1);
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  const maxUsableDay = monthOffset === 0 ? Math.max(1, Math.min(today.getDate(), daysInMonth)) : daysInMonth;

  return {
    year: monthStart.getFullYear(),
    month: monthStart.getMonth(),
    daysInMonth,
    maxUsableDay
  };
}

function getClientDemoDate(monthOffset, preferredDay, index, totalRows) {
  const monthInfo = getClientDemoMonthInfo(monthOffset);
  const distributedDay = Math.ceil(((index + 1) / (totalRows + 1)) * monthInfo.maxUsableDay);
  const rawDay = preferredDay > 0 ? preferredDay : distributedDay;
  const day = Math.max(1, Math.min(rawDay, monthInfo.maxUsableDay));

  return toDateString(new Date(monthInfo.year, monthInfo.month, day));
}

function getClientProductCategory(name) {
  if (/عكازات|مشيات|كراسى|ركبه/.test(name)) {
    return "معدات حركة";
  }

  if (/شاش|قطن|لاصقات|مطهرات|اربطه|قفازات|حفاضات|اكياس|سرنجات|كمامات|معقمات/.test(name)) {
    return "مستلزمات طبية";
  }

  if (/جهاز|ميزان|ترمومتر|سماعات|اسطوانه|أسطوانة/.test(name)) {
    return "أجهزة طبية";
  }

  return "إكسسوارات";
}

function getClientExpenseCategory(notes) {
  if (/مرتب|مرتبات|سلف/.test(notes)) {
    return "مرتبات";
  }

  if (/مياة|مياه|كهرباء|غاز|انترنت|تليفون|فاتورة/.test(notes)) {
    return "فواتير";
  }

  if (/انتقال|مرحلة|فرع القاهرة/.test(notes)) {
    return "انتقالات";
  }

  if (/تأمين|معاش|معاشات/.test(notes)) {
    return "تأمينات ومعاشات";
  }

  if (/صيانة|معمل/.test(notes)) {
    return "صيانة";
  }

  return "مصاريف أخرى";
}

function createDemoProductsFromClientRows() {
  return CLIENT_MEDICAL_PRODUCT_ROWS.map((row, index) => {
    const totalSold = row.quantities.reduce((total, quantity) => total + quantity, 0);
    const minimumStock = totalSold >= 100 ? 20 : 10;
    const currentStock = Math.max(minimumStock + 5, Math.ceil(totalSold * 0.25));

    return {
      id: `client-medical-product-${index + 1}`,
      name: row.name,
      category: getClientProductCategory(row.name),
      purchaseUnitPrice: row.purchaseUnitPrice,
      sellingUnitPrice: row.sellingUnitPrice,
      currentStock,
      minimumStock,
      createdAt: getClientDemoDate(2, 1, index, CLIENT_MEDICAL_PRODUCT_ROWS.length),
      notes: "صنف طبي من بيانات العميل التجريبية"
    };
  });
}

function createDemoStockMovementsFromClientRows(products) {
  const productByName = new Map(products.map((product) => [product.name, product]));
  const stockMovements = [];

  CLIENT_DEMO_MONTHS.forEach((month, monthIndex) => {
    CLIENT_MEDICAL_PRODUCT_ROWS.forEach((row, productIndex) => {
      const quantity = Number(row.quantities[month.quantityIndex] || 0);

      if (quantity <= 0) {
        return;
      }

      const product = productByName.get(row.name);
      const totalAmount = roundMoney(quantity * row.sellingUnitPrice);
      const profit = roundMoney((row.sellingUnitPrice - row.purchaseUnitPrice) * quantity);
      const linkedTransactionId = 710000 + monthIndex * 1000 + productIndex + 1;

      stockMovements.push({
        id: `client-stock-out-${monthIndex + 1}-${productIndex + 1}`,
        productId: product.id,
        movementType: "stock-out",
        quantity,
        unitPrice: row.sellingUnitPrice,
        totalAmount,
        profit,
        date: getClientDemoDate(month.monthOffset, 0, productIndex, CLIENT_MEDICAL_PRODUCT_ROWS.length),
        linkedTransactionId,
        notes: `بيع ${quantity} × ${row.name}`
      });
    });
  });

  return stockMovements;
}

function createDemoTransactionsFromClientRows(stockMovements, products) {
  const productById = new Map(products.map((product) => [product.id, product]));
  const salesTransactions = stockMovements.map((movement) => {
    const product = productById.get(movement.productId);

    return {
      id: movement.linkedTransactionId,
      type: "inflow",
      amount: movement.totalAmount,
      category: "مبيعات منتجات",
      date: movement.date,
      notes: `خروج مخزون: بيع ${movement.quantity} × ${product?.name || "صنف"}. الربح: ${formatCurrency(movement.profit)}`
    };
  });
  const expenseTransactions = CLIENT_DEMO_MONTHS.flatMap((month, monthIndex) => {
    return CLIENT_DEMO_EXPENSE_ROWS.map((expense, expenseIndex) => ({
      id: 720000 + monthIndex * 1000 + expenseIndex + 1,
      type: "outflow",
      amount: expense.amount,
      category: getClientExpenseCategory(expense.notes),
      date: getClientDemoDate(month.monthOffset, expense.day, expenseIndex, CLIENT_DEMO_EXPENSE_ROWS.length),
      notes: ""
    }));
  });

  return [...salesTransactions, ...expenseTransactions];
}

function createDemoDataset() {
  const products = createDemoProductsFromClientRows();
  const stockMovements = createDemoStockMovementsFromClientRows(products);
  const transactions = createDemoTransactionsFromClientRows(stockMovements, products);

  return {
    transactions,
    products,
    stockMovements
  };
}

function createDemoTransactions() {
  return createDemoDataset().transactions;
}

function loadState() {
  const savedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
  const savedProducts = localStorage.getItem(PRODUCTS_KEY);
  const savedStockMovements = localStorage.getItem(STOCK_MOVEMENTS_KEY);
  const savedSettings = localStorage.getItem(SETTINGS_KEY);
  const savedUser = localStorage.getItem(USER_KEY);
  const demoData = !savedTransactions ? createDemoDataset() : null;

  state.transactions = savedTransactions ? JSON.parse(savedTransactions) : demoData.transactions;
  state.products = savedProducts ? JSON.parse(savedProducts) : demoData?.products || [];
  state.stockMovements = savedStockMovements ? JSON.parse(savedStockMovements) : demoData?.stockMovements || [];
  state.user = savedUser ? JSON.parse(savedUser) : null;
  state.settings = {
    ...state.settings,
    ...(savedSettings ? JSON.parse(savedSettings) : {}),
    ...(state.user || {})
  };

  saveTransactions();
  saveProducts();
  saveStockMovements();
  saveSettings();
}

function saveTransactions() {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(state.transactions));
}

function saveProducts() {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(state.products));
}

function saveStockMovements() {
  localStorage.setItem(STOCK_MOVEMENTS_KEY, JSON.stringify(state.stockMovements));
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function saveUser() {
  if (state.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(state.user));
  }
}

function cacheElements() {
  Object.assign(elements, {
    authShell: $("#authShell"),
    landingContent: $("#landingContent"),
    authPageView: $("#authPageView"),
    authCards: $all(".auth-card"),
    authViewButtons: $all("[data-auth-view]"),
    startModeButtons: $all("[data-start-mode]"),
    registerForm: $("#registerForm"),
    loginForm: $("#loginForm"),
    registerBusinessName: $("#registerBusinessName"),
    registerOwnerName: $("#registerOwnerName"),
    registerEmail: $("#registerEmail"),
    registerPassword: $("#registerPassword"),
    registerCurrency: $("#registerCurrency"),
    registerBusinessType: $("#registerBusinessType"),
    registerOpeningBalance: $("#registerOpeningBalance"),
    loginEmail: $("#loginEmail"),
    loginPassword: $("#loginPassword"),
    demoLoginHint: $("#demoLoginHint"),
    navItems: $all(".nav-item"),
    sections: $all(".app-section"),
    jumpButtons: $all("[data-jump]"),
    restoreDemoButtons: $all("[data-restore-demo]"),
    clearDemoButtons: $all("[data-clear-demo]"),
    logoutButtons: $all("[data-logout]"),
    globalSearch: $("#globalSearch"),
    clearSearchButton: $("#clearSearchButton"),
    searchResults: $("#searchResults"),
    currentDate: $("#currentDate"),
    headerStatusBadge: $("#headerStatusBadge"),
    profileChip: $("#profileChip"),
    pageTitle: $("#pageTitle"),
    sidebarBusinessName: $("#sidebarBusinessName"),
    sidebarHealth: $("#sidebarHealth"),
    sidebarHealthCopy: $("#sidebarHealthCopy"),
    todayInflows: $("#todayInflows"),
    todayOutflows: $("#todayOutflows"),
    netCashFlow: $("#netCashFlow"),
    businessStatus: $("#businessStatus"),
    statusCaption: $("#statusCaption"),
    statusAlert: $("#statusAlert"),
    statusCard: $("#statusCard"),
    dashboardTodayTitle: $("#dashboardTodayTitle"),
    dashboardTodayHelper: $("#dashboardTodayHelper"),
    recentTransactionsBody: $("#recentTransactionsBody"),
    transactionsBody: $("#transactionsBody"),
    transactionForm: $("#transactionForm"),
    amount: $("#amount"),
    category: $("#category"),
    date: $("#date"),
    notes: $("#notes"),
    typeFilter: $("#typeFilter"),
    dateFilter: $("#dateFilter"),
    monthFilter: $("#monthFilter"),
    yearFilter: $("#yearFilter"),
    categoryFilter: $("#categoryFilter"),
    clearFiltersButton: $("#clearFiltersButton"),
    transactionCountChip: $("#transactionCountChip"),
    cashRunway: $("#cashRunway"),
    cashRunwayCaption: $("#cashRunwayCaption"),
    operatingCashFlow: $("#operatingCashFlow"),
    operatingCashFlowCaption: $("#operatingCashFlowCaption"),
    topExpenseCategory: $("#topExpenseCategory"),
    topExpenseCategoryCaption: $("#topExpenseCategoryCaption"),
    businessSnapshotTitle: $("#businessSnapshotTitle"),
    businessSnapshotHelper: $("#businessSnapshotHelper"),
    quickInsightsHelper: $("#quickInsightsHelper"),
    quickInsights: $("#quickInsights"),
    productForm: $("#productForm"),
    inventoryProductName: $("#inventoryProductName"),
    inventoryProductCategory: $("#inventoryProductCategory"),
    inventoryPurchaseUnitPrice: $("#inventoryPurchaseUnitPrice"),
    inventorySellingUnitPrice: $("#inventorySellingUnitPrice"),
    inventoryOpeningQuantity: $("#inventoryOpeningQuantity"),
    inventoryMinimumStock: $("#inventoryMinimumStock"),
    inventoryProductNotes: $("#inventoryProductNotes"),
    stockMovementForm: $("#stockMovementForm"),
    stockMovementProduct: $("#stockMovementProduct"),
    stockMovementType: $("#stockMovementType"),
    stockMovementQuantity: $("#stockMovementQuantity"),
    stockMovementDate: $("#stockMovementDate"),
    stockMovementNotes: $("#stockMovementNotes"),
    inventoryTotalProducts: $("#inventoryTotalProducts"),
    inventoryStockValue: $("#inventoryStockValue"),
    inventoryLowStock: $("#inventoryLowStock"),
    inventoryOutOfStock: $("#inventoryOutOfStock"),
    inventoryProductsBody: $("#inventoryProductsBody"),
    stockMovementsBody: $("#stockMovementsBody"),
    analyticsPeriodSelector: $("#analyticsPeriodSelector"),
    analyticsPeriodLabel: $("#analyticsPeriodLabel"),
    analyticsCustomControls: $("#analyticsCustomControls"),
    analyticsCompareControls: $("#analyticsCompareControls"),
    analyticsFromDate: $("#analyticsFromDate"),
    analyticsToDate: $("#analyticsToDate"),
    analyticsClearRangeButton: $("#analyticsClearRangeButton"),
    analyticsValidation: $("#analyticsValidation"),
    analyticsComparisonGrid: $("#analyticsComparisonGrid"),
    monthlyComparisonIntro: $("#monthlyComparisonIntro"),
    comparisonStartMonth: $("#comparisonStartMonth"),
    comparisonStartYear: $("#comparisonStartYear"),
    comparisonEndMonth: $("#comparisonEndMonth"),
    comparisonEndYear: $("#comparisonEndYear"),
    monthlySummaryPanel: $("#monthlySummaryPanel"),
    monthlySummaryBody: $("#monthlySummaryBody"),
    monthlyInsightsPanel: $("#monthlyInsightsPanel"),
    monthlyComparisonInsights: $("#monthlyComparisonInsights"),
    totalInflows: $("#totalInflows"),
    totalOutflows: $("#totalOutflows"),
    analyticsNetCashFlow: $("#analyticsNetCashFlow"),
    averageNet: $("#averageNet"),
    averageNetCaption: $("#averageNetCaption"),
    numberOfTransactions: $("#numberOfTransactions"),
    categoryAnalysis: $("#categoryAnalysis"),
    forecastHelper: $("#forecastHelper"),
    forecast7: $("#forecast7"),
    forecast14: $("#forecast14"),
    forecast30: $("#forecast30"),
    forecastInsight: $("#forecastInsight"),
    reportMonthSelector: $("#reportMonthSelector"),
    reportYearSelector: $("#reportYearSelector"),
    selectedReportPeriod: $("#selectedReportPeriod"),
    monthlySummary: $("#monthlySummary"),
    reportMonthInsight: $("#reportMonthInsight"),
    reportInflows: $("#reportInflows"),
    reportOutflows: $("#reportOutflows"),
    reportNet: $("#reportNet"),
    reportBusinessStatus: $("#reportBusinessStatus"),
    bestDay: $("#bestDay"),
    worstDay: $("#worstDay"),
    reportTopExpense: $("#reportTopExpense"),
    reportTransactionCount: $("#reportTransactionCount"),
    reportAverageNet: $("#reportAverageNet"),
    reportAnalysisBars: $("#reportAnalysisBars"),
    reportRecommendations: $("#reportRecommendations"),
    reportTransactionsBody: $("#reportTransactionsBody"),
    exportReportButton: $("#exportReportButton"),
    reportToast: $("#reportToast"),
    businessNameInput: $("#businessNameInput"),
    ownerNameInput: $("#ownerNameInput"),
    openingBalanceInput: $("#openingBalanceInput"),
    currencySelector: $("#currencySelector"),
    businessTypeSelector: $("#businessTypeSelector"),
    languageSelector: $("#languageSelector"),
    themeToggle: $("#themeToggle")
  });
}

function setText(selector, text) {
  const target = $(selector);

  if (target) {
    target.textContent = text;
  }
}

function setHtml(selector, html) {
  const target = $(selector);

  if (target) {
    target.innerHTML = html;
  }
}

function setLabelText(labelSelector, text) {
  const label = $(labelSelector);

  if (!label) {
    return;
  }

  const textNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());

  if (textNode) {
    textNode.textContent = `${text} `;
  }
}

function setOptionText(select, value, text) {
  const option = select?.querySelector(`option[value="${value}"]`);

  if (option) {
    option.textContent = text;
  }
}

function applyLanguage() {
  const isArabic = currentLanguage() === "ar";
  document.documentElement.lang = currentLanguage();
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", isArabic);

  setText(".auth-visual .auth-brand span", t("landingTagline"));
  setText(".auth-hero-copy .auth-kicker", t("cashIntelligence"));
  setHtml(".auth-hero-copy h1", t("landingHeroTitle"));
  setText(".auth-hero-copy > p:last-child", t("landingHeroCopy"));
  setText("#heroHowCard .eyebrow", t("productFlow"));
  setText("#heroHowCard h2", t("howItWorks"));
  const heroSteps = $all("#heroHowCard .hero-step-list > div");
  const heroStepText = [
    ["registerStepTitle", "registerStepCopy"],
    ["transactionsStepTitle", "transactionsStepCopy"],
    ["dashboardStepTitle", "dashboardStepCopy"]
  ];
  heroSteps.forEach((step, index) => {
    const [titleKey, copyKey] = heroStepText[index] || [];
    if (titleKey) setText(`#heroHowCard .hero-step-list > div:nth-child(${index + 1}) strong`, t(titleKey));
    if (copyKey) setText(`#heroHowCard .hero-step-list > div:nth-child(${index + 1}) p`, t(copyKey));
  });
  setText(".feature-section .auth-kicker", t("coreFeatures"));
  setText(".feature-section h2", t("featuresHeading"));
  const featureText = [
    ["dailyCashTracking", "dailyCashTrackingCopy"],
    ["smartForecasting", "smartForecastingCopy"],
    ["visualReports", "visualReportsCopy"]
  ];
  featureText.forEach(([titleKey, copyKey], index) => {
    setText(`.feature-section .auth-stats div:nth-child(${index + 1}) strong`, t(titleKey));
    setText(`.feature-section .auth-stats div:nth-child(${index + 1}) small`, t(copyKey));
  });
  setText("#welcomeScreen .eyebrow", t("welcome"));
  setText("#welcomeScreen h2", t("welcomeTitle"));
  setText("#welcomeScreen > p:not(.eyebrow)", t("welcomeCopy"));
  const welcomeButtons = $("#welcomeScreen")?.querySelectorAll(".action-button") || [];
  if (welcomeButtons[0]) welcomeButtons[0].textContent = t("createBusinessAccount");
  if (welcomeButtons[1]) welcomeButtons[1].textContent = t("login");

  $all('[data-auth-view="welcomeScreen"].text-button').forEach((button) => {
    button.textContent = t("backToWelcome");
  });
  $all('[data-auth-view="welcomeScreen"].auth-back').forEach((button) => {
    button.setAttribute("aria-label", t("backToWelcome"));
  });
  $all('[data-auth-view="registerScreen"].text-button').forEach((button) => {
    button.textContent = t("backToRegister");
  });
  $all('[data-auth-view="registerScreen"].auth-back').forEach((button) => {
    button.setAttribute("aria-label", t("backToRegister"));
  });
  setText("#registerScreen .eyebrow", t("createAccount"));
  setText("#registerScreen h2", t("registerBusinessTitle"));
  setText("#registerScreen .auth-supporting-copy", t("registerSupport"));
  setLabelText("#registerForm label:nth-child(1)", t("businessName"));
  setLabelText("#registerForm label:nth-child(2)", t("ownerName"));
  setLabelText("#registerForm label:nth-child(3)", t("email"));
  setLabelText("#registerForm label:nth-child(4)", t("password"));
  setLabelText("#registerForm label:nth-child(5)", t("currency"));
  setLabelText("#registerForm label:nth-child(6)", t("businessType"));
  setLabelText("#registerForm label:nth-child(7)", t("openingBalance"));
  setText("#registerForm .field-helper", t("openingBalanceHelper"));
  setText("#registerForm .primary-action", t("createAccount"));
  const registerSwitchButton = $("#registerScreen .auth-switch button");
  const registerSwitchText = $("#registerScreen .auth-switch")?.childNodes[0];
  if (registerSwitchText) registerSwitchText.textContent = `${t("alreadyHaveAccount")} `;
  if (registerSwitchButton) registerSwitchButton.textContent = t("login");
  setText("#loginScreen .eyebrow", t("welcomeBack"));
  setText("#loginScreen h2", t("login"));
  setText("#loginScreen .auth-supporting-copy", t("loginSupport"));
  setLabelText("#loginForm label:nth-child(1)", t("email"));
  setLabelText("#loginForm label:nth-child(2)", t("password"));
  setText("#loginForm .primary-action", t("login"));
  const loginSwitchButton = $("#loginScreen .auth-switch button");
  const loginSwitchText = $("#loginScreen .auth-switch")?.childNodes[0];
  if (loginSwitchText) loginSwitchText.textContent = `${t("newHere")} `;
  if (loginSwitchButton) loginSwitchButton.textContent = t("createBusinessAccount");
  setText("#onboardingScreen .eyebrow", t("onboarding"));
  setText("#onboardingScreen h2", t("onboardingTitle"));
  setText("#onboardingScreen > p:not(.eyebrow)", t("onboardingCopy"));
  const onboardingButtons = $("#onboardingScreen")?.querySelectorAll(".action-button") || [];
  if (onboardingButtons[0]) onboardingButtons[0].textContent = t("startWithDemoData");
  if (onboardingButtons[1]) onboardingButtons[1].textContent = t("startEmpty");

  [
    [elements.registerCurrency, "EGP", "egpCurrency"],
    [elements.registerCurrency, "USD", "usdCurrency"],
    [elements.registerCurrency, "EUR", "eurCurrency"],
    [elements.currencySelector, "USD", "usdCurrency"],
    [elements.currencySelector, "EUR", "eurCurrency"],
    [elements.currencySelector, "GBP", "gbpCurrency"],
    [elements.currencySelector, "EGP", "egpCurrency"],
    [elements.registerBusinessType, "Retail", "retail"],
    [elements.registerBusinessType, "Restaurant", "restaurant"],
    [elements.registerBusinessType, "Services", "services"],
    [elements.registerBusinessType, "Online Store", "onlineStore"],
    [elements.registerBusinessType, "Other", "other"],
    [elements.businessTypeSelector, "Retail", "retail"],
    [elements.businessTypeSelector, "Restaurant", "restaurant"],
    [elements.businessTypeSelector, "Services", "services"],
    [elements.businessTypeSelector, "Online Store", "onlineStore"],
    [elements.businessTypeSelector, "Other", "other"],
    [elements.languageSelector, "en", "englishLanguage"],
    [elements.languageSelector, "ar", "arabicLanguage"]
  ].forEach(([select, value, key]) => setOptionText(select, value, t(key)));

  const navLabels = {
    dashboard: "navDashboard",
    transactions: "navTransactions",
    inventory: "navInventory",
    analytics: "navAnalytics",
    forecasting: "navForecasting",
    reports: "navReports",
    settings: "navSettings"
  };

  elements.navItems.forEach((item) => {
    const icon = item.querySelector("span")?.textContent || "";
    item.textContent = "";
    const iconSpan = document.createElement("span");
    iconSpan.textContent = icon;
    item.append(iconSpan, t(navLabels[item.dataset.section]));
  });

  setText(".sidebar-card span", t("cashHealth"));

  const pageTitles = {
    dashboard: "dashboardTitle",
    transactions: "transactions",
    inventory: "inventory",
    analytics: "analytics",
    forecasting: "forecasting",
    reports: "reports",
    settings: "settings"
  };
  elements.pageTitle.textContent = t(pageTitles[state.activeSection] || "dashboardTitle");

  setText(".top-header .eyebrow", t("headerEyebrow"));
  const headerCopy = $(".top-header p:not(.eyebrow)");
  if (headerCopy) {
    headerCopy.textContent = t("headerSubtitle");
  }
  elements.globalSearch.placeholder = t("searchPlaceholder");
  elements.clearSearchButton.setAttribute("aria-label", t("clearSearch"));

  setText(".metric-card.glow-green p", t("todaysInflows"));
  setText(".metric-card.glow-red p", t("todaysOutflows"));
  setText(".metric-card.glow-blue p", t("netCashFlow"));
  setText("#statusCard p", t("businessStatus"));
  setText("#inflowDelta", t("inflowDelta"));
  setText("#outflowDelta", t("outflowDelta"));
  setText(".metric-card.glow-blue small", t("netCaption"));
  setText("#dashboardTodayTitle", t("dashboardTodayTitle"));
  setText("#dashboardTodayHelper", t("dashboardTodayHelper"));
  setText(".quick-actions-panel .eyebrow", t("controls"));
  setText(".quick-actions-panel h2", t("quickControls"));
  const quickButtons = $(".quick-actions-panel")?.querySelectorAll(".action-button") || [];
  if (quickButtons[0]) quickButtons[0].textContent = t("addTransaction");
  if (quickButtons[1]) quickButtons[1].textContent = t("viewMonthlyReports");
  if (quickButtons[2]) quickButtons[2].textContent = t("viewForecast");
  setText(".mini-kpi-grid .mini-kpi:nth-child(1) span", t("cashRunway"));
  setText(".mini-kpi-grid .mini-kpi:nth-child(2) span", t("operatingCashFlow"));
  setText(".mini-kpi-grid .mini-kpi:nth-child(3) span", t("topExpenseCategory"));
  setText("#operatingCashFlowCaption", t("operatingCashFlowCaption"));
  setText("#topExpenseCategoryCaption", t("topExpenseCategoryCaption"));
  setText("#businessSnapshotTitle", t("businessSnapshot"));
  setText("#businessSnapshotHelper", t("businessSnapshotHelper"));
  setText(".insights-column .panel:not(.quick-actions-panel) .eyebrow", t("snapshot"));
  setText(".insights-column .panel:not(.quick-actions-panel) h2", t("quickInsights"));
  setText("#quickInsightsHelper", t("quickInsightsHelper"));
  setText(".primary-column .panel .eyebrow", t("recentActivity"));
  setText(".primary-column .panel h2", t("recentTransactions"));
  setText(".primary-column .ghost-button", t("viewAll"));

  setText("#transactions-section .section-heading-page .eyebrow", t("cashLedger"));
  setText("#transactions-section .section-heading-page h2", t("transactions"));
  setText(".transaction-form .eyebrow", t("newEntry"));
  setText(".transaction-form h2", t("addTransaction"));
  setText('.segmented-control input[value="inflow"] + span', t("inflowLabel"));
  setText('.segmented-control input[value="outflow"] + span', t("outflowLabel"));
  $(".segmented-control")?.setAttribute("aria-label", t("transactionType"));
  setLabelText(".form-grid label:nth-child(1)", t("amount"));
  setLabelText(".form-grid label:nth-child(2)", t("category"));
  setLabelText(".form-grid label:nth-child(3)", t("date"));
  setLabelText(".form-grid label:nth-child(4)", t("notes"));
  elements.category.placeholder = t("categoryPlaceholder");
  elements.notes.placeholder = t("notesPlaceholder");
  setText(".transaction-form .primary-action", t("addTransaction"));
  setText(".filters-heading .eyebrow", t("history"));
  setText(".filters-heading h2", t("transactionsTable"));
  setOptionText(elements.typeFilter, "all", t("allTypes"));
  setOptionText(elements.typeFilter, "inflow", t("inflows"));
  setOptionText(elements.typeFilter, "outflow", t("outflows"));
  elements.typeFilter.setAttribute("aria-label", t("type"));
  elements.dateFilter.setAttribute("aria-label", t("exactDate"));
  elements.monthFilter.setAttribute("aria-label", t("monthFilter"));
  elements.yearFilter.setAttribute("aria-label", t("year"));
  setOptionText(elements.monthFilter, "", t("month"));
  [
    ["01", "january"],
    ["02", "february"],
    ["03", "march"],
    ["04", "april"],
    ["05", "may"],
    ["06", "june"],
    ["07", "july"],
    ["08", "august"],
    ["09", "september"],
    ["10", "october"],
    ["11", "november"],
    ["12", "december"]
  ].forEach(([value, key]) => setOptionText(elements.monthFilter, value, t(key)));
  elements.categoryFilter.placeholder = t("searchCategory");
  elements.clearFiltersButton.textContent = t("clear");
  elements.clearFiltersButton.setAttribute("aria-label", t("clearFilters"));

  const transactionHeaders = [t("date"), t("type"), t("category"), t("amount"), t("notes"), t("action")];
  $all("#transactions-section table thead th").forEach((header, index) => {
    header.textContent = transactionHeaders[index] || header.textContent;
  });
  const recentHeaders = [t("date"), t("type"), t("category"), t("amount")];
  $all(".compact-table thead th").forEach((header, index) => {
    header.textContent = recentHeaders[index] || header.textContent;
  });

  setText("#inventory-section .section-heading-page .eyebrow", t("stockControl"));
  setText("#inventory-section .section-heading-page h2", t("inventoryManagement"));
  const inventoryKpiLabels = [t("totalProducts"), t("totalStockValue"), t("lowStockItems"), t("outOfStockItems")];
  $all(".inventory-kpis .mini-kpi span").forEach((label, index) => {
    label.textContent = inventoryKpiLabels[index] || label.textContent;
  });
  setText("#productForm .panel-heading .eyebrow", t("products"));
  setText("#productForm .panel-heading h2", t("addProduct"));
  setLabelText("#productForm .inventory-product-grid label:nth-child(1)", t("productName"));
  setLabelText("#productForm .inventory-product-grid label:nth-child(2)", t("category"));
  setLabelText("#productForm .inventory-product-grid label:nth-child(3)", t("purchaseUnitPrice"));
  setLabelText("#productForm .inventory-product-grid label:nth-child(4)", t("sellingUnitPrice"));
  setLabelText("#productForm .inventory-product-grid label:nth-child(5)", t("openingQuantity"));
  setLabelText("#productForm .inventory-product-grid label:nth-child(6)", t("minimumStock"));
  setLabelText("#productForm .inventory-product-grid label:nth-child(7)", t("notes"));
  elements.inventoryProductName.placeholder = t("productName");
  elements.inventoryProductCategory.placeholder = t("productCategoryPlaceholder");
  elements.inventoryProductNotes.placeholder = t("optionalProductNotes");
  setText("#productForm .primary-action", t("addProduct"));
  setText("#stockMovementForm .panel-heading .eyebrow", t("stockMovement"));
  setText("#stockMovementForm .panel-heading h2", t("recordStockMovement"));
  setLabelText("#stockMovementForm .form-grid label:nth-child(1)", t("product"));
  setLabelText("#stockMovementForm .form-grid label:nth-child(2)", t("movementType"));
  setLabelText("#stockMovementForm .form-grid label:nth-child(3)", t("quantity"));
  setLabelText("#stockMovementForm .form-grid label:nth-child(4)", t("date"));
  setLabelText("#stockMovementForm .form-grid label:nth-child(5)", t("notes"));
  setOptionText(elements.stockMovementType, "stock-in", t("stockInPurchase"));
  setOptionText(elements.stockMovementType, "stock-out", t("stockOutSell"));
  elements.stockMovementNotes.placeholder = t("optionalMovementNotes");
  setText("#stockMovementForm .primary-action", t("saveMovement"));
  setText(".products-table-panel .eyebrow", t("productList"));
  setText(".products-table-panel h2", t("inventoryProducts"));
  setText(".movements-table-panel .eyebrow", t("stockHistory"));
  setText(".movements-table-panel h2", t("stockMovements"));
  const productHeaders = [t("product"), t("category"), t("currentStock"), t("purchaseUnitPrice"), t("sellingUnitPrice"), t("stockValue"), t("status"), t("actions")];
  $all(".inventory-table-wrap thead th").forEach((header, index) => {
    header.textContent = productHeaders[index] || header.textContent;
  });
  const movementHeaders = [t("date"), t("product"), t("movement"), t("quantity"), t("unitPrice"), t("totalAmount"), t("profit"), t("linkedTransaction")];
  $all(".inventory-movements-wrap thead th").forEach((header, index) => {
    header.textContent = movementHeaders[index] || header.textContent;
  });

  setText("#analytics-section .section-heading-page .eyebrow", t("performanceIntelligence"));
  setText("#analytics-section .section-heading-page h2", t("analytics"));
  setText(".analytics-controls-panel .panel-heading .eyebrow", t("analysisControls"));
  setText(".analytics-controls-panel .panel-heading h2", t("analyticsPeriod"));
  setText(".analytics-helper-text", t("analyticsHelperText"));
  setLabelText(".analytics-control-grid label:nth-child(1)", t("analysisPeriod"));
  setOptionText(elements.analyticsPeriodSelector, "last7", t("last7Days"));
  setOptionText(elements.analyticsPeriodSelector, "last14", t("last14Days"));
  setOptionText(elements.analyticsPeriodSelector, "last30", t("last30Days"));
  setOptionText(elements.analyticsPeriodSelector, "currentMonth", t("currentMonthToDate"));
  setOptionText(elements.analyticsPeriodSelector, "previousMonth", t("previousMonth"));
  setOptionText(elements.analyticsPeriodSelector, "customRange", t("customRange"));
  setOptionText(elements.analyticsPeriodSelector, "monthlyComparison", t("monthlyComparison"));
  setLabelText(".analytics-custom-controls label:nth-child(1)", t("fromDate"));
  setLabelText(".analytics-custom-controls label:nth-child(2)", t("toDate"));
  setText("#analyticsClearRangeButton", t("clear"));
  setLabelText(".analytics-compare-controls label:nth-child(1)", t("startMonth"));
  setLabelText(".analytics-compare-controls label:nth-child(2)", t("startYear"));
  setLabelText(".analytics-compare-controls label:nth-child(3)", t("endMonth"));
  setLabelText(".analytics-compare-controls label:nth-child(4)", t("endYear"));
  setText(".analytics-kpis .mini-kpi:nth-child(1) span", t("totalInflows"));
  setText(".analytics-kpis .mini-kpi:nth-child(2) span", t("totalOutflows"));
  setText(".analytics-kpis .mini-kpi:nth-child(3) span", t("netCashFlow"));
  setText(".analytics-kpis .mini-kpi:nth-child(4) span", t("averageNetCashFlow"));
  setText(".analytics-kpis .mini-kpi:nth-child(5) span", t("numberOfTransactions"));
  setText("#averageNetCaption", t("averageNetCaption"));
  setText(".monthly-comparison-intro .eyebrow", t("monthlyComparison"));
  setText(".monthly-comparison-intro h2", t("compareMonthlyPerformance"));
  setText(".monthly-comparison-intro p:not(.eyebrow)", t("monthlyComparisonSubtitle"));
  setText(".monthly-summary-panel .eyebrow", t("monthlySummary"));
  setText(".monthly-summary-panel h2", t("monthlyPerformanceTable"));
  const monthlyHeaders = [t("month"), t("totalInflows"), t("totalOutflows"), t("netCashFlow"), t("transactions"), t("averageDailyNet")];
  $all(".monthly-summary-table-wrap thead th").forEach((header, index) => {
    header.textContent = monthlyHeaders[index] || header.textContent;
  });
  setText(".monthly-insights-panel .eyebrow", t("insights"));
  setText(".monthly-insights-panel h2", t("monthlyComparisonInsightsTitle"));
  setText("#analytics-section .chart-panel:nth-child(1) .eyebrow", t("dailyMovement"));
  setText("#analytics-section .chart-panel:nth-child(1) h2", t("inflowsVsOutflows"));
  setText("#analytics-section .chart-panel:nth-child(2) .eyebrow", t("trend"));
  setText("#analytics-section .chart-panel:nth-child(2) h2", t("netCashFlowTrend"));
  setText("#analytics-section > .panel .eyebrow", t("categories"));
  setText("#analytics-section > .panel h2", t("topCategoryAnalysis"));

  setText("#forecasting-section .section-heading-page .eyebrow", t("planning"));
  setText("#forecasting-section .section-heading-page h2", t("forecasting"));
  setText("#forecasting-section .forecast-main .eyebrow", t("shortTermOutlook"));
  setText("#forecasting-section .forecast-main h2", t("forecastChart"));
  setText("#forecastHelper", t("forecastMovementHelper"));
  setText(".forecast-side .forecast-card:nth-child(1) span", t("projectedNetMovement7"));
  setText(".forecast-side .forecast-card:nth-child(2) span", t("projectedNetMovement14"));
  setText(".forecast-side .forecast-card:nth-child(3) span", t("projectedNetMovement30"));
  $all(".forecast-side .forecast-card small").forEach((helper) => {
    helper.textContent = t("forecastCardHelper");
  });

  setText("#reports-section .section-heading-page .eyebrow", t("executiveView"));
  setText("#reports-section .section-heading-page h2", t("reports"));
  setText(".report-controls-panel .eyebrow", t("reportControls"));
  setText(".report-controls-panel h2", t("monthlyFinancialReport"));
  setLabelText(".report-controls-grid label:nth-child(1)", t("reportMonth"));
  setLabelText(".report-controls-grid label:nth-child(2)", t("reportYear"));
  setText(".report-controls-helper", t("reportSelectedMonthOnly"));
  setText("#exportReportButton", t("exportPdf"));
  setText(".monthly-report-card .eyebrow", t("monthlySummary"));
  setText(".report-card-group:nth-of-type(1) > .eyebrow", t("financialSummary"));
  setText(".report-card-group:nth-of-type(2) > .eyebrow", t("performanceDetails"));
  const financialLabels = [t("totalInflows"), t("totalOutflows"), t("netCashFlow"), t("businessStatus")];
  $all(".report-card-group:nth-of-type(1) .report-card span").forEach((label, index) => {
    label.textContent = financialLabels[index] || label.textContent;
  });
  const financialHelpers = [t("selectedMonthInflows"), t("selectedMonthOutflows"), t("inflowsMinusOutflows"), t("monthlyCashPosition")];
  $all(".report-card-group:nth-of-type(1) .report-card small").forEach((label, index) => {
    label.textContent = financialHelpers[index] || label.textContent;
  });
  const performanceLabels = [t("bestDay"), t("worstDay"), t("topExpenseCategory"), t("numberOfTransactions"), t("averageNetCashFlow")];
  $all(".report-card-group:nth-of-type(2) .report-card span").forEach((label, index) => {
    label.textContent = performanceLabels[index] || label.textContent;
  });
  setText(".report-card-group:nth-of-type(2) .report-card:nth-child(4) small", t("selectedMonthRecords"));
  setText(".report-card-group:nth-of-type(2) .report-card:nth-child(5) small", t("dailyMonthlyAverage"));
  setText(".report-analysis-panel .eyebrow", t("visualAnalysis"));
  setText(".report-analysis-panel h2", t("recommendedActions"));
  setText(".report-transactions-panel .eyebrow", t("transactionsSummary"));
  setText(".report-transactions-panel h2", t("recentMonthlyActivity"));
  $all(".report-table-wrap thead th").forEach((header, index) => {
    header.textContent = recentHeaders[index] || header.textContent;
  });

  setText("#settings-section .section-heading-page .eyebrow", t("workspace"));
  setText("#settings-section .section-heading-page h2", t("settings"));
  setText(".settings-panel .eyebrow", t("businessProfile"));
  setText(".settings-panel h2", t("preferences"));
  setLabelText(".settings-field-grid label:nth-child(1)", t("businessName"));
  setLabelText(".settings-field-grid label:nth-child(2)", t("ownerName"));
  setLabelText(".settings-field-grid label:nth-child(3)", t("currency"));
  setLabelText(".settings-field-grid label:nth-child(4)", t("businessType"));
  setLabelText(".settings-field-grid label:nth-child(5)", t("openingBalance"));
  setLabelText(".settings-field-grid label:nth-child(6)", t("language"));
  setText(".settings-field-grid .field-helper", t("openingBalanceHelper"));
  elements.businessNameInput.placeholder = t("businessNamePlaceholder");
  elements.ownerNameInput.placeholder = t("ownerNamePlaceholder");
  const toggleText = $(".toggle-row span");
  if (toggleText) {
    toggleText.childNodes[0].textContent = `${t("themeToggle")} `;
  }
  setText(".toggle-row small", t("themeCopy"));
  const settingsButtons = $(".settings-action-grid")?.querySelectorAll(".action-button") || [];
  if (settingsButtons[0]) settingsButtons[0].textContent = t("resetDemoData");
  if (settingsButtons[1]) settingsButtons[1].textContent = t("clearDemoData");
  if (settingsButtons[2]) settingsButtons[2].textContent = t("logout");
}

function showAuthView(viewId) {
  const showLandingState = viewId === "welcomeScreen";
  elements.landingContent.classList.toggle("hidden", !showLandingState);
  elements.authPageView.classList.toggle("active", !showLandingState);
  elements.authCards.forEach((card) => card.classList.toggle("active", !showLandingState && card.id === viewId));

  if (!showLandingState) {
    if (typeof elements.authShell.scrollTo === "function") {
      elements.authShell.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      elements.authShell.scrollTop = 0;
    }
  }

  if (elements.demoLoginHint) {
    elements.demoLoginHint.textContent = "";
  }
}

function updateAuthVisibility() {
  const isLoggedIn = Boolean(state.user?.loggedIn);
  document.body.classList.toggle("auth-active", !isLoggedIn);
  elements.authShell.classList.toggle("visible", !isLoggedIn);

  if (!isLoggedIn) {
    showAuthView("welcomeScreen");
  }
}

function registerUser(event) {
  event.preventDefault();
  const openingBalanceData = getOpeningBalanceInputData(elements.registerOpeningBalance);

  if (!openingBalanceData.isValid) {
    elements.registerOpeningBalance.setCustomValidity(t("invalidOpeningBalance"));
    elements.registerOpeningBalance.reportValidity();
    elements.registerOpeningBalance.setCustomValidity("");
    return;
  }

  state.user = {
    businessName: elements.registerBusinessName.value.trim(),
    ownerName: elements.registerOwnerName.value.trim(),
    email: elements.registerEmail.value.trim().toLowerCase(),
    password: elements.registerPassword.value,
    currency: elements.registerCurrency.value,
    businessType: elements.registerBusinessType.value,
    openingBalance: openingBalanceData.value,
    openingBalanceCustom: openingBalanceData.hasValue,
    loggedIn: false,
    onboarded: false
  };

  state.settings = {
    ...state.settings,
    businessName: state.user.businessName,
    ownerName: state.user.ownerName,
    email: state.user.email,
    currency: state.user.currency,
    businessType: state.user.businessType,
    openingBalance: state.user.openingBalance,
    openingBalanceCustom: state.user.openingBalanceCustom
  };

  saveUser();
  saveSettings();
  showAuthView("onboardingScreen");
}

function completeOnboarding(mode) {
  if (!state.user) {
    return;
  }

  if (mode === "demo") {
    const demoData = createDemoDataset();
    state.transactions = demoData.transactions;
    state.products = demoData.products;
    state.stockMovements = demoData.stockMovements;
  } else {
    state.transactions = [];
    state.products = [];
    state.stockMovements = [];
  }
  if (!state.settings.openingBalanceCustom) {
    state.settings.openingBalance = mode === "demo" ? DEMO_OPENING_BALANCE : 0;
  }
  state.user.openingBalance = state.settings.openingBalance;
  state.user.openingBalanceCustom = state.settings.openingBalanceCustom;
  state.user.loggedIn = true;
  state.user.onboarded = true;
  saveUser();
  saveTransactions();
  saveProducts();
  saveStockMovements();
  saveSettings();
  updateAuthVisibility();
  refreshApp();
}

function loginUser(event) {
  event.preventDefault();

  const email = elements.loginEmail.value.trim().toLowerCase();
  const password = elements.loginPassword.value;

  if (!state.user || state.user.email !== email || state.user.password !== password) {
    elements.loginEmail.setCustomValidity(t("loginError"));
    elements.loginEmail.reportValidity();
    elements.loginEmail.setCustomValidity("");
    return;
  }

  if (!state.user.onboarded) {
    showAuthView("onboardingScreen");
    return;
  }

  state.user.loggedIn = true;
  saveUser();
  updateAuthVisibility();
  refreshApp();
}

function logoutUser() {
  if (state.user) {
    state.user.loggedIn = false;
    saveUser();
  }

  updateAuthVisibility();
}

function getDateLabels(days) {
  const today = getTodayDateString();
  const labels = [];

  for (let index = days - 1; index >= 0; index -= 1) {
    labels.push(addDays(today, -index));
  }

  return labels;
}

function getDailyTotals(dateString) {
  return state.transactions.reduce(
    (totals, transaction) => {
      if (transaction.date !== dateString) {
        return totals;
      }

      if (transaction.type === "inflow") {
        totals.inflow += Number(transaction.amount);
      } else {
        totals.outflow += Number(transaction.amount);
      }

      return totals;
    },
    { inflow: 0, outflow: 0 }
  );
}

function getDailyRows(days = 14) {
  return getDateLabels(days).map((date) => {
    const totals = getDailyTotals(date);
    return {
      date,
      inflow: roundMoney(totals.inflow),
      outflow: roundMoney(totals.outflow),
      net: roundMoney(totals.inflow - totals.outflow)
    };
  });
}

function parseDateString(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getDateRangeLabels(startDateString, endDateString) {
  const labels = [];
  const current = parseDateString(startDateString);
  const end = parseDateString(endDateString);

  while (current <= end) {
    labels.push(toDateString(current));
    current.setDate(current.getDate() + 1);
  }

  return labels;
}

function getMonthRange(year, monthNumber, monthToDate = false) {
  const monthIndex = Number(monthNumber) - 1;
  const today = new Date();
  const start = new Date(Number(year), monthIndex, 1);
  const lastDate = new Date(Number(year), monthIndex + 1, 0);
  const end = monthToDate && today.getFullYear() === Number(year) && today.getMonth() === monthIndex
    ? today
    : lastDate;

  return {
    start: toDateString(start),
    end: toDateString(end)
  };
}

function filterTransactionsByDateRange(startDateString, endDateString) {
  return state.transactions.filter((transaction) => transaction.date >= startDateString && transaction.date <= endDateString);
}

function getTransactionDateBounds(transactions = state.transactions) {
  if (!transactions.length) {
    return null;
  }

  const dates = transactions.map((transaction) => transaction.date).sort();
  return {
    start: dates[0],
    end: dates[dates.length - 1]
  };
}

function getInclusiveDayCount(startDateString, endDateString) {
  return getDateRangeLabels(startDateString, endDateString).length;
}

function getRunwayOutflowPeriod() {
  const today = getTodayDateString();
  const bounds = getTransactionDateBounds();

  if (!bounds) {
    return {
      start: addDays(today, -29),
      end: today,
      labelKey: "last30CalendarDays"
    };
  }

  const storedDayCount = getInclusiveDayCount(bounds.start, bounds.end);

  if (storedDayCount < 30) {
    return {
      start: bounds.start,
      end: bounds.end,
      labelKey: "storedDateRange"
    };
  }

  return {
    start: addDays(today, -29),
    end: today,
    labelKey: "last30CalendarDays"
  };
}

function getTotals(transactions = state.transactions) {
  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.type === "inflow") {
        totals.inflow += Number(transaction.amount);
      } else {
        totals.outflow += Number(transaction.amount);
      }
      return totals;
    },
    { inflow: 0, outflow: 0 }
  );
}

function getStatus(net) {
  if (net < 0) {
    return {
      key: "deficit",
      label: t("deficitLabel"),
      short: t("deficitShort"),
      copy: t("deficitCopy"),
      alert: t("deficitAlert")
    };
  }

  if (net === 0) {
    return {
      key: "balanced",
      label: t("balancedLabel"),
      short: t("balancedShort"),
      copy: t("balancedCopy"),
      alert: t("balancedAlert")
    };
  }

  return {
    key: "surplus",
    label: t("surplusLabel"),
    short: t("surplusShort"),
    copy: t("surplusCopy"),
    alert: t("surplusAlert")
  };
}

function getCategoryTotals(type = "outflow") {
  const totals = new Map();

  state.transactions
    .filter((transaction) => transaction.type === type)
    .forEach((transaction) => {
      totals.set(transaction.category, (totals.get(transaction.category) || 0) + Number(transaction.amount));
    });

  return Array.from(totals.entries())
    .map(([category, amount]) => ({ category, amount: roundMoney(amount) }))
    .sort((a, b) => b.amount - a.amount);
}

function getForecast() {
  const recentRows = getDailyRows(7);
  const averageNet = roundMoney(recentRows.reduce((total, row) => total + row.net, 0) / recentRows.length);

  return {
    averageNet,
    after7: roundMoney(averageNet * 7),
    after14: roundMoney(averageNet * 14),
    after30: roundMoney(averageNet * 30),
    rows: recentRows.map((row, index) => ({
      label: index === 6 ? t("today") : formatShortDate(row.date),
      value: row.net
    }))
  };
}

function getDashboardInsightMetrics() {
  const totals = getTotals();
  const netCashFlow = roundMoney(totals.inflow - totals.outflow);
  const openingBalance = getOpeningBalance();
  const availableCash = roundMoney(openingBalance + netCashFlow);
  const runwayPeriod = getRunwayOutflowPeriod();
  const runwayDateLabels = getDateRangeLabels(runwayPeriod.start, runwayPeriod.end);
  const runwayTransactions = filterTransactionsByDateRange(runwayPeriod.start, runwayPeriod.end);
  const runwayRows = getCalendarRowsForDates(runwayDateLabels, runwayTransactions);
  const runwayOutflows = runwayRows.reduce((total, row) => total + row.outflow, 0);
  const averageDailyOutflows = runwayOutflows > 0
    ? roundMoney(runwayOutflows / runwayRows.length)
    : 0;
  const runwayDays = averageDailyOutflows > 0 ? Math.max(0, Math.round(availableCash / averageDailyOutflows)) : Infinity;
  const topExpenseCategory = getCategoryTotals("outflow")[0];
  const largestExpense = state.transactions
    .filter((transaction) => transaction.type === "outflow")
    .sort((a, b) => Number(b.amount) - Number(a.amount))[0];

  return {
    totalInflows: roundMoney(totals.inflow),
    totalOutflows: roundMoney(totals.outflow),
    netCashFlow,
    openingBalance,
    availableCash,
    averageDailyOutflows,
    averageDailyOutflowsLabel: runwayPeriod.labelKey === "last30CalendarDays" ? t("avgDailyOutflowsLast30") : t("avgDailyOutflowsStoredRange"),
    runwayPeriodLabel: t(runwayPeriod.labelKey),
    runwayDays,
    topExpenseCategory,
    largestExpense,
    sevenDayAverage: getForecast().averageNet
  };
}

function searchMatches(transaction, query) {
  if (!query) {
    return true;
  }

  const haystack = [
    transaction.category,
    transaction.type,
    String(transaction.amount),
    formatCurrency(transaction.amount),
    transaction.notes,
    transaction.date,
    formatDate(transaction.date)
  ].join(" ").toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function getSearchResults() {
  const query = elements.globalSearch.value.trim();

  if (!query) {
    return [];
  }

  return sortedTransactions().filter((transaction) => searchMatches(transaction, query));
}

function populateYearFilter() {
  const selectedYear = elements.yearFilter.value;
  const years = new Set([String(new Date().getFullYear())]);

  state.transactions.forEach((transaction) => {
    years.add(transaction.date.slice(0, 4));
  });

  const sortedYears = Array.from(years).sort((a, b) => Number(b) - Number(a));
  elements.yearFilter.innerHTML = [
    `<option value="">${t("year")}</option>`,
    ...sortedYears.map((year) => `<option value="${year}">${year}</option>`)
  ].join("");

  if (sortedYears.includes(selectedYear)) {
    elements.yearFilter.value = selectedYear;
  }
}

function getReportYears() {
  const years = new Set([String(new Date().getFullYear())]);
  state.transactions.forEach((transaction) => years.add(transaction.date.slice(0, 4)));
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

function populateReportControls() {
  const selectedMonth = state.report.month;
  const selectedYear = state.report.year;
  const monthOptions = monthOptionKeys().map(([value, key]) => `<option value="${value}">${t(key)}</option>`).join("");
  const years = getReportYears();

  elements.reportMonthSelector.innerHTML = monthOptions;
  elements.reportYearSelector.innerHTML = years.map((year) => `<option value="${year}">${year}</option>`).join("");
  elements.reportMonthSelector.value = selectedMonth;
  elements.reportYearSelector.value = years.includes(selectedYear) ? selectedYear : years[0];
  state.report.year = elements.reportYearSelector.value;
}

function filteredTransactions() {
  const type = elements.typeFilter.value;
  const date = elements.dateFilter.value;
  const month = elements.monthFilter.value;
  const year = elements.yearFilter.value;
  const category = elements.categoryFilter.value.trim().toLowerCase();
  const globalSearch = elements.globalSearch.value.trim();

  return state.transactions
    .filter((transaction) => type === "all" || transaction.type === type)
    .filter((transaction) => {
      if (date) {
        return transaction.date === date;
      }

      return !(month && year) || transaction.date.startsWith(`${year}-${month}-`);
    })
    .filter((transaction) => !category || transaction.category.toLowerCase().includes(category))
    .filter((transaction) => searchMatches(transaction, globalSearch))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
}

function sortedTransactions() {
  return [...state.transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
}

function renderStatusClass(target, statusKey) {
  target.classList.remove("balanced", "surplus", "deficit");
  target.classList.add(statusKey);
}

function renderDashboard() {
  const today = getTodayDateString();
  const todayTotals = getDailyTotals(today);
  const net = roundMoney(todayTotals.inflow - todayTotals.outflow);
  const status = getStatus(net);
  const insightMetrics = getDashboardInsightMetrics();
  const topExpense = insightMetrics.topExpenseCategory;
  const largestExpense = insightMetrics.largestExpense;

  elements.currentDate.textContent = formatDate(today);
  elements.todayInflows.textContent = formatCurrency(todayTotals.inflow);
  elements.todayOutflows.textContent = formatCurrency(todayTotals.outflow);
  elements.netCashFlow.textContent = formatCurrency(net);
  elements.businessStatus.textContent = status.label;
  elements.statusCaption.textContent = status.copy;
  elements.statusAlert.textContent = state.transactions.length ? status.alert : t("noTransactionsYet");
  elements.headerStatusBadge.textContent = status.label;
  elements.sidebarHealth.textContent = status.short;
  elements.sidebarHealthCopy.textContent = status.copy;
  elements.cashRunway.textContent = Number.isFinite(insightMetrics.runwayDays) ? `${insightMetrics.runwayDays} ${t("daysUnit")}` : t("noOutflows");
  elements.cashRunwayCaption.textContent = t("runwayCaptionPeriod").replace("{period}", insightMetrics.runwayPeriodLabel);
  elements.operatingCashFlow.textContent = formatCurrency(insightMetrics.netCashFlow);
  elements.topExpenseCategory.textContent = topExpense ? topExpense.category : "--";

  renderStatusClass(elements.statusAlert, status.key);
  renderStatusClass(elements.headerStatusBadge, status.key);
  elements.statusCard.classList.toggle("deficit", status.key === "deficit");
  elements.statusCard.classList.toggle("surplus", status.key === "surplus");

  elements.quickInsights.innerHTML = [
    [t("openingBalance"), formatCurrency(insightMetrics.openingBalance)],
    [t("availableCash"), formatCurrency(insightMetrics.availableCash)],
    [insightMetrics.averageDailyOutflowsLabel, formatCurrency(insightMetrics.averageDailyOutflows)],
    [t("sevenDayAverage"), formatCurrency(insightMetrics.sevenDayAverage)],
    [t("largestExpense"), largestExpense ? `${largestExpense.category} - ${formatCurrency(largestExpense.amount)}` : "--"],
    [t("transactionsStored"), `${state.transactions.length} ${t("records")}`]
  ]
    .map(([label, value]) => `<div class="insight-row"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  renderRecentTransactions();
}

function transactionRows(transactions, includeAction = true) {
  if (transactions.length === 0) {
    const columns = includeAction ? 6 : 4;
    return `<tr><td colspan="${columns}" class="empty-state">${t("noMatchingResults")}</td></tr>`;
  }

  return transactions
    .map((transaction) => {
      const amountClass = transaction.type === "inflow" ? "amount-inflow" : "amount-outflow";
      const amountPrefix = transaction.type === "inflow" ? "+" : "-";
      const amount = `${amountPrefix}${formatCurrency(transaction.amount)}`;
      const highlightClass = state.highlightedTransactionId === transaction.id ? "highlight-row" : "";
      const typeLabel = transaction.type === "inflow" ? t("inflowLabel") : t("outflowLabel");

      if (!includeAction) {
        return `
          <tr class="${highlightClass}" data-row-id="${transaction.id}">
            <td>${formatDate(transaction.date)}</td>
            <td><span class="type-badge ${transaction.type}">${typeLabel}</span></td>
            <td>${escapeHtml(transaction.category)}</td>
            <td class="${amountClass}">${amount}</td>
          </tr>
        `;
      }

      return `
        <tr class="${highlightClass}" data-row-id="${transaction.id}">
          <td>${formatDate(transaction.date)}</td>
          <td><span class="type-badge ${transaction.type}">${typeLabel}</span></td>
          <td>${escapeHtml(transaction.category)}</td>
          <td class="${amountClass}">${amount}</td>
          <td>${transaction.notes ? escapeHtml(transaction.notes) : "-"}</td>
          <td><button class="delete-button" type="button" data-delete-id="${transaction.id}">${t("delete")}</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderRecentTransactions() {
  elements.recentTransactionsBody.innerHTML = transactionRows(sortedTransactions().slice(0, 6), false);
}

function renderTransactions() {
  populateYearFilter();
  const transactions = filteredTransactions();
  elements.transactionsBody.innerHTML = transactionRows(transactions, true);
  elements.transactionCountChip.textContent = `${transactions.length} ${transactions.length === 1 ? t("transactionSingular") : t("transactionPlural")}`;
}

function getInventoryStatus(product) {
  if (Number(product.currentStock) === 0) {
    return { key: "out", label: t("outOfStock") };
  }

  if (Number(product.currentStock) <= Number(product.minimumStock)) {
    return { key: "low", label: t("lowStock") };
  }

  return { key: "in", label: t("inStock") };
}

function getInventoryMetrics() {
  const totalProducts = state.products.length;
  const totalStockValue = state.products.reduce((total, product) => {
    return total + Number(product.currentStock || 0) * Number(product.purchaseUnitPrice || 0);
  }, 0);
  const lowStockItems = state.products.filter((product) => Number(product.currentStock) > 0 && Number(product.currentStock) <= Number(product.minimumStock)).length;
  const outOfStockItems = state.products.filter((product) => Number(product.currentStock) === 0).length;

  return {
    totalProducts,
    totalStockValue: roundMoney(totalStockValue),
    lowStockItems,
    outOfStockItems
  };
}

function populateStockProductSelect() {
  const selectedProduct = elements.stockMovementProduct.value;
  elements.stockMovementProduct.innerHTML = [
    `<option value="">${t("selectProduct")}</option>`,
    ...state.products.map((product) => `<option value="${product.id}">${escapeHtml(product.name)}</option>`)
  ].join("");

  if (state.products.some((product) => product.id === selectedProduct)) {
    elements.stockMovementProduct.value = selectedProduct;
  }
}

function renderInventoryProducts() {
  if (!state.products.length) {
    elements.inventoryProductsBody.innerHTML = `<tr><td colspan="8" class="empty-state">${t("noProductsYet")}</td></tr>`;
    return;
  }

  elements.inventoryProductsBody.innerHTML = [...state.products]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((product) => {
      const status = getInventoryStatus(product);
      const stockValue = roundMoney(Number(product.currentStock || 0) * Number(product.purchaseUnitPrice || 0));

      return `
        <tr>
          <td>${escapeHtml(product.name)}</td>
          <td>${product.category ? escapeHtml(product.category) : "-"}</td>
          <td>${Number(product.currentStock || 0)}</td>
          <td>${formatCurrency(product.purchaseUnitPrice)}</td>
          <td>${formatCurrency(product.sellingUnitPrice)}</td>
          <td>${formatCurrency(stockValue)}</td>
          <td><span class="stock-status ${status.key}">${status.label}</span></td>
          <td><button class="delete-button" type="button" data-delete-product-id="${product.id}">${t("delete")}</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderStockMovements() {
  if (!state.stockMovements.length) {
    elements.stockMovementsBody.innerHTML = `<tr><td colspan="8" class="empty-state">${t("noStockMovementsYet")}</td></tr>`;
    return;
  }

  elements.stockMovementsBody.innerHTML = [...state.stockMovements]
    .sort((a, b) => b.date.localeCompare(a.date) || String(b.id).localeCompare(String(a.id)))
    .map((movement) => {
      const product = state.products.find((item) => item.id === movement.productId);
      const isStockIn = movement.movementType === "stock-in";
      const movementLabel = isStockIn ? t("stockInPurchase") : t("stockOutSell");
      const profit = isStockIn || movement.profit === null || movement.profit === undefined
        ? "—"
        : formatCurrency(movement.profit);
      const profitClass = !isStockIn && Number(movement.profit) < 0 ? "amount-outflow" : "amount-inflow";

      return `
        <tr>
          <td>${formatDate(movement.date)}</td>
          <td>${product ? escapeHtml(product.name) : "-"}</td>
          <td><span class="movement-badge ${isStockIn ? "stock-in" : "stock-out"}">${movementLabel}</span></td>
          <td>${Number(movement.quantity)}</td>
          <td>${formatCurrency(movement.unitPrice)}</td>
          <td>${formatCurrency(movement.totalAmount)}</td>
          <td class="${isStockIn ? "" : profitClass}">${profit}</td>
          <td>${t("linkedTransactionLabel")} #${movement.linkedTransactionId}</td>
        </tr>
      `;
    })
    .join("");
}

function renderInventory() {
  const metrics = getInventoryMetrics();
  elements.inventoryTotalProducts.textContent = metrics.totalProducts;
  elements.inventoryStockValue.textContent = formatCurrency(metrics.totalStockValue);
  elements.inventoryLowStock.textContent = metrics.lowStockItems;
  elements.inventoryOutOfStock.textContent = metrics.outOfStockItems;
  populateStockProductSelect();
  renderInventoryProducts();
  renderStockMovements();
}

function renderSearchResults() {
  const query = elements.globalSearch.value.trim();
  const onTransactions = state.activeSection === "transactions";
  elements.clearSearchButton.classList.toggle("visible", Boolean(query));

  if (!query || onTransactions) {
    elements.searchResults.classList.remove("visible");
    elements.searchResults.innerHTML = "";
    return;
  }

  const results = getSearchResults().slice(0, 7);
  elements.searchResults.classList.add("visible");

  if (results.length === 0) {
    elements.searchResults.innerHTML = `<div class="search-empty">${t("noMatchingResults")}</div>`;
    return;
  }

  elements.searchResults.innerHTML = results.map((transaction) => `
    <button class="search-result-item" type="button" data-search-id="${transaction.id}">
      <span class="search-result-top">
        <strong>${escapeHtml(transaction.category)}</strong>
        <span class="type-badge ${transaction.type}">${transaction.type === "inflow" ? t("inflowLabel") : t("outflowLabel")}</span>
      </span>
      <span class="search-result-meta">
        <span>${formatDate(transaction.date)}</span>
        <strong class="${transaction.type === "inflow" ? "amount-inflow" : "amount-outflow"}">${transaction.type === "inflow" ? "+" : "-"}${formatCurrency(transaction.amount)}</strong>
      </span>
    </button>
  `).join("");
}

function openSearchResult(id) {
  state.highlightedTransactionId = id;
  elements.typeFilter.value = "all";
  elements.dateFilter.value = "";
  elements.monthFilter.value = "";
  elements.yearFilter.value = "";
  elements.categoryFilter.value = "";
  setActiveSection("transactions");
  renderTransactions();
  renderSearchResults();

  setTimeout(() => {
    state.highlightedTransactionId = null;
    renderTransactions();
  }, 3200);
}

function monthOptionKeys() {
  return [
    ["01", "january"],
    ["02", "february"],
    ["03", "march"],
    ["04", "april"],
    ["05", "may"],
    ["06", "june"],
    ["07", "july"],
    ["08", "august"],
    ["09", "september"],
    ["10", "october"],
    ["11", "november"],
    ["12", "december"]
  ];
}

function getAnalyticsYears() {
  const today = new Date();
  const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const years = new Set([String(today.getFullYear()), String(previousMonth.getFullYear())]);
  state.transactions.forEach((transaction) => years.add(transaction.date.slice(0, 4)));
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

function populateAnalyticsCompareControls() {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const startMonth = elements.comparisonStartMonth.value || String(startDate.getMonth() + 1).padStart(2, "0");
  const startYear = elements.comparisonStartYear.value || String(startDate.getFullYear());
  const endMonth = elements.comparisonEndMonth.value || String(today.getMonth() + 1).padStart(2, "0");
  const endYear = elements.comparisonEndYear.value || String(today.getFullYear());
  const monthOptions = monthOptionKeys().map(([value, key]) => `<option value="${value}">${t(key)}</option>`).join("");
  const years = getAnalyticsYears();
  const yearOptions = years.map((year) => `<option value="${year}">${year}</option>`).join("");

  elements.comparisonStartMonth.innerHTML = monthOptions;
  elements.comparisonEndMonth.innerHTML = monthOptions;
  elements.comparisonStartYear.innerHTML = yearOptions;
  elements.comparisonEndYear.innerHTML = yearOptions;
  elements.comparisonStartMonth.value = startMonth;
  elements.comparisonEndMonth.value = endMonth;
  elements.comparisonStartYear.value = years.includes(startYear) ? startYear : years[0];
  elements.comparisonEndYear.value = years.includes(endYear) ? endYear : years[0];
}

function getPeriodLabel(period) {
  const labels = {
    last7: t("last7Days"),
    last14: t("last14Days"),
    last30: t("last30Days"),
    currentMonth: t("currentMonthToDate"),
    previousMonth: t("previousMonth"),
    customRange: t("customRange"),
    monthlyComparison: t("monthlyComparison")
  };

  return labels[period] || labels.last14;
}

function getAnalyticsPeriodRange(period) {
  const today = new Date();
  const todayString = toDateString(today);

  if (period === "last7" || period === "last14" || period === "last30") {
    const days = period === "last7" ? 7 : period === "last14" ? 14 : 30;
    return {
      start: addDays(todayString, -(days - 1)),
      end: todayString,
      label: getPeriodLabel(period)
    };
  }

  if (period === "currentMonth") {
    const range = getMonthRange(today.getFullYear(), today.getMonth() + 1, true);
    return { ...range, label: getPeriodLabel(period) };
  }

  if (period === "previousMonth") {
    const previous = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const range = getMonthRange(previous.getFullYear(), previous.getMonth() + 1, false);
    return { ...range, label: getPeriodLabel(period) };
  }

  return null;
}

function calculateAnalyticsRange(startDateString, endDateString) {
  const dateLabels = getDateRangeLabels(startDateString, endDateString);
  const transactions = filterTransactionsByDateRange(startDateString, endDateString);
  const rows = getCalendarRowsForDates(dateLabels, transactions);
  const totals = getTotals(transactions);
  const net = roundMoney(totals.inflow - totals.outflow);

  return {
    start: startDateString,
    end: endDateString,
    dateLabels,
    rows,
    transactions,
    totals,
    net,
    averageNet: dateLabels.length ? roundMoney(net / dateLabels.length) : 0,
    categoryTotals: getTopExpenseCategoriesFrom(transactions, 6)
  };
}

function calculateMonthAnalytics(year, month) {
  const range = getMonthRange(year, month, false);
  const metrics = calculateAnalyticsRange(range.start, range.end);
  const label = new Intl.DateTimeFormat(currentLanguage() === "ar" ? "ar-EG-u-nu-latn" : "en-US", { month: "long", year: "numeric" })
    .format(parseDateString(range.start));

  return {
    ...metrics,
    year: String(year),
    month: String(month).padStart(2, "0"),
    label
  };
}

function getMonthsBetween(startYear, startMonth, endYear, endMonth) {
  const months = [];
  const current = new Date(Number(startYear), Number(startMonth) - 1, 1);
  const end = new Date(Number(endYear), Number(endMonth) - 1, 1);

  while (current <= end) {
    months.push({
      year: current.getFullYear(),
      month: String(current.getMonth() + 1).padStart(2, "0")
    });
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

function calculateMonthlyComparison(startYear, startMonth, endYear, endMonth) {
  const months = getMonthsBetween(startYear, startMonth, endYear, endMonth);
  const monthlyRows = months.map(({ year, month }) => calculateMonthAnalytics(year, month));
  const totals = getTotals(monthlyRows.flatMap((row) => row.transactions));
  const net = roundMoney(totals.inflow - totals.outflow);
  const dayCount = monthlyRows.reduce((total, row) => total + row.dateLabels.length, 0);

  return {
    monthlyRows,
    totals,
    net,
    transactions: monthlyRows.flatMap((row) => row.transactions),
    averageNet: dayCount ? roundMoney(net / dayCount) : 0
  };
}

function renderMonthlySummaryRows(monthlyRows) {
  if (!monthlyRows.length) {
    return `<tr><td colspan="6" class="empty-state">${t("noAnalyticsTransactions")}</td></tr>`;
  }

  return monthlyRows.map((row) => `
    <tr>
      <td>${row.label}</td>
      <td>${formatCurrency(row.totals.inflow)}</td>
      <td>${formatCurrency(row.totals.outflow)}</td>
      <td>${formatCurrency(row.net)}</td>
      <td>${row.transactions.length}</td>
      <td>${formatCurrency(row.averageNet)}</td>
    </tr>
  `).join("");
}

function renderMonthlyInsights(monthlyRows) {
  if (!monthlyRows.length) {
    return `<div class="empty-state">${t("noAnalyticsTransactions")}</div>`;
  }

  const best = [...monthlyRows].sort((a, b) => b.net - a.net)[0];
  const weakest = [...monthlyRows].sort((a, b) => a.net - b.net)[0];
  const highestOutflow = [...monthlyRows].sort((a, b) => b.totals.outflow - a.totals.outflow)[0];
  const highestInflow = [...monthlyRows].sort((a, b) => b.totals.inflow - a.totals.inflow)[0];
  const insights = [
    [t("bestMonth"), `${best.label} ${t("withNetCashFlow")} ${formatCurrency(best.net)}`],
    [t("weakestMonth"), `${weakest.label} ${t("withNetCashFlow")} ${formatCurrency(weakest.net)}`],
    [t("highestOutflowMonth"), `${highestOutflow.label} ${t("withOutflows")} ${formatCurrency(highestOutflow.totals.outflow)}`],
    [t("highestInflowMonth"), `${highestInflow.label} ${t("withInflows")} ${formatCurrency(highestInflow.totals.inflow)}`]
  ];

  return insights.map(([label, value]) => `<div class="insight-row"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function renderAnalytics() {
  const selectedPeriod = elements.analyticsPeriodSelector.value || "last14";
  state.analytics.period = selectedPeriod;
  populateAnalyticsCompareControls();
  elements.analyticsCustomControls.hidden = selectedPeriod !== "customRange";
  elements.analyticsCompareControls.hidden = selectedPeriod !== "monthlyComparison";
  elements.analyticsValidation.hidden = true;
  elements.analyticsValidation.textContent = "";
  elements.analyticsComparisonGrid.hidden = true;
  elements.analyticsComparisonGrid.innerHTML = "";
  elements.monthlyComparisonIntro.hidden = selectedPeriod !== "monthlyComparison";
  elements.monthlySummaryPanel.hidden = selectedPeriod !== "monthlyComparison";
  elements.monthlyInsightsPanel.hidden = selectedPeriod !== "monthlyComparison";
  elements.monthlySummaryBody.innerHTML = "";
  elements.monthlyComparisonInsights.innerHTML = "";
  state.analytics.compare = null;

  let analyticsData = null;
  let periodLabel = getPeriodLabel(selectedPeriod);

  if (selectedPeriod === "customRange") {
    const fromDate = elements.analyticsFromDate.value;
    const toDate = elements.analyticsToDate.value;

    if (!fromDate || !toDate) {
      elements.analyticsValidation.textContent = t("selectDateRange");
      elements.analyticsValidation.hidden = false;
      analyticsData = {
        rows: [],
        transactions: [],
        totals: { inflow: 0, outflow: 0 },
        net: 0,
        averageNet: 0,
        categoryTotals: []
      };
    } else if (fromDate > toDate) {
      elements.analyticsValidation.textContent = t("invalidDateRange");
      elements.analyticsValidation.hidden = false;
      analyticsData = {
        rows: [],
        transactions: [],
        totals: { inflow: 0, outflow: 0 },
        net: 0,
        averageNet: 0,
        categoryTotals: []
      };
    } else {
      analyticsData = calculateAnalyticsRange(fromDate, toDate);
      periodLabel = `${formatDate(fromDate)} - ${formatDate(toDate)}`;
    }
  } else if (selectedPeriod === "monthlyComparison") {
    const startYear = elements.comparisonStartYear.value;
    const startMonth = elements.comparisonStartMonth.value;
    const endYear = elements.comparisonEndYear.value;
    const endMonth = elements.comparisonEndMonth.value;
    const startKey = `${startYear}-${startMonth}`;
    const endKey = `${endYear}-${endMonth}`;

    if (startKey > endKey) {
      elements.analyticsValidation.textContent = t("invalidMonthRange");
      elements.analyticsValidation.hidden = false;
      analyticsData = {
        rows: [],
        transactions: [],
        totals: { inflow: 0, outflow: 0 },
        net: 0,
        averageNet: 0,
        categoryTotals: []
      };
      state.analytics.compare = { monthlyRows: [] };
    } else {
      const comparison = calculateMonthlyComparison(startYear, startMonth, endYear, endMonth);
      const startLabel = comparison.monthlyRows[0]?.label || "";
      const endLabel = comparison.monthlyRows[comparison.monthlyRows.length - 1]?.label || "";

      periodLabel = startLabel === endLabel ? startLabel : `${startLabel} ${t("to")} ${endLabel}`;
      state.analytics.compare = comparison;
      analyticsData = {
        rows: comparison.monthlyRows.map((row) => ({
          date: row.start,
          inflow: row.totals.inflow,
          outflow: row.totals.outflow,
          net: row.net
        })),
        transactions: comparison.transactions,
        totals: comparison.totals,
        net: comparison.net,
        averageNet: comparison.averageNet,
        categoryTotals: getTopExpenseCategoriesFrom(comparison.transactions, 6)
      };
      elements.monthlySummaryBody.innerHTML = renderMonthlySummaryRows(comparison.monthlyRows);
      elements.monthlyComparisonInsights.innerHTML = comparison.transactions.length === 0
        ? `<div class="empty-state">${t("noAnalyticsTransactions")}</div>`
        : comparison.monthlyRows.length > 1
          ? renderMonthlyInsights(comparison.monthlyRows)
          : `<div class="empty-state">${t("selectWiderMonthRange")}</div>`;
    }
  } else {
    const range = getAnalyticsPeriodRange(selectedPeriod);
    analyticsData = calculateAnalyticsRange(range.start, range.end);
    periodLabel = range.label;
  }

  const totals = analyticsData.totals;
  const categoryTotals = analyticsData.categoryTotals;
  const maxCategory = categoryTotals[0]?.amount || 1;
  state.analytics.rows = analyticsData.rows;

  elements.totalInflows.textContent = formatCurrency(totals.inflow);
  elements.totalOutflows.textContent = formatCurrency(totals.outflow);
  elements.analyticsNetCashFlow.textContent = formatCurrency(analyticsData.net);
  elements.averageNet.textContent = formatCurrency(analyticsData.averageNet);
  elements.averageNetCaption.textContent = `${t("averageNetCaption")}: ${periodLabel}`;
  elements.numberOfTransactions.textContent = String(analyticsData.transactions.length);
  elements.analyticsPeriodLabel.textContent = `${t("showingAnalyticsFor")} ${periodLabel}`;

  elements.categoryAnalysis.innerHTML = categoryTotals.length
    ? categoryTotals.slice(0, 6).map((item) => `
      <div class="category-row">
        <div>
          <strong>${escapeHtml(item.category)}</strong>
          <small>${formatCurrency(item.amount)}</small>
        </div>
        <div class="category-meter"><span style="width: ${(item.amount / maxCategory) * 100}%"></span></div>
      </div>
    `).join("")
    : `<div class="empty-state">${analyticsData.transactions.length ? t("noExpenseCategories") : t("noAnalyticsTransactions")}</div>`;
}

function renderForecasting() {
  const forecast = getForecast();
  const positive = forecast.after30 >= 0;

  elements.forecast7.textContent = formatCurrency(forecast.after7);
  elements.forecast14.textContent = formatCurrency(forecast.after14);
  elements.forecast30.textContent = formatCurrency(forecast.after30);
  elements.forecastInsight.textContent = positive
    ? t("forecastMovementPositive")
    : t("forecastMovementNegative");
  renderStatusClass(elements.forecastInsight, positive ? "surplus" : "deficit");
}

function getMonthTransactions(referenceDate = new Date(), selectedYear = null, selectedMonth = null) {
  const year = selectedYear ? Number(selectedYear) : referenceDate.getFullYear();
  const month = selectedMonth ? Number(selectedMonth) : referenceDate.getMonth() + 1;

  return state.transactions.filter((transaction) => {
    const [transactionYear, transactionMonth] = transaction.date.split("-").map(Number);
    return transactionYear === year && transactionMonth === month;
  });
}

function getMonthDateLabels(referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const today = new Date();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const lastDay = isCurrentMonth ? today.getDate() : new Date(year, month + 1, 0).getDate();
  const labels = [];

  for (let day = 1; day <= lastDay; day += 1) {
    labels.push(toDateString(new Date(year, month, day)));
  }

  return labels;
}

function getCalendarRowsForDates(dateLabels, transactions = state.transactions) {
  return dateLabels.map((date) => {
    const totals = getTotals(transactions.filter((transaction) => transaction.date === date));

    return {
      date,
      inflow: roundMoney(totals.inflow),
      outflow: roundMoney(totals.outflow),
      net: roundMoney(totals.inflow - totals.outflow)
    };
  });
}

function getTransactionDailyRows(transactions) {
  const rows = new Map();

  transactions.forEach((transaction) => {
    const row = rows.get(transaction.date) || { date: transaction.date, inflow: 0, outflow: 0, net: 0 };
    const amount = Number(transaction.amount);

    if (transaction.type === "inflow") {
      row.inflow += amount;
    } else {
      row.outflow += amount;
    }

    row.net = roundMoney(row.inflow - row.outflow);
    rows.set(transaction.date, row);
  });

  return Array.from(rows.values()).sort((a, b) => a.date.localeCompare(b.date));
}

function getTopExpenseFrom(transactions) {
  return getTopExpenseCategoriesFrom(transactions)[0];
}

function getTopExpenseCategoriesFrom(transactions, limit = 3) {
  const totals = new Map();

  transactions
    .filter((transaction) => transaction.type === "outflow")
    .forEach((transaction) => {
      totals.set(transaction.category, (totals.get(transaction.category) || 0) + Number(transaction.amount));
    });

  return Array.from(totals.entries())
    .map(([category, amount]) => ({ category, amount: roundMoney(amount) }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

function getReportInsight(statusKey, month, net, transactionCount) {
  if (!transactionCount) {
    return t("reportNoTransactionsInsight").replace("{month}", month);
  }

  if (statusKey === "surplus") {
    return t("reportSurplusInsight")
      .replace("{month}", month)
      .replace("{net}", formatCurrency(net));
  }

  if (statusKey === "deficit") {
    return t("reportDeficitInsight")
      .replace("{month}", month)
      .replace("{net}", formatCurrency(net));
  }

  return t("reportBalancedInsight").replace("{month}", month);
}

function getReportData() {
  const selectedYear = state.report.year;
  const selectedMonth = state.report.month;
  const range = getMonthRange(selectedYear, selectedMonth, false);
  const month = new Intl.DateTimeFormat(currentLanguage() === "ar" ? "ar-EG-u-nu-latn" : "en-US", { month: "long", year: "numeric" }).format(parseDateString(range.start));
  const transactions = getMonthTransactions(new Date(), selectedYear, selectedMonth);
  const totals = getTotals(transactions);
  const net = roundMoney(totals.inflow - totals.outflow);
  const status = getStatus(net);
  const dailyRows = getCalendarRowsForDates(getDateRangeLabels(range.start, range.end), transactions);
  const activeDailyRows = dailyRows.filter((row) => row.inflow > 0 || row.outflow > 0);
  const best = activeDailyRows.length ? [...activeDailyRows].sort((a, b) => b.net - a.net)[0] : null;
  const worst = activeDailyRows.length ? [...activeDailyRows].sort((a, b) => a.net - b.net)[0] : null;
  const topExpenseCategories = getTopExpenseCategoriesFrom(transactions);
  const topExpense = topExpenseCategories[0];
  const averageNet = dailyRows.length ? roundMoney(net / dailyRows.length) : null;
  const dashboardMetrics = getDashboardInsightMetrics();
  const monthlyAverageDailyOutflows = dailyRows.length
    ? roundMoney(dailyRows.reduce((total, row) => total + row.outflow, 0) / dailyRows.length)
    : 0;
  const monthlyRunwayDays = monthlyAverageDailyOutflows > 0
    ? Math.max(0, Math.round(dashboardMetrics.availableCash / monthlyAverageDailyOutflows))
    : Infinity;
  const cashRunway = Number.isFinite(monthlyRunwayDays) ? `${monthlyRunwayDays} ${t("daysUnit")}` : t("noOutflows");

  return {
    month,
    generatedDate: formatDate(toDateString(new Date())),
    selectedYear,
    selectedMonth,
    start: range.start,
    end: range.end,
    transactions: [...transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id),
    totals,
    net,
    status,
    best,
    worst,
    topExpense,
    topExpenseCategories,
    averageNet,
    monthlyAverageDailyOutflows,
    monthlyRunwayDays,
    cashRunway,
    insight: getReportInsight(status.key, month, net, transactions.length)
  };
}

function formatReportDay(row) {
  return row ? `${formatDate(row.date)} - ${formatCurrency(row.net)}` : "--";
}

function renderReportDetail(detail, value) {
  return `
    <span class="report-detail-main">${escapeHtml(detail || "--")}</span>
    <small class="report-detail-sub">${escapeHtml(value || "--")}</small>
  `;
}

function formatTransactionAmount(transaction) {
  const signedAmount = transaction.type === "inflow" ? Number(transaction.amount) : -Number(transaction.amount);
  return formatCurrency(signedAmount);
}

function renderReportTransactions(transactions) {
  if (!transactions.length) {
    return `<tr><td colspan="4" class="empty-state">${t("noMonthlyTransactions")}</td></tr>`;
  }

  return transactions
    .slice(0, 6)
    .map((transaction) => {
      const amountClass = transaction.type === "inflow" ? "amount-inflow" : "amount-outflow";

      return `
        <tr>
          <td>${formatDate(transaction.date)}</td>
          <td><span class="type-badge ${transaction.type}">${transaction.type === "inflow" ? t("inflowLabel") : t("outflowLabel")}</span></td>
          <td>${escapeHtml(transaction.category)}</td>
          <td class="${amountClass}">${formatTransactionAmount(transaction)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderReportAnalysisBars(report) {
  const chartItems = [
    { label: t("totalInflows"), value: report.totals.inflow, className: "inflow" },
    { label: t("totalOutflows"), value: report.totals.outflow, className: "outflow" },
    { label: t("netCashFlow"), value: report.net, className: "net" }
  ];
  const maxValue = Math.max(...chartItems.map((item) => Math.abs(item.value)), 1);
  const topExpenses = report.topExpenseCategories.length
    ? report.topExpenseCategories.slice(0, 3).map((item, index) => `
      <li>
        <span>${index + 1}. ${escapeHtml(item.category)}</span>
        <strong>${formatCurrency(item.amount)}</strong>
      </li>
    `).join("")
    : `<li class="empty-state">${t("noExpenseCategoriesThisPeriod")}</li>`;

  return `
    <div class="analysis-block">
      <div class="analysis-block-heading">
        <span>${t("cashFlowMix")}</span>
        <small>${report.month}</small>
      </div>
      ${chartItems.map((item) => `
        <div class="analysis-bar-row">
          <div class="analysis-bar-label">
            <span>${item.label}</span>
            <strong class="report-analysis-value">${formatCurrency(item.value)}</strong>
          </div>
          <div class="analysis-bar-track">
            <span class="analysis-bar-fill ${item.className}" style="width: ${Math.max(5, (Math.abs(item.value) / maxValue) * 100)}%"></span>
          </div>
        </div>
      `).join("")}
      <p class="analysis-note">${report.transactions.length ? report.insight : t("noReportActivity")}</p>
    </div>
    <div class="analysis-block expense-breakdown">
      <div class="analysis-block-heading">
        <span>${t("topExpenseCategory")}</span>
        <small>${t("performanceDetails")}</small>
      </div>
      <ol>${topExpenses}</ol>
    </div>
  `;
}

function getScreenRecommendedActions(report) {
  const category = report.topExpense?.category || t("topExpenseCategory");

  if (!report.transactions.length) {
    return [t("recommendationEmptyOne"), t("recommendationEmptyTwo"), t("recommendationEmptyThree")];
  }

  if (report.net > 0) {
    return [
      t("recommendationSurplusOne").replace("{category}", category),
      t("recommendationSurplusTwo"),
      t("recommendationSurplusThree")
    ];
  }

  if (report.net < 0) {
    return [
      t("recommendationDeficitOne").replace("{category}", category),
      t("recommendationDeficitTwo"),
      t("recommendationDeficitThree")
    ];
  }

  return [t("recommendationBalancedOne"), t("recommendationBalancedTwo"), t("recommendationBalancedThree")];
}

function renderReportRecommendations(report) {
  return `
    <div class="analysis-block recommendation-block">
      <div class="analysis-block-heading">
        <span>${t("recommendedActions")}</span>
        <small>${t("showingReportFor")} ${report.month}</small>
      </div>
      <ol>
        ${getScreenRecommendedActions(report).map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
      </ol>
    </div>
  `;
}

function renderReports() {
  populateReportControls();
  const report = getReportData();

  elements.monthlySummary.textContent = report.month;
  elements.selectedReportPeriod.textContent = `${t("showingReportFor")} ${report.month}`;
  elements.reportMonthInsight.textContent = report.insight;
  elements.reportInflows.textContent = formatCurrency(report.totals.inflow);
  elements.reportOutflows.textContent = formatCurrency(report.totals.outflow);
  elements.reportNet.textContent = formatCurrency(report.net);
  elements.reportBusinessStatus.textContent = report.status.label;
  elements.bestDay.innerHTML = report.best
    ? renderReportDetail(formatDate(report.best.date), formatCurrency(report.best.net))
    : renderReportDetail("--", "--");
  elements.worstDay.innerHTML = report.worst
    ? renderReportDetail(formatDate(report.worst.date), formatCurrency(report.worst.net))
    : renderReportDetail("--", "--");
  elements.reportTopExpense.innerHTML = report.topExpense
    ? renderReportDetail(report.topExpense.category, formatCurrency(report.topExpense.amount))
    : renderReportDetail("--", "--");
  elements.reportTransactionCount.textContent = String(report.transactions.length);
  elements.reportAverageNet.textContent = report.averageNet === null ? "--" : formatCurrency(report.averageNet);
  elements.reportAnalysisBars.innerHTML = renderReportAnalysisBars(report);
  elements.reportRecommendations.innerHTML = renderReportRecommendations(report);
  elements.reportTransactionsBody.innerHTML = renderReportTransactions(report.transactions);
}

function chartThemeColor() {
  return getComputedStyle(document.body).getPropertyValue("--muted").trim() || "#8fa3bb";
}

function createOrReplaceChart(key, canvasId, config) {
  if (!window.Chart) {
    return;
  }

  if (state.charts[key]) {
    state.charts[key].destroy();
  }

  state.charts[key] = new Chart(document.getElementById(canvasId), config);
}

function baseChartOptions() {
  const muted = chartThemeColor();

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: muted,
          boxWidth: 12,
          font: { weight: "bold" }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: muted, maxRotation: 0 },
        grid: { display: false }
      },
      y: {
        ticks: {
          color: muted,
          callback: (value) => formatCurrency(value)
        },
        grid: { color: "rgba(148, 163, 184, 0.12)" }
      }
    }
  };
}

function renderCharts() {
  if (!window.Chart) {
    return;
  }

  const rows = state.analytics.rows;
  const labels = rows.map((row) => formatShortDate(row.date));
  const options = baseChartOptions();
  const compare = state.analytics.compare;

  if (compare?.monthlyRows?.length > 4) {
    options.scales.x.ticks.maxRotation = 35;
    options.scales.x.ticks.minRotation = 25;
  }

  createOrReplaceChart("dailyBar", "dailyBarChart", {
    type: "bar",
    data: {
      labels: compare ? compare.monthlyRows.map((row) => row.label) : labels,
      datasets: compare
        ? [
          {
            label: t("inflows"),
            data: compare.monthlyRows.map((row) => row.totals.inflow),
            backgroundColor: "rgba(52, 211, 153, 0.78)",
            borderRadius: 12
          },
          {
            label: t("outflows"),
            data: compare.monthlyRows.map((row) => row.totals.outflow),
            backgroundColor: "rgba(251, 113, 133, 0.78)",
            borderRadius: 12
          },
          {
            label: t("netCashFlow"),
            data: compare.monthlyRows.map((row) => row.net),
            backgroundColor: "rgba(34, 211, 238, 0.78)",
            borderRadius: 12
          }
        ]
        : [
          {
            label: t("inflows"),
            data: rows.map((row) => row.inflow),
            backgroundColor: "rgba(52, 211, 153, 0.78)",
            borderRadius: 12
          },
          {
            label: t("outflows"),
            data: rows.map((row) => row.outflow),
            backgroundColor: "rgba(251, 113, 133, 0.78)",
            borderRadius: 12
          }
        ]
    },
    options
  });

  createOrReplaceChart("netLine", "netLineChart", {
    type: "line",
    data: {
      labels: compare ? compare.monthlyRows.map((row) => row.label) : labels,
      datasets: compare
        ? [
          {
            label: t("netCashFlow"),
            data: compare.monthlyRows.map((row) => row.net),
            borderColor: "#22d3ee",
            backgroundColor: "rgba(34, 211, 238, 0.14)",
            fill: true,
            tension: 0.32,
            pointRadius: 4,
            pointBackgroundColor: "#34d399"
          }
        ]
        : [
          {
            label: t("netCashFlow"),
            data: rows.map((row) => row.net),
            borderColor: "#22d3ee",
            backgroundColor: "rgba(34, 211, 238, 0.14)",
            fill: true,
            tension: 0.38,
            pointRadius: 4,
            pointBackgroundColor: "#34d399"
          }
        ]
    },
    options
  });

  const forecast = getForecast();
  createOrReplaceChart("forecast", "forecastChart", {
    type: "line",
    data: {
      labels: [...forecast.rows.map((row) => row.label), t("after7Short"), t("after14Short"), t("after30Short")],
      datasets: [
        {
          label: t("cashFlowProjection"),
          data: [...forecast.rows.map((row) => row.value), forecast.after7, forecast.after14, forecast.after30],
          borderColor: "#34d399",
          backgroundColor: "rgba(52, 211, 153, 0.12)",
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: "#22d3ee"
        }
      ]
    },
    options
  });
}

function renderSettings() {
  document.body.classList.toggle("light-theme", state.settings.lightTheme);
  elements.businessNameInput.value = state.settings.businessName;
  elements.ownerNameInput.value = state.settings.ownerName;
  if (document.activeElement !== elements.openingBalanceInput) {
    elements.openingBalanceInput.value = getOpeningBalance();
  }
  elements.currencySelector.value = state.settings.currency;
  elements.businessTypeSelector.value = state.settings.businessType;
  elements.languageSelector.value = currentLanguage();
  elements.themeToggle.checked = state.settings.lightTheme;
  applyLanguage();
  elements.sidebarBusinessName.textContent = "Financial Dashboard";
  elements.profileChip.textContent = `${state.settings.ownerName || t("ownerFallback")} آ· ${state.settings.email || t("demoFallback")}`;
}

function refreshApp() {
  renderSettings();
  renderDashboard();
  renderTransactions();
  renderInventory();
  renderSearchResults();
  renderAnalytics();
  renderForecasting();
  renderReports();
  renderCharts();
}

function setActiveSection(sectionName) {
  state.activeSection = sectionName;
  elements.navItems.forEach((item) => item.classList.toggle("active", item.dataset.section === sectionName));
  elements.sections.forEach((section) => section.classList.toggle("active", section.id === `${sectionName}-section`));
  const pageTitles = {
    dashboard: "dashboardTitle",
    transactions: "transactions",
    inventory: "inventory",
    analytics: "analytics",
    forecasting: "forecasting",
    reports: "reports",
    settings: "settings"
  };
  elements.pageTitle.textContent = t(pageTitles[sectionName] || "dashboardTitle");
  renderSearchResults();
  requestAnimationFrame(renderCharts);
}

function addTransaction(event) {
  event.preventDefault();

  const checkedType = document.querySelector('input[name="transactionType"]:checked');
  const amount = Number(elements.amount.value);
  const category = elements.category.value.trim();

  if (!amount || amount <= 0) {
    elements.amount.focus();
    return;
  }

  if (!category) {
    elements.category.focus();
    return;
  }

  state.transactions.push({
    id: Date.now(),
    type: checkedType.value,
    amount: roundMoney(amount),
    category,
    date: elements.date.value,
    notes: elements.notes.value.trim()
  });

  saveTransactions();
  elements.transactionForm.reset();
  document.querySelector('input[name="transactionType"][value="inflow"]').checked = true;
  elements.date.value = getTodayDateString();
  refreshApp();
  setActiveSection("dashboard");
}

function deleteTransaction(id) {
  state.transactions = state.transactions.filter((transaction) => transaction.id !== id);
  saveTransactions();
  refreshApp();
}

function restoreDemoData() {
  const confirmed = window.confirm(t("restoreConfirm"));

  if (!confirmed) {
    return;
  }

  const demoData = createDemoDataset();
  state.transactions = demoData.transactions;
  state.products = demoData.products;
  state.stockMovements = demoData.stockMovements;
  saveTransactions();
  saveProducts();
  saveStockMovements();
  refreshApp();
  showReportToast(t("restoredToast"));
}

function clearDemoData() {
  const confirmed = window.confirm(t("clearConfirm"));

  if (!confirmed) {
    return;
  }

  state.transactions = [];
  state.products = [];
  state.stockMovements = [];
  saveTransactions();
  saveProducts();
  saveStockMovements();
  refreshApp();
  showReportToast(t("clearedToast"));
}

function clearSearch() {
  elements.globalSearch.value = "";
  state.highlightedTransactionId = null;
  renderTransactions();
  renderSearchResults();
}

function clearTransactionFilters() {
  elements.typeFilter.value = "all";
  elements.dateFilter.value = "";
  elements.monthFilter.value = "";
  elements.yearFilter.value = "";
  elements.categoryFilter.value = "";
  elements.globalSearch.value = "";
  state.highlightedTransactionId = null;
  renderTransactions();
  renderSearchResults();
}

function updateSelectedReportPeriod() {
  state.report.month = elements.reportMonthSelector.value;
  state.report.year = elements.reportYearSelector.value;
  renderReports();
}

function readOptionalNumber(input) {
  const value = input.value.trim();
  return value === "" ? null : Number(value);
}

function getOpeningBalanceInputData(input) {
  const value = readOptionalNumber(input);

  if (value === null) {
    return {
      isValid: true,
      value: 0,
      hasValue: false
    };
  }

  if (!Number.isFinite(value) || value < 0) {
    return {
      isValid: false,
      value: 0,
      hasValue: true
    };
  }

  return {
    isValid: true,
    value: roundMoney(value),
    hasValue: true
  };
}

function getOpeningBalance() {
  const value = Number(state.settings.openingBalance);
  return Number.isFinite(value) && value >= 0 ? roundMoney(value) : 0;
}

function addProduct(event) {
  event.preventDefault();

  const name = elements.inventoryProductName.value.trim();
  const category = elements.inventoryProductCategory.value.trim();
  const purchaseUnitPrice = Number(elements.inventoryPurchaseUnitPrice.value);
  const sellingUnitPrice = Number(elements.inventorySellingUnitPrice.value);
  const openingQuantity = Number(elements.inventoryOpeningQuantity.value);
  const minimumStock = Number(elements.inventoryMinimumStock.value);

  if (!name) {
    elements.inventoryProductName.setCustomValidity(t("inventoryProductRequired"));
    elements.inventoryProductName.reportValidity();
    elements.inventoryProductName.setCustomValidity("");
    return;
  }

  if (!Number.isFinite(purchaseUnitPrice) || !Number.isFinite(sellingUnitPrice) || purchaseUnitPrice < 0 || sellingUnitPrice < 0) {
    elements.inventoryPurchaseUnitPrice.setCustomValidity(t("inventoryInvalidPrice"));
    elements.inventoryPurchaseUnitPrice.reportValidity();
    elements.inventoryPurchaseUnitPrice.setCustomValidity("");
    return;
  }

  if (!Number.isFinite(openingQuantity) || !Number.isFinite(minimumStock) || openingQuantity < 0 || minimumStock < 0) {
    elements.inventoryOpeningQuantity.setCustomValidity(t("inventoryInvalidQuantity"));
    elements.inventoryOpeningQuantity.reportValidity();
    elements.inventoryOpeningQuantity.setCustomValidity("");
    return;
  }

  state.products.push({
    id: `product-${Date.now()}`,
    name,
    category,
    purchaseUnitPrice: roundMoney(purchaseUnitPrice),
    sellingUnitPrice: roundMoney(sellingUnitPrice),
    currentStock: Math.floor(openingQuantity),
    minimumStock: Math.floor(minimumStock),
    createdAt: getTodayDateString(),
    notes: elements.inventoryProductNotes.value.trim()
  });

  saveProducts();
  elements.productForm.reset();
  refreshApp();
}

function createInventoryTransaction({ type, amount, category, date, notes }) {
  const transaction = {
    id: Date.now(),
    type,
    amount: roundMoney(amount),
    category,
    date,
    notes: notes || ""
  };

  state.transactions.push(transaction);
  return transaction;
}

function addStockMovement(event) {
  event.preventDefault();

  const product = state.products.find((item) => item.id === elements.stockMovementProduct.value);
  const movementType = elements.stockMovementType.value;
  const quantity = Number(elements.stockMovementQuantity.value);
  const date = elements.stockMovementDate.value || getTodayDateString();
  const notes = elements.stockMovementNotes.value.trim();

  if (!product) {
    elements.stockMovementProduct.setCustomValidity(t("movementProductRequired"));
    elements.stockMovementProduct.reportValidity();
    elements.stockMovementProduct.setCustomValidity("");
    return;
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    elements.stockMovementQuantity.setCustomValidity(t("movementInvalidQuantity"));
    elements.stockMovementQuantity.reportValidity();
    elements.stockMovementQuantity.setCustomValidity("");
    return;
  }

  const normalizedQuantity = Math.floor(quantity);
  const isStockIn = movementType === "stock-in";

  if (normalizedQuantity <= 0) {
    elements.stockMovementQuantity.setCustomValidity(t("movementInvalidQuantity"));
    elements.stockMovementQuantity.reportValidity();
    elements.stockMovementQuantity.setCustomValidity("");
    return;
  }

  if (!isStockIn && normalizedQuantity > Number(product.currentStock)) {
    elements.stockMovementQuantity.setCustomValidity(t("movementInsufficientStock"));
    elements.stockMovementQuantity.reportValidity();
    elements.stockMovementQuantity.setCustomValidity("");
    return;
  }

  const unitPrice = isStockIn ? Number(product.purchaseUnitPrice) : Number(product.sellingUnitPrice);
  const totalAmount = roundMoney(normalizedQuantity * unitPrice);
  const profit = isStockIn ? null : roundMoney((Number(product.sellingUnitPrice) - Number(product.purchaseUnitPrice)) * normalizedQuantity);
  const transaction = createInventoryTransaction({
    type: isStockIn ? "outflow" : "inflow",
    amount: totalAmount,
    category: isStockIn ? t("inventoryPurchaseCategory") : t("productSalesCategory"),
    date,
    notes: isStockIn
      ? `Stock In: Purchased ${normalizedQuantity} x ${product.name}${notes ? `. ${notes}` : ""}`
      : `Stock Out: Sold ${normalizedQuantity} x ${product.name}. Profit: ${formatCurrency(profit)}${notes ? `. ${notes}` : ""}`
  });

  product.currentStock = isStockIn
    ? Number(product.currentStock) + normalizedQuantity
    : Number(product.currentStock) - normalizedQuantity;

  state.stockMovements.push({
    id: `movement-${Date.now()}`,
    productId: product.id,
    movementType,
    quantity: normalizedQuantity,
    unitPrice: roundMoney(unitPrice),
    totalAmount,
    profit,
    date,
    linkedTransactionId: transaction.id,
    notes
  });

  saveTransactions();
  saveProducts();
  saveStockMovements();
  elements.stockMovementForm.reset();
  elements.stockMovementDate.value = getTodayDateString();
  refreshApp();
}

function deleteProduct(productId) {
  const confirmed = window.confirm(t("deleteProductConfirm"));

  if (!confirmed) {
    return;
  }

  state.products = state.products.filter((product) => product.id !== productId);
  state.stockMovements = state.stockMovements.filter((movement) => movement.productId !== productId);
  saveProducts();
  saveStockMovements();
  refreshApp();
}

function updateUserFromSettings() {
  const openingBalanceData = getOpeningBalanceInputData(elements.openingBalanceInput);

  if (!openingBalanceData.isValid) {
    elements.openingBalanceInput.setCustomValidity(t("invalidOpeningBalance"));
    elements.openingBalanceInput.reportValidity();
    elements.openingBalanceInput.setCustomValidity("");
    return;
  }

  state.settings.businessName = elements.businessNameInput.value.trim() || "Small Business Suite";
  state.settings.ownerName = elements.ownerNameInput.value.trim() || "Demo Owner";
  state.settings.currency = elements.currencySelector.value;
  state.settings.businessType = elements.businessTypeSelector.value;
  state.settings.openingBalance = openingBalanceData.value;
  state.settings.openingBalanceCustom = openingBalanceData.hasValue;
  state.settings.language = elements.languageSelector.value;
  state.settings.lightTheme = elements.themeToggle.checked;

  if (state.user) {
    state.user.businessName = state.settings.businessName;
    state.user.ownerName = state.settings.ownerName;
    state.user.currency = state.settings.currency;
    state.user.businessType = state.settings.businessType;
    state.user.openingBalance = state.settings.openingBalance;
    state.user.openingBalanceCustom = state.settings.openingBalanceCustom;
  }

  saveSettings();
  saveUser();
  refreshApp();
}

function showReportToast(message, isError = false) {
  if (!elements.reportToast) {
    return;
  }

  window.clearTimeout(reportToastTimer);
  elements.reportToast.textContent = message;
  elements.reportToast.classList.toggle("error", isError);
  elements.reportToast.hidden = false;

  reportToastTimer = window.setTimeout(() => {
    elements.reportToast.hidden = true;
  }, 3200);
}

function reportPerformanceInsight(report) {
  if (report.status.key === "surplus") {
    return "Inflows are higher than outflows for the report period, indicating healthy cash movement and a positive short-term position.";
  }

  if (report.status.key === "deficit") {
    return "Outflows are higher than inflows for the report period, so spending, supplier timing, and near-term obligations need attention.";
  }

  return "Inflows and outflows are nearly equal for the report period, keeping the cash position balanced but still worth monitoring.";
}

function cashFlowAnalysisText(report) {
  if (report.net > 0) {
    return "The business generated a positive net cash flow this period, meaning inflows exceeded outflows.";
  }

  if (report.net < 0) {
    return "The business recorded negative net cash flow this period, meaning outflows exceeded inflows and cost control may be needed.";
  }

  return "Cash movement is balanced, with inflows and outflows nearly equal.";
}

function getRecommendedActions(report) {
  const topExpense = report.topExpense?.category || "the highest expense category";

  if (report.net > 0) {
    return [
      `Keep monitoring ${topExpense} because it has the highest impact on cash movement.`,
      "Cash flow is positive, so short-term spending can be planned more safely.",
      "Review outflows weekly to protect the current surplus."
    ];
  }

  if (report.net < 0) {
    return [
      `Reduce or review ${topExpense}.`,
      "Delay non-essential spending until cash flow improves.",
      "Increase inflow sources or follow up on pending payments."
    ];
  }

  return [
    "Monitor daily inflows and outflows closely.",
    "Avoid unnecessary spending to prevent moving into deficit.",
    "Build a small reserve from future positive cash flow."
  ];
}

function addPdfFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(229, 236, 244);
    doc.line(42, pageHeight - 42, pageWidth - 42, pageHeight - 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(91, 112, 131);
    doc.text("Generated by Smart Cash Flow", 42, pageHeight - 24);
    doc.text(`Page ${page} of ${pageCount}`, pageWidth - 42, pageHeight - 24, { align: "right" });
  }
}

function ensurePdfSpace(doc, y, neededHeight) {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (y + neededHeight <= pageHeight - 70) {
    return y;
  }

  doc.addPage();
  return 54;
}

function addPdfSectionTitle(doc, title, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(8, 22, 42);
  doc.text(title, 42, y);
  doc.setDrawColor(20, 184, 166);
  doc.setLineWidth(1.2);
  doc.line(42, y + 8, 92, y + 8);
}

function addPdfMetric(doc, x, y, width, label, value) {
  doc.setFillColor(248, 251, 253);
  doc.setDrawColor(218, 229, 238);
  doc.roundedRect(x, y, width, 58, 8, 8, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(91, 112, 131);
  doc.text(label.toUpperCase(), x + 12, y + 20);
  doc.setFontSize(13);
  doc.setTextColor(8, 22, 42);
  doc.text(String(value), x + 12, y + 42, { maxWidth: width - 24 });
}

function getEnglishStatusLabel(statusKey) {
  if (statusKey === "surplus") {
    return translations.en.surplusLabel;
  }

  if (statusKey === "deficit") {
    return translations.en.deficitLabel;
  }

  return translations.en.balancedLabel;
}

function formatEnglishReportMonth(report) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(parseDateString(report.start));
}

function formatPdfDate(dateString) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parseDateString(dateString));
}

function formatPdfReportDay(row) {
  return row ? `${formatPdfDate(row.date)} - ${formatCurrency(row.net)}` : "--";
}

function addPdfCashFlowAnalysis(doc, report, y) {
  const pageWidth = doc.internal.pageSize.getWidth();
  y = ensurePdfSpace(doc, y, 210);

  const chartItems = [
    { label: "Inflows", value: report.totals.inflow, color: [20, 184, 166] },
    { label: "Outflows", value: report.totals.outflow, color: [244, 63, 94] },
    { label: "Net Cash Flow", value: report.net, color: [34, 211, 238] }
  ];
  const maxValue = Math.max(...chartItems.map((item) => Math.abs(item.value)), 1);
  const chartX = 54;
  const chartY = y + 34;
  const chartW = 310;
  const chartH = 118;
  const barW = 52;
  const gap = 42;
  const baselineY = chartY + chartH;
  const analysisX = 390;
  const analysisW = pageWidth - analysisX - 42;

  addPdfSectionTitle(doc, "Cash Flow Analysis", y);

  doc.setFillColor(248, 251, 253);
  doc.setDrawColor(218, 229, 238);
  doc.roundedRect(42, y + 20, pageWidth - 84, 176, 8, 8, "FD");

  doc.setDrawColor(229, 236, 244);
  doc.setLineWidth(0.7);
  [0.25, 0.5, 0.75, 1].forEach((ratio) => {
    const gridY = baselineY - chartH * ratio;
    doc.line(chartX, gridY, chartX + chartW, gridY);
  });

  doc.setDrawColor(8, 22, 42);
  doc.line(chartX, baselineY, chartX + chartW, baselineY);

  chartItems.forEach((item, index) => {
    const x = chartX + 28 + index * (barW + gap);
    const barHeight = Math.max(4, (Math.abs(item.value) / maxValue) * (chartH - 12));
    const barY = baselineY - barHeight;

    doc.setFillColor(...item.color);
    doc.roundedRect(x, barY, barW, barHeight, 6, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(8, 22, 42);
    doc.text(formatCurrency(item.value), x + barW / 2, barY - 7, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(91, 112, 131);
    doc.text(item.label, x + barW / 2, baselineY + 16, { align: "center", maxWidth: 78 });
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(8, 22, 42);
  doc.text("Analysis", analysisX, y + 46);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(44, 62, 80);
  doc.text(doc.splitTextToSize(cashFlowAnalysisText(report), analysisW), analysisX, y + 64);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(8, 22, 42);
  doc.text("Top Expense Categories", analysisX, y + 114);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(44, 62, 80);

  if (report.topExpenseCategories.length) {
    report.topExpenseCategories.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.category} - ${formatCurrency(item.amount)}`, analysisX, y + 134 + index * 16, { maxWidth: analysisW });
    });
  } else {
    doc.text("No expense categories recorded this period.", analysisX, y + 134, { maxWidth: analysisW });
  }

  return y + 216;
}

function addPdfRecommendedActions(doc, report, y) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const actions = getRecommendedActions(report);

  y = ensurePdfSpace(doc, y, 110);
  addPdfSectionTitle(doc, "Recommended Actions", y);
  y += 24;

  doc.setFillColor(248, 251, 253);
  doc.setDrawColor(218, 229, 238);
  doc.roundedRect(42, y, pageWidth - 84, 86, 8, 8, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(44, 62, 80);

  actions.forEach((action, index) => {
    const actionLines = doc.splitTextToSize(action, pageWidth - 128);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}.`, 58, y + 20 + index * 22);
    doc.setFont("helvetica", "normal");
    doc.text(actionLines, 78, y + 20 + index * 22);
  });

  return y + 106;
}

function addPdfDetails(doc, report, y) {
  const details = [
    ["Best Day", formatPdfReportDay(report.best)],
    ["Worst Day", formatPdfReportDay(report.worst)],
    ["Top Expense Category", report.topExpense ? `${report.topExpense.category} - ${formatCurrency(report.topExpense.amount)}` : "--"],
    ["Number of Transactions", String(report.transactions.length)],
    ["Average Net Cash Flow", report.averageNet === null ? "--" : formatCurrency(report.averageNet)]
  ];

  y = ensurePdfSpace(doc, y, 145);
  addPdfSectionTitle(doc, "Report Details", y);
  y += 24;

  details.forEach(([label, value]) => {
    doc.setDrawColor(229, 236, 244);
    doc.line(42, y + 17, 553, y + 17);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(91, 112, 131);
    doc.text(label, 42, y + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(8, 22, 42);
    doc.text(String(value), 228, y + 10, { maxWidth: 320 });
    y += 24;
  });

  return y + 16;
}

function addPdfTransactionHeader(doc, y) {
  const headers = ["Date", "Type", "Category", "Amount", "Notes/Description"];
  const widths = [72, 58, 116, 82, 183];
  let x = 42;

  doc.setFillColor(8, 22, 42);
  doc.rect(42, y, 511, 24, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  headers.forEach((header, index) => {
    doc.text(header, x + 6, y + 16);
    x += widths[index];
  });

  return y + 24;
}

function addPdfTransactionsTable(doc, report, y) {
  const widths = [72, 58, 116, 82, 183];

  y = ensurePdfSpace(doc, y, 86);
  addPdfSectionTitle(doc, "Transactions Summary", y);
  y += 22;

  if (!report.transactions.length) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(91, 112, 131);
    doc.text("No transactions were recorded for this report month.", 42, y + 18);
    return y + 40;
  }

  y = addPdfTransactionHeader(doc, y);

  report.transactions.forEach((transaction) => {
    const cells = [
      formatPdfDate(transaction.date),
      transaction.type,
      transaction.category,
      formatTransactionAmount(transaction),
      transaction.notes || "-"
    ];
    const wrappedNotes = doc.splitTextToSize(cells[4], widths[4] - 12);
    const wrappedCategory = doc.splitTextToSize(cells[2], widths[2] - 12);
    const rowHeight = Math.max(28, 12 + Math.max(wrappedNotes.length, wrappedCategory.length) * 11);

    if (y + rowHeight > doc.internal.pageSize.getHeight() - 70) {
      doc.addPage();
      y = 54;
      y = addPdfTransactionHeader(doc, y);
    }

    let x = 42;
    doc.setDrawColor(229, 236, 244);
    doc.line(42, y + rowHeight, 553, y + rowHeight);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(8, 22, 42);
    doc.text(cells[0], x + 6, y + 16);
    x += widths[0];
    doc.text(cells[1], x + 6, y + 16);
    x += widths[1];
    doc.text(wrappedCategory, x + 6, y + 16);
    x += widths[2];
    doc.setFont("helvetica", "bold");
    doc.text(cells[3], x + 6, y + 16);
    x += widths[3];
    doc.setFont("helvetica", "normal");
    doc.setTextColor(91, 112, 131);
    doc.text(wrappedNotes, x + 6, y + 16);
    y += rowHeight;
  });

  return y;
}

function exportReportPdf() {
  try {
    const PdfConstructor = window.jspdf?.jsPDF;

    if (!PdfConstructor) {
      throw new Error("jsPDF is not available.");
    }

    const report = getReportData();
    const doc = new PdfConstructor({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const businessName = state.settings.businessName || "Small Business Suite";
    const owner = state.settings.ownerName || state.settings.email || "Demo Owner";
    const pdfMonth = formatEnglishReportMonth(report);
    const pdfCashRunway = Number.isFinite(report.monthlyRunwayDays) ? `${report.monthlyRunwayDays} days` : "No outflows";

    doc.setFillColor(8, 22, 42);
    doc.rect(0, 0, pageWidth, 118, "F");
    doc.setFillColor(20, 184, 166);
    doc.rect(42, 96, pageWidth - 84, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("Smart Cash Flow", 42, 42);
    doc.setFontSize(28);
    doc.text("Financial Report", 42, 76);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Business: ${businessName}`, pageWidth - 42, 42, { align: "right" });
    doc.text(`Owner: ${owner}`, pageWidth - 42, 58, { align: "right" });
    doc.text(`Report: ${pdfMonth}`, pageWidth - 42, 74, { align: "right" });
    doc.text(`Generated: ${report.generatedDate}`, pageWidth - 42, 90, { align: "right" });

    let y = 150;
    addPdfSectionTitle(doc, "Executive Summary", y);
    y += 24;
    addPdfMetric(doc, 42, y, 158, "Total Inflows", formatCurrency(report.totals.inflow));
    addPdfMetric(doc, 218, y, 158, "Total Outflows", formatCurrency(report.totals.outflow));
    addPdfMetric(doc, 394, y, 158, "Net Cash Flow", formatCurrency(report.net));
    y += 74;
    addPdfMetric(doc, 42, y, 246, "Business Status", getEnglishStatusLabel(report.status.key));
    addPdfMetric(doc, 306, y, 246, "Cash Runway", pdfCashRunway);
    y += 90;

    addPdfSectionTitle(doc, "Performance Insight", y);
    y += 24;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(44, 62, 80);
    doc.text(doc.splitTextToSize(reportPerformanceInsight(report), pageWidth - 84), 42, y);
    y += 54;

    y = addPdfCashFlowAnalysis(doc, report, y);
    y = addPdfRecommendedActions(doc, report, y);
    y = addPdfDetails(doc, report, y);
    y = addPdfTransactionsTable(doc, report, y);
    addPdfFooter(doc);

    const fileMonth = pdfMonth.replace(/\s+/g, "-");
    doc.save(`Smart-Cash-Flow-Report-${fileMonth}.pdf`);
    showReportToast(t("pdfSuccess"));
  } catch (error) {
    console.error(error);
    showReportToast(t("pdfError"), true);
  }
}

function wireEvents() {
  elements.authViewButtons.forEach((button) => {
    button.addEventListener("click", () => showAuthView(button.dataset.authView));
  });

  elements.startModeButtons.forEach((button) => {
    button.addEventListener("click", () => completeOnboarding(button.dataset.startMode));
  });

  elements.registerForm.addEventListener("submit", registerUser);
  elements.loginForm.addEventListener("submit", loginUser);

  elements.navItems.forEach((item) => {
    item.addEventListener("click", () => setActiveSection(item.dataset.section));
  });

  elements.jumpButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveSection(button.dataset.jump));
  });

  elements.restoreDemoButtons.forEach((button) => {
    button.addEventListener("click", restoreDemoData);
  });

  elements.clearDemoButtons.forEach((button) => {
    button.addEventListener("click", clearDemoData);
  });

  elements.logoutButtons.forEach((button) => {
    button.addEventListener("click", logoutUser);
  });

  elements.transactionForm.addEventListener("submit", addTransaction);
  elements.productForm.addEventListener("submit", addProduct);
  elements.stockMovementForm.addEventListener("submit", addStockMovement);

  elements.transactionsBody.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-id]");
    if (deleteButton) {
      deleteTransaction(Number(deleteButton.dataset.deleteId));
    }
  });

  elements.inventoryProductsBody.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-product-id]");
    if (deleteButton) {
      deleteProduct(deleteButton.dataset.deleteProductId);
    }
  });

  elements.searchResults.addEventListener("click", (event) => {
    const result = event.target.closest("[data-search-id]");
    if (result) {
      openSearchResult(Number(result.dataset.searchId));
    }
  });

  [elements.typeFilter, elements.dateFilter, elements.monthFilter, elements.yearFilter, elements.categoryFilter].forEach((input) => {
    input.addEventListener("input", renderTransactions);
  });

  elements.clearFiltersButton.addEventListener("click", clearTransactionFilters);

  elements.globalSearch.addEventListener("input", () => {
    renderTransactions();
    renderSearchResults();
  });

  elements.clearSearchButton.addEventListener("click", clearSearch);

  elements.analyticsPeriodSelector.addEventListener("change", () => {
    renderAnalytics();
    renderCharts();
  });

  [elements.analyticsFromDate, elements.analyticsToDate, elements.comparisonStartMonth, elements.comparisonStartYear, elements.comparisonEndMonth, elements.comparisonEndYear].forEach((input) => {
    input.addEventListener("input", () => {
      renderAnalytics();
      renderCharts();
    });
    input.addEventListener("change", () => {
      renderAnalytics();
      renderCharts();
    });
  });

  elements.analyticsClearRangeButton.addEventListener("click", () => {
    elements.analyticsFromDate.value = "";
    elements.analyticsToDate.value = "";
    renderAnalytics();
    renderCharts();
  });

  [elements.reportMonthSelector, elements.reportYearSelector].forEach((input) => {
    input.addEventListener("change", updateSelectedReportPeriod);
  });

  [elements.businessNameInput, elements.ownerNameInput, elements.openingBalanceInput, elements.currencySelector, elements.businessTypeSelector, elements.languageSelector, elements.themeToggle].forEach((input) => {
    input.addEventListener("input", updateUserFromSettings);
    input.addEventListener("change", updateUserFromSettings);
  });

  elements.exportReportButton.addEventListener("click", exportReportPdf);
}

loadState();
cacheElements();
elements.date.value = getTodayDateString();
elements.stockMovementDate.value = getTodayDateString();
wireEvents();
updateAuthVisibility();
refreshApp();



