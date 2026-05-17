const TRANSACTIONS_KEY = "smartCashFlowPrototypeTransactions";
const SETTINGS_KEY = "smartCashFlowPrototypeSettings";
const USER_KEY = "smartCashFlowPrototypeUser";

const state = {
  transactions: [],
  user: null,
  settings: {
    businessName: "Small Business Suite",
    ownerName: "Demo Owner",
    email: "owner@smartcashflow.demo",
    currency: "USD",
    businessType: "Retail",
    lightTheme: false
  },
  activeSection: "dashboard",
  highlightedTransactionId: null,
  charts: {}
};

const elements = {};
let reportToastTimer = null;

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
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function formatShortDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
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

function createDemoTransactions() {
  const today = getTodayDateString();

  return [
    { id: 101, type: "inflow", amount: 12400, category: "Retail Sales", date: today, notes: "Morning and evening sales" },
    { id: 102, type: "outflow", amount: 3150, category: "Inventory", date: today, notes: "Supplier restock" },
    { id: 103, type: "outflow", amount: 980, category: "Delivery", date: today, notes: "Courier fees" },
    { id: 104, type: "inflow", amount: 8700, category: "Online Orders", date: addDays(today, -1), notes: "Marketplace payouts" },
    { id: 105, type: "outflow", amount: 2200, category: "Payroll", date: addDays(today, -1), notes: "Part-time shift" },
    { id: 106, type: "inflow", amount: 6500, category: "Service Revenue", date: addDays(today, -2), notes: "Client project payment" },
    { id: 107, type: "outflow", amount: 1475, category: "Marketing", date: addDays(today, -2), notes: "Local ad campaign" },
    { id: 108, type: "inflow", amount: 7200, category: "Retail Sales", date: addDays(today, -3), notes: "Weekend sales" },
    { id: 109, type: "outflow", amount: 1850, category: "Utilities", date: addDays(today, -4), notes: "Electricity and internet" },
    { id: 110, type: "inflow", amount: 9200, category: "Wholesale", date: addDays(today, -5), notes: "Bulk order" },
    { id: 111, type: "outflow", amount: 2650, category: "Inventory", date: addDays(today, -6), notes: "Packaging and raw materials" },
    { id: 112, type: "inflow", amount: 5100, category: "Online Orders", date: addDays(today, -7), notes: "Direct checkout" },
    { id: 113, type: "outflow", amount: 1250, category: "Rent", date: addDays(today, -8), notes: "Store payment" },
    { id: 114, type: "inflow", amount: 7800, category: "Retail Sales", date: addDays(today, -9), notes: "Counter sales" },
    { id: 115, type: "outflow", amount: 930, category: "Supplies", date: addDays(today, -10), notes: "Office supplies" }
  ];
}

function loadState() {
  const savedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
  const savedSettings = localStorage.getItem(SETTINGS_KEY);
  const savedUser = localStorage.getItem(USER_KEY);

  state.transactions = savedTransactions ? JSON.parse(savedTransactions) : createDemoTransactions();
  state.user = savedUser ? JSON.parse(savedUser) : null;
  state.settings = {
    ...state.settings,
    ...(savedSettings ? JSON.parse(savedSettings) : {}),
    ...(state.user || {})
  };

  saveTransactions();
  saveSettings();
}

function saveTransactions() {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(state.transactions));
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
    recentTransactionsBody: $("#recentTransactionsBody"),
    transactionsBody: $("#transactionsBody"),
    transactionForm: $("#transactionForm"),
    amount: $("#amount"),
    category: $("#category"),
    date: $("#date"),
    notes: $("#notes"),
    typeFilter: $("#typeFilter"),
    dateFilter: $("#dateFilter"),
    categoryFilter: $("#categoryFilter"),
    transactionCountChip: $("#transactionCountChip"),
    cashRunway: $("#cashRunway"),
    operatingCashFlow: $("#operatingCashFlow"),
    topExpenseCategory: $("#topExpenseCategory"),
    quickInsights: $("#quickInsights"),
    totalInflows: $("#totalInflows"),
    totalOutflows: $("#totalOutflows"),
    averageNet: $("#averageNet"),
    numberOfTransactions: $("#numberOfTransactions"),
    categoryAnalysis: $("#categoryAnalysis"),
    forecast7: $("#forecast7"),
    forecast14: $("#forecast14"),
    forecast30: $("#forecast30"),
    forecastInsight: $("#forecastInsight"),
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
    reportTransactionsBody: $("#reportTransactionsBody"),
    exportReportButton: $("#exportReportButton"),
    reportToast: $("#reportToast"),
    businessNameInput: $("#businessNameInput"),
    ownerNameInput: $("#ownerNameInput"),
    currencySelector: $("#currencySelector"),
    businessTypeSelector: $("#businessTypeSelector"),
    themeToggle: $("#themeToggle")
  });
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

  state.user = {
    businessName: elements.registerBusinessName.value.trim(),
    ownerName: elements.registerOwnerName.value.trim(),
    email: elements.registerEmail.value.trim().toLowerCase(),
    password: elements.registerPassword.value,
    currency: elements.registerCurrency.value,
    businessType: elements.registerBusinessType.value,
    loggedIn: false,
    onboarded: false
  };

  state.settings = {
    ...state.settings,
    businessName: state.user.businessName,
    ownerName: state.user.ownerName,
    email: state.user.email,
    currency: state.user.currency,
    businessType: state.user.businessType
  };

  saveUser();
  saveSettings();
  showAuthView("onboardingScreen");
}

function completeOnboarding(mode) {
  if (!state.user) {
    return;
  }

  state.transactions = mode === "demo" ? createDemoTransactions() : [];
  state.user.loggedIn = true;
  state.user.onboarded = true;
  saveUser();
  saveTransactions();
  saveSettings();
  updateAuthVisibility();
  refreshApp();
}

function loginUser(event) {
  event.preventDefault();

  const email = elements.loginEmail.value.trim().toLowerCase();
  const password = elements.loginPassword.value;

  if (!state.user || state.user.email !== email || state.user.password !== password) {
    elements.loginEmail.setCustomValidity("Login details do not match.");
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
      label: "Warning / Deficit",
      short: "Deficit",
      copy: "Cash outflows are higher than inflows today.",
      alert: "Warning: cash moved into deficit today. Review supplier payments, payroll timing, and discretionary spending."
    };
  }

  if (net === 0) {
    return {
      key: "balanced",
      label: "Balanced",
      short: "Balanced",
      copy: "Cash movement is neutral today.",
      alert: "Balanced: today's inflows and outflows are equal. Keep watching upcoming expenses."
    };
  }

  return {
    key: "surplus",
    label: "Surplus",
    short: "Surplus",
    copy: "Cash inflows are higher than outflows today.",
    alert: "Healthy surplus: cash inflows are ahead today. Consider reserving part of the gain for upcoming obligations."
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
      label: index === 6 ? "Today" : formatShortDate(row.date),
      value: row.net
    }))
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

function filteredTransactions() {
  const type = elements.typeFilter.value;
  const date = elements.dateFilter.value;
  const category = elements.categoryFilter.value.trim().toLowerCase();
  const globalSearch = elements.globalSearch.value.trim();

  return state.transactions
    .filter((transaction) => type === "all" || transaction.type === type)
    .filter((transaction) => !date || transaction.date === date)
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
  const topExpense = getCategoryTotals("outflow")[0];
  const forecast = getForecast();
  const runway = todayTotals.outflow > 0 ? Math.max(1, Math.round((todayTotals.inflow / todayTotals.outflow) * 14)) : 30;

  elements.currentDate.textContent = formatDate(today);
  elements.todayInflows.textContent = formatCurrency(todayTotals.inflow);
  elements.todayOutflows.textContent = formatCurrency(todayTotals.outflow);
  elements.netCashFlow.textContent = formatCurrency(net);
  elements.businessStatus.textContent = status.label;
  elements.statusCaption.textContent = status.copy;
  elements.statusAlert.textContent = state.transactions.length ? status.alert : "No transactions yet. Add one manually to populate the dashboard.";
  elements.headerStatusBadge.textContent = status.label;
  elements.sidebarHealth.textContent = status.short;
  elements.sidebarHealthCopy.textContent = status.copy;
  elements.cashRunway.textContent = `${runway} days`;
  elements.operatingCashFlow.textContent = formatCurrency(net);
  elements.topExpenseCategory.textContent = topExpense ? topExpense.category : "--";

  renderStatusClass(elements.statusAlert, status.key);
  renderStatusClass(elements.headerStatusBadge, status.key);
  elements.statusCard.classList.toggle("deficit", status.key === "deficit");
  elements.statusCard.classList.toggle("surplus", status.key === "surplus");

  elements.quickInsights.innerHTML = [
    ["7-day average", formatCurrency(forecast.averageNet)],
    ["Largest expense", topExpense ? `${topExpense.category} · ${formatCurrency(topExpense.amount)}` : "--"],
    ["Transactions stored", `${state.transactions.length} records`]
  ]
    .map(([label, value]) => `<div class="insight-row"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  renderRecentTransactions();
}

function transactionRows(transactions, includeAction = true) {
  if (transactions.length === 0) {
    const columns = includeAction ? 6 : 4;
    return `<tr><td colspan="${columns}" class="empty-state">No matching results found.</td></tr>`;
  }

  return transactions
    .map((transaction) => {
      const amountClass = transaction.type === "inflow" ? "amount-inflow" : "amount-outflow";
      const amountPrefix = transaction.type === "inflow" ? "+" : "-";
      const amount = `${amountPrefix}${formatCurrency(transaction.amount)}`;
      const highlightClass = state.highlightedTransactionId === transaction.id ? "highlight-row" : "";

      if (!includeAction) {
        return `
          <tr class="${highlightClass}" data-row-id="${transaction.id}">
            <td>${formatDate(transaction.date)}</td>
            <td><span class="type-badge ${transaction.type}">${transaction.type}</span></td>
            <td>${escapeHtml(transaction.category)}</td>
            <td class="${amountClass}">${amount}</td>
          </tr>
        `;
      }

      return `
        <tr class="${highlightClass}" data-row-id="${transaction.id}">
          <td>${formatDate(transaction.date)}</td>
          <td><span class="type-badge ${transaction.type}">${transaction.type}</span></td>
          <td>${escapeHtml(transaction.category)}</td>
          <td class="${amountClass}">${amount}</td>
          <td>${transaction.notes ? escapeHtml(transaction.notes) : "-"}</td>
          <td><button class="delete-button" type="button" data-delete-id="${transaction.id}">Delete</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderRecentTransactions() {
  elements.recentTransactionsBody.innerHTML = transactionRows(sortedTransactions().slice(0, 6), false);
}

function renderTransactions() {
  const transactions = filteredTransactions();
  elements.transactionsBody.innerHTML = transactionRows(transactions, true);
  elements.transactionCountChip.textContent = `${transactions.length} transaction${transactions.length === 1 ? "" : "s"}`;
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
    elements.searchResults.innerHTML = '<div class="search-empty">No matching results found</div>';
    return;
  }

  elements.searchResults.innerHTML = results.map((transaction) => `
    <button class="search-result-item" type="button" data-search-id="${transaction.id}">
      <span class="search-result-top">
        <strong>${escapeHtml(transaction.category)}</strong>
        <span class="type-badge ${transaction.type}">${transaction.type}</span>
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
  elements.categoryFilter.value = "";
  setActiveSection("transactions");
  renderTransactions();
  renderSearchResults();

  setTimeout(() => {
    state.highlightedTransactionId = null;
    renderTransactions();
  }, 3200);
}

function renderAnalytics() {
  const totals = getTotals();
  const netRows = getDailyRows(14);
  const averageNet = roundMoney(netRows.reduce((total, row) => total + row.net, 0) / netRows.length);
  const categoryTotals = getCategoryTotals("outflow");
  const maxCategory = categoryTotals[0]?.amount || 1;

  elements.totalInflows.textContent = formatCurrency(totals.inflow);
  elements.totalOutflows.textContent = formatCurrency(totals.outflow);
  elements.averageNet.textContent = formatCurrency(averageNet);
  elements.numberOfTransactions.textContent = String(state.transactions.length);

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
    : '<div class="empty-state">No expense categories yet.</div>';
}

function renderForecasting() {
  const forecast = getForecast();
  const positive = forecast.after30 >= 0;

  elements.forecast7.textContent = formatCurrency(forecast.after7);
  elements.forecast14.textContent = formatCurrency(forecast.after14);
  elements.forecast30.textContent = formatCurrency(forecast.after30);
  elements.forecastInsight.textContent = positive
    ? "Healthy outlook: projected cash flow remains positive. Keep protecting margin and reserve cash."
    : "Warning: projected cash flow is negative. Reduce nonessential outflows or bring inflows forward.";
  renderStatusClass(elements.forecastInsight, positive ? "surplus" : "deficit");
}

function getMonthTransactions(referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth() + 1;

  return state.transactions.filter((transaction) => {
    const [transactionYear, transactionMonth] = transaction.date.split("-").map(Number);
    return transactionYear === year && transactionMonth === month;
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
    return `${month} has no recorded transactions yet. Add inflows or outflows to build the monthly view.`;
  }

  if (statusKey === "surplus") {
    return `${month} is showing a healthy ${formatCurrency(net)} surplus with inflows ahead of outflows.`;
  }

  if (statusKey === "deficit") {
    return `${month} is showing a ${formatCurrency(net)} deficit, so outflows need closer review.`;
  }

  return `${month} is balanced, with inflows and outflows nearly equal across recorded activity.`;
}

function getReportData() {
  const referenceDate = new Date();
  const month = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(referenceDate);
  const transactions = getMonthTransactions(referenceDate);
  const totals = getTotals(transactions);
  const net = roundMoney(totals.inflow - totals.outflow);
  const status = getStatus(net);
  const dailyRows = getTransactionDailyRows(transactions);
  const best = dailyRows.length ? [...dailyRows].sort((a, b) => b.net - a.net)[0] : null;
  const worst = dailyRows.length ? [...dailyRows].sort((a, b) => a.net - b.net)[0] : null;
  const topExpenseCategories = getTopExpenseCategoriesFrom(transactions);
  const topExpense = topExpenseCategories[0];
  const averageNet = dailyRows.length ? roundMoney(dailyRows.reduce((total, row) => total + row.net, 0) / dailyRows.length) : null;
  const cashRunway = totals.outflow > 0 ? `${Math.max(1, Math.round((totals.inflow / totals.outflow) * 14))} days` : transactions.length ? "30 days" : "--";

  return {
    month,
    generatedDate: formatDate(toDateString(new Date())),
    transactions: [...transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id),
    totals,
    net,
    status,
    best,
    worst,
    topExpense,
    topExpenseCategories,
    averageNet,
    cashRunway,
    insight: getReportInsight(status.key, month, net, transactions.length)
  };
}

function formatReportDay(row) {
  return row ? `${formatDate(row.date)} - ${formatCurrency(row.net)}` : "--";
}

function formatTransactionAmount(transaction) {
  const signedAmount = transaction.type === "inflow" ? Number(transaction.amount) : -Number(transaction.amount);
  return formatCurrency(signedAmount);
}

function renderReportTransactions(transactions) {
  if (!transactions.length) {
    return '<tr><td colspan="4" class="empty-state">No monthly transactions found.</td></tr>';
  }

  return transactions
    .slice(0, 6)
    .map((transaction) => {
      const amountClass = transaction.type === "inflow" ? "amount-inflow" : "amount-outflow";

      return `
        <tr>
          <td>${formatDate(transaction.date)}</td>
          <td><span class="type-badge ${transaction.type}">${transaction.type}</span></td>
          <td>${escapeHtml(transaction.category)}</td>
          <td class="${amountClass}">${formatTransactionAmount(transaction)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderReports() {
  const report = getReportData();

  elements.monthlySummary.textContent = report.month;
  elements.reportMonthInsight.textContent = report.insight;
  elements.reportInflows.textContent = formatCurrency(report.totals.inflow);
  elements.reportOutflows.textContent = formatCurrency(report.totals.outflow);
  elements.reportNet.textContent = formatCurrency(report.net);
  elements.reportBusinessStatus.textContent = report.status.label;
  elements.bestDay.textContent = formatReportDay(report.best);
  elements.worstDay.textContent = formatReportDay(report.worst);
  elements.reportTopExpense.textContent = report.topExpense ? `${report.topExpense.category} - ${formatCurrency(report.topExpense.amount)}` : "--";
  elements.reportTransactionCount.textContent = String(report.transactions.length);
  elements.reportAverageNet.textContent = report.averageNet === null ? "--" : formatCurrency(report.averageNet);
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

  const rows = getDailyRows(14);
  const labels = rows.map((row) => formatShortDate(row.date));
  const options = baseChartOptions();

  createOrReplaceChart("dailyBar", "dailyBarChart", {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Inflows",
          data: rows.map((row) => row.inflow),
          backgroundColor: "rgba(52, 211, 153, 0.78)",
          borderRadius: 12
        },
        {
          label: "Outflows",
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
      labels,
      datasets: [
        {
          label: "Net Cash Flow",
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
      labels: [...forecast.rows.map((row) => row.label), "After 7d", "After 14d", "After 30d"],
      datasets: [
        {
          label: "Cash Flow Projection",
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
  elements.currencySelector.value = state.settings.currency;
  elements.businessTypeSelector.value = state.settings.businessType;
  elements.themeToggle.checked = state.settings.lightTheme;
  elements.sidebarBusinessName.textContent = state.settings.businessName;
  elements.profileChip.textContent = `${state.settings.ownerName || "Owner"} · ${state.settings.email || "Demo"}`;
}

function refreshApp() {
  renderSettings();
  renderDashboard();
  renderTransactions();
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
  elements.pageTitle.textContent = sectionName === "dashboard"
    ? "Smart Cash Flow"
    : sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
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
  const confirmed = window.confirm("Restore demo data?");

  if (!confirmed) {
    return;
  }

  state.transactions = createDemoTransactions();
  saveTransactions();
  refreshApp();
  showReportToast("Demo data restored successfully.");
}

function clearDemoData() {
  const confirmed = window.confirm("Clear all demo transactions?");

  if (!confirmed) {
    return;
  }

  state.transactions = [];
  saveTransactions();
  refreshApp();
  showReportToast("Demo data cleared successfully.");
}

function clearSearch() {
  elements.globalSearch.value = "";
  state.highlightedTransactionId = null;
  renderTransactions();
  renderSearchResults();
}

function updateUserFromSettings() {
  state.settings.businessName = elements.businessNameInput.value.trim() || "Small Business Suite";
  state.settings.ownerName = elements.ownerNameInput.value.trim() || "Demo Owner";
  state.settings.currency = elements.currencySelector.value;
  state.settings.businessType = elements.businessTypeSelector.value;
  state.settings.lightTheme = elements.themeToggle.checked;

  if (state.user) {
    state.user.businessName = state.settings.businessName;
    state.user.ownerName = state.settings.ownerName;
    state.user.currency = state.settings.currency;
    state.user.businessType = state.settings.businessType;
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
    ["Best Day", formatReportDay(report.best)],
    ["Worst Day", formatReportDay(report.worst)],
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
      formatDate(transaction.date),
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
    doc.text(`Report: ${report.month}`, pageWidth - 42, 74, { align: "right" });
    doc.text(`Generated: ${report.generatedDate}`, pageWidth - 42, 90, { align: "right" });

    let y = 150;
    addPdfSectionTitle(doc, "Executive Summary", y);
    y += 24;
    addPdfMetric(doc, 42, y, 158, "Total Inflows", formatCurrency(report.totals.inflow));
    addPdfMetric(doc, 218, y, 158, "Total Outflows", formatCurrency(report.totals.outflow));
    addPdfMetric(doc, 394, y, 158, "Net Cash Flow", formatCurrency(report.net));
    y += 74;
    addPdfMetric(doc, 42, y, 246, "Business Status", report.status.label);
    addPdfMetric(doc, 306, y, 246, "Cash Runway", report.cashRunway);
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

    const fileMonth = report.month.replace(/\s+/g, "-");
    doc.save(`Smart-Cash-Flow-Report-${fileMonth}.pdf`);
    showReportToast("PDF report downloaded successfully.");
  } catch (error) {
    console.error(error);
    showReportToast("Could not generate the report. Please try again.", true);
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

  elements.transactionsBody.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-id]");
    if (deleteButton) {
      deleteTransaction(Number(deleteButton.dataset.deleteId));
    }
  });

  elements.searchResults.addEventListener("click", (event) => {
    const result = event.target.closest("[data-search-id]");
    if (result) {
      openSearchResult(Number(result.dataset.searchId));
    }
  });

  [elements.typeFilter, elements.dateFilter, elements.categoryFilter].forEach((input) => {
    input.addEventListener("input", renderTransactions);
  });

  elements.globalSearch.addEventListener("input", () => {
    renderTransactions();
    renderSearchResults();
  });

  elements.clearSearchButton.addEventListener("click", clearSearch);

  [elements.businessNameInput, elements.ownerNameInput, elements.currencySelector, elements.businessTypeSelector, elements.themeToggle].forEach((input) => {
    input.addEventListener("input", updateUserFromSettings);
    input.addEventListener("change", updateUserFromSettings);
  });

  elements.exportReportButton.addEventListener("click", exportReportPdf);
}

loadState();
cacheElements();
elements.date.value = getTodayDateString();
wireEvents();
updateAuthVisibility();
refreshApp();
