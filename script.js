const STORAGE_KEY = "spendwise-expenses";
const THEME_KEY = "spendwise-theme";
const CATEGORY_COLORS = {
  Food: "#f97316",
  Travel: "#3b82f6",
  Education: "#8b5cf6",
  Shopping: "#ec4899",
  Other: "#14b8a6",
};
const CATEGORIES = Object.keys(CATEGORY_COLORS);
const MAX_AMOUNT = 999999999.99;

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const emptyState = document.getElementById("empty-state");
const formMessage = document.getElementById("form-message");
const dateInput = document.getElementById("expense-date");
const searchInput = document.getElementById("expense-search");
const categoryFilter = document.getElementById("category-filter");
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const downloadPdfBtn = document.getElementById("download-pdf-btn");

const state = { expenses: loadExpenses() };

initializeApp();

function initializeApp() {
  initTheme();
  dateInput.value = getLocalDateString();
  form.addEventListener("submit", handleExpenseSubmit);
  expenseList.addEventListener("click", handleExpenseDelete);
  searchInput.addEventListener("input", renderExpenseList);
  categoryFilter.addEventListener("change", renderExpenseList);
  if (themeToggleBtn) themeToggleBtn.addEventListener("click", handleThemeToggle);
  if (downloadPdfBtn) downloadPdfBtn.addEventListener("click", handleDownloadPDF);
  render();
}

function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch (err) {
    console.warn("Could not read theme preference.", err);
  }
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
  applyTheme(initialTheme);

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      let currentSaved = null;
      try {
        currentSaved = localStorage.getItem(THEME_KEY);
      } catch (err) {}
      if (!currentSaved) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.setAttribute("data-theme", theme);
  if (themeIcon) themeIcon.textContent = isDark ? "☀️" : "🌙";
  if (themeLabel) themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggleBtn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", isDark ? "#0b111e" : "#f4f7fb");
  }
}

function handleThemeToggle() {
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (err) {
    console.warn("Could not save theme preference.", err);
  }
  applyTheme(next);
}

function handleExpenseSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("expense-name").value.trim();
  const amountText = document.getElementById("expense-amount").value;
  const amount = Number(amountText);
  const category = document.getElementById("expense-category").value;
  const date = dateInput.value;

  if (!name) return showFormMessage("Please enter an expense name.", "error");
  if (!amountText || !Number.isFinite(amount) || amount <= 0 || amount > MAX_AMOUNT) {
    return showFormMessage("Enter an amount greater than zero and no more than ₹999,999,999.99.", "error");
  }
  if (Math.round(amount * 100) / 100 !== amount) {
    return showFormMessage("Amounts can have up to 2 decimal places.", "error");
  }
  if (!CATEGORIES.includes(category)) return showFormMessage("Please select a valid category.", "error");
  if (!isValidDate(date)) return showFormMessage("Please choose a valid date.", "error");

  state.expenses.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    amount: Math.round(amount * 100) / 100,
    category,
    date,
    createdAt: Date.now(),
  });
  const saved = saveExpenses();
  form.reset();
  dateInput.value = getLocalDateString();
  render();
  showFormMessage(
    saved ? "Expense added successfully." : "Added for this session, but browser storage is unavailable.",
    saved ? "success" : "error"
  );
}

function handleExpenseDelete(event) {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  state.expenses = state.expenses.filter((expense) => expense.id !== button.dataset.id);
  const saved = saveExpenses();
  render();
  if (!saved) showFormMessage("Expense deleted for this session, but browser storage is unavailable.", "error");
}

function calculateExpenseSummary(expenses) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = CATEGORIES.map((category) => {
    const amount = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return {
      category,
      amount,
      percentage: total > 0 ? ((amount / total) * 100).toFixed(1) : "0.0",
    };
  });
  const topCategory = categoryTotals.reduce(
    (largest, item) => (item.amount > largest.amount ? item : largest),
    { category: "No data", amount: 0, percentage: "0.0" }
  );
  const now = new Date();
  const monthlyTotal = expenses.reduce((sum, expense) => {
    const [year, month] = expense.date.split("-").map(Number);
    return year === now.getFullYear() && month === now.getMonth() + 1 ? sum + expense.amount : sum;
  }, 0);

  return { total, monthlyTotal, categoryTotals, topCategory };
}

function render() {
  const { total, monthlyTotal, categoryTotals, topCategory } = calculateExpenseSummary(state.expenses);

  document.getElementById("total-expenses").textContent = formatCurrency(total);
  document.getElementById("transaction-count").textContent = `${state.expenses.length} transaction${state.expenses.length === 1 ? "" : "s"} recorded`;
  document.getElementById("top-category").textContent = topCategory.amount > 0 ? topCategory.category : "No data";
  document.getElementById("top-category-amount").textContent = `${formatCurrency(topCategory.amount)} spent`;
  document.getElementById("monthly-total").textContent = formatCurrency(monthlyTotal);
  renderCategorySummary(categoryTotals);
  renderExpenseList();
}

function renderCategorySummary(categoryTotals) {
  const container = document.getElementById("category-summary");
  container.replaceChildren();
  const maxAmount = Math.max(...categoryTotals.map((item) => item.amount), 1);
  categoryTotals.forEach(({ category, amount }) => {
    const row = document.createElement("div");
    row.className = "category-row";
    const topLine = document.createElement("div");
    topLine.className = "category-topline";
    const name = document.createElement("span");
    name.className = "category-name";
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.backgroundColor = CATEGORY_COLORS[category];
    const label = document.createElement("span");
    label.textContent = category;
    name.append(dot, label);
    const value = document.createElement("strong");
    value.textContent = formatCurrency(amount);
    topLine.append(name, value);
    const bar = document.createElement("div");
    bar.className = "progress-bar";
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-label", `${category} spending`);
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", String(maxAmount));
    bar.setAttribute("aria-valuenow", String(amount));
    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.backgroundColor = CATEGORY_COLORS[category];
    fill.style.width = `${(amount / maxAmount) * 100}%`;
    bar.appendChild(fill);
    row.append(topLine, bar);
    container.appendChild(row);
  });
}

function renderExpenseList() {
  expenseList.replaceChildren();
  const query = searchInput.value.trim().toLocaleLowerCase();
  const selectedCategory = categoryFilter.value;
  const filteredExpenses = state.expenses.filter(
    (expense) =>
      expense.name.toLocaleLowerCase().includes(query) &&
      (!selectedCategory || expense.category === selectedCategory)
  );
  const hasExpenses = state.expenses.length > 0;
  const hasMatches = filteredExpenses.length > 0;
  emptyState.classList.toggle("hidden", hasMatches);

  document.getElementById("empty-title").textContent = hasExpenses ? "No matching expenses" : "Your story starts here";
  document.getElementById("empty-description").textContent = hasExpenses
    ? "Try a different search or category filter."
    : "Add your first expense and your spending summary will appear here.";

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt
  );
  sortedExpenses.forEach((expense) => {
    const item = document.createElement("li");
    item.className = "expense-item";
    const details = document.createElement("div");
    details.className = "expense-main";
    const nameRow = document.createElement("div");
    nameRow.className = "expense-name-row";
    const name = document.createElement("span");
    name.className = "expense-name";
    name.textContent = expense.name;
    const category = document.createElement("span");
    category.className = "category-pill";
    category.style.backgroundColor = `${CATEGORY_COLORS[expense.category]}22`;
    category.style.color = CATEGORY_COLORS[expense.category];
    category.textContent = expense.category;
    nameRow.append(name, category);
    const meta = document.createElement("div");
    meta.className = "expense-meta";
    const date = document.createElement("span");
    date.textContent = formatDate(expense.date);
    meta.appendChild(date);
    details.append(nameRow, meta);
    const amount = document.createElement("strong");
    amount.className = "amount";
    amount.textContent = formatCurrency(expense.amount);
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.dataset.id = expense.id;
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${expense.name}`);
    item.append(details, amount, deleteButton);
    expenseList.appendChild(item);
  });
}

function buildPDFReportElement() {
  const container = document.createElement("div");
  container.className = "spendwise-pdf-report";

  const { total, monthlyTotal, categoryTotals, topCategory } = calculateExpenseSummary(state.expenses);

  const reportDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  const sortedExpenses = [...state.expenses].sort(
    (a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt
  );

  container.innerHTML = `
    <div class="pdf-header">
      <div class="pdf-brand">
        <div class="pdf-brand-mark">S</div>
        <div class="pdf-brand-title">spendwise<span>.</span></div>
      </div>
      <div class="pdf-meta-box">
        <strong>Expense Overview Report</strong>
        <span>Generated: ${reportDate}</span>
      </div>
    </div>

    <div class="pdf-summary-grid">
      <div class="pdf-card highlight">
        <div class="pdf-card-label">Total Expenditure</div>
        <div class="pdf-card-value">${formatCurrency(total)}</div>
        <div class="pdf-card-sub">${state.expenses.length} transaction${state.expenses.length === 1 ? "" : "s"} recorded</div>
      </div>
      <div class="pdf-card">
        <div class="pdf-card-label">Top Category</div>
        <div class="pdf-card-value">${topCategory.amount > 0 ? topCategory.category : "No data"}</div>
        <div class="pdf-card-sub">${formatCurrency(topCategory.amount)} spent (${topCategory.percentage}%)</div>
      </div>
      <div class="pdf-card">
        <div class="pdf-card-label">This Month</div>
        <div class="pdf-card-value">${formatCurrency(monthlyTotal)}</div>
        <div class="pdf-card-sub">Current calendar month</div>
      </div>
    </div>

    <div class="pdf-section-title">Spending by Category</div>
    <table class="pdf-category-table">
      <thead>
        <tr>
          <th>Category</th>
          <th style="text-align: right;">Total Amount</th>
          <th style="text-align: right;">Share of Total</th>
        </tr>
      </thead>
      <tbody>
        ${categoryTotals
          .map(
            ({ category, amount, percentage }) => `
          <tr>
            <td>
              <span class="pdf-cat-badge" style="background: ${CATEGORY_COLORS[category]}22; color: ${CATEGORY_COLORS[category]};">
                ● ${category}
              </span>
            </td>
            <td style="text-align: right; font-weight: 700;">${formatCurrency(amount)}</td>
            <td style="text-align: right; color: #64748b;">${percentage}%</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>

    <div class="pdf-section-title">Recent Transactions (${sortedExpenses.length})</div>
    ${
      sortedExpenses.length === 0
        ? `<p style="font-size: 11px; color: #64748b; padding: 12px 0;">No transactions recorded yet.</p>`
        : `
      <table class="pdf-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Expense Item</th>
            <th>Category</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${sortedExpenses
            .slice(0, 50)
            .map(
              (expense) => `
            <tr>
              <td style="white-space: nowrap; color: #64748b;">${formatDate(expense.date)}</td>
              <td style="font-weight: 600;">${escapeHTML(expense.name)}</td>
              <td>
                <span class="pdf-cat-badge" style="background: ${CATEGORY_COLORS[expense.category]}22; color: ${CATEGORY_COLORS[expense.category]};">
                  ${expense.category}
                </span>
              </td>
              <td style="text-align: right; font-weight: 700;">${formatCurrency(expense.amount)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      ${
        sortedExpenses.length > 50
          ? `<p style="font-size: 10px; color: #94a3b8; margin: 4px 0 0;">Showing first 50 transactions.</p>`
          : ""
      }
    `
    }

    <div class="pdf-footer">
      <span>SpendWise — Private Personal Finance</span>
      <span>Confidential & Personal</span>
    </div>
  `;

  return container;
}

async function handleDownloadPDF() {
  if (!downloadPdfBtn) return;
  const originalHTML = downloadPdfBtn.innerHTML;
  downloadPdfBtn.disabled = true;
  downloadPdfBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">⏳</span><span class="btn-text">Creating PDF...</span>`;

  try {
    const reportElement = buildPDFReportElement();
    const wrapper = document.createElement("div");
    wrapper.className = "pdf-container-offscreen";
    wrapper.appendChild(reportElement);
    document.body.appendChild(wrapper);

    if (window.html2pdf) {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `spendwise-overview-${getLocalDateString()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await window.html2pdf().set(opt).from(reportElement).save();
      showFormMessage("Overview PDF downloaded successfully.", "success");
    } else {
      window.print();
      showFormMessage("Print dialog opened for saving overview as PDF.", "success");
    }
    wrapper.remove();
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    showFormMessage("Could not generate PDF. Opening print dialog instead.", "error");
    window.print();
  } finally {
    downloadPdfBtn.disabled = false;
    downloadPdfBtn.innerHTML = originalHTML;
  }
}

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, (tag) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[tag] || tag));
}

function loadExpenses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (expense) =>
          expense &&
          typeof expense.id === "string" &&
          typeof expense.name === "string" &&
          expense.name.length > 0 &&
          CATEGORIES.includes(expense.category) &&
          isValidDate(expense.date) &&
          Number.isFinite(expense.amount) &&
          expense.amount > 0 &&
          expense.amount <= MAX_AMOUNT
      )
      .map((expense) => ({
        ...expense,
        createdAt: Number.isFinite(expense.createdAt) ? expense.createdAt : 0,
      }));
  } catch (error) {
    console.warn("Could not read SpendWise data from browser storage.", error);
    return [];
  }
}

function saveExpenses() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
    return true;
  } catch (error) {
    console.warn("Could not save SpendWise data to browser storage.", error);
    return false;
  }
}

function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function getLocalDateString() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}

function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(year, month - 1, day)
  );
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}
