const STORAGE_KEY = "spendwise-expenses";
const CATEGORY_COLORS = {
  Food: "#f97316",
  Travel: "#3b82f6",
  Education: "#8b5cf6",
  Shopping: "#ec4899",
  Other: "#14b8a6",
};
const CATEGORIES = Object.keys(CATEGORY_COLORS);

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const emptyState = document.getElementById("empty-state");
const formMessage = document.getElementById("form-message");
const dateInput = document.getElementById("expense-date");
const state = { expenses: loadExpenses() };

initializeApp();

function initializeApp() {
  dateInput.value = getLocalDateString();
  form.addEventListener("submit", handleExpenseSubmit);
  expenseList.addEventListener("click", handleExpenseDelete);
  render();
}

function handleExpenseSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("expense-name").value.trim();
  const amountText = document.getElementById("expense-amount").value;
  const amount = Number(amountText);
  const category = document.getElementById("expense-category").value;
  const date = dateInput.value;

  if (!name) {
    showFormMessage("Please enter an expense name.", "error");
    return;
  }
  if (!amountText || !Number.isFinite(amount) || amount <= 0) {
    showFormMessage("Enter an amount greater than zero.", "error");
    return;
  }
  if (!category || !CATEGORIES.includes(category)) {
    showFormMessage("Please select a valid category.", "error");
    return;
  }
  if (!isValidDate(date)) {
    showFormMessage("Please choose a valid date.", "error");
    return;
  }

  const newExpense = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    amount: Math.round(amount * 100) / 100,
    category,
    date,
    createdAt: Date.now(),
  };

  state.expenses.push(newExpense);
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
  if (!saved) {
    showFormMessage("Expense deleted for this session, but browser storage is unavailable.", "error");
  }
}

function render() {
  const total = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = CATEGORIES.map((category) => ({
    category,
    amount: state.expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));
  const topCategory = categoryTotals.reduce(
    (largest, item) => item.amount > largest.amount ? item : largest,
    { category: "No data", amount: 0 }
  );
  const now = new Date();
  const monthlyTotal = state.expenses.reduce((sum, expense) => {
    const [year, month] = expense.date.split("-").map(Number);
    return year === now.getFullYear() && month === now.getMonth() + 1
      ? sum + expense.amount
      : sum;
  }, 0);

  document.getElementById("total-expenses").textContent = formatCurrency(total);
  document.getElementById("transaction-count").textContent =
    `${state.expenses.length} transaction${state.expenses.length === 1 ? "" : "s"}`;
  document.getElementById("top-category").textContent = topCategory.amount > 0
    ? topCategory.category
    : "No data";
  document.getElementById("top-category-amount").textContent = formatCurrency(topCategory.amount);
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
  emptyState.classList.toggle("hidden", state.expenses.length > 0);

  // Compare ISO date strings (YYYY-MM-DD) to show the latest expense dates first.
  const sortedExpenses = [...state.expenses].sort((a, b) =>
    b.date.localeCompare(a.date) || b.createdAt - a.createdAt
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

function loadExpenses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((expense) =>
      expense &&
      typeof expense.id === "string" &&
      typeof expense.name === "string" &&
      CATEGORIES.includes(expense.category) &&
      isValidDate(expense.date) &&
      Number.isFinite(expense.amount) &&
      expense.amount > 0
    ).map((expense) => ({
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
  const localOffset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - localOffset).toISOString().slice(0, 10);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}
