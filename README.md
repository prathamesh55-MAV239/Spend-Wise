const STORAGE_KEY = "spendwise-expenses";
const CATEGORY_COLORS = {
  Food: "#f97316",
  Travel: "#3b82f6",
  Education: "#8b5cf6",
  Shopping: "#ec4899",
  Other: "#14b8a6",
};

const CATEGORY_LIST = ["Food", "Travel", "Education", "Shopping", "Other"];

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const emptyState = document.getElementById("empty-state");
const formMessage = document.getElementById("form-message");
const dateInput = document.getElementById("expense-date");

const state = {
  expenses: loadExpenses(),
};

initializeApp();

function initializeApp() {
  if (!dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }

  form.addEventListener("submit", handleExpenseSubmit);
  expenseList.addEventListener("click", handleExpenseDelete);
  render();
}

function handleExpenseSubmit(event) {
  event.preventDefault();

  const expenseName = document.getElementById("expense-name").value.trim();
  const expenseAmount = Number(document.getElementById("expense-amount").value);
  const expenseCategory = document.getElementById("expense-category").value;
  const expenseDate = document.getElementById("expense-date").value;

  if (!expenseName) {
    showFormMessage("Please enter an expense name.", "error");
    return;
  }

  if (!Number.isFinite(expenseAmount) || expenseAmount <= 0) {
    showFormMessage("Amount must be greater than zero.", "error");
    return;
  }

  if (!expenseCategory || !CATEGORY_LIST.includes(expenseCategory)) {
    showFormMessage("Please select a valid category.", "error");
    return;
  }

  if (!expenseDate) {
    showFormMessage("Please choose a date.", "error");
    return;
  }

  const newExpense = {
    id: Date.now() + Math.random(),
    name: expenseName,
    amount: Number(expenseAmount.toFixed(2)),
    category: expenseCategory,
    date: expenseDate,
  };

  state.expenses.unshift(newExpense);
  saveExpenses();
  form.reset();
  dateInput.value = new Date().toISOString().split("T")[0];
  showFormMessage("Expense added successfully.", "success");
  render();
}

function handleExpenseDelete(event) {
  const deleteButton = event.target.closest("button[data-id]");

  if (!deleteButton) {
    return;
  }

  const id = Number(deleteButton.dataset.id);
  state.expenses = state.expenses.filter((expense) => Number(expense.id) !== id);
  saveExpenses();
  render();
}

function render() {
  const total = state.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const categoryTotals = CATEGORY_LIST.map((category) => ({
    category,
    amount: state.expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0),
  }));

  const topCategory = categoryTotals.reduce(
    (largest, item) => (item.amount > largest.amount ? item : largest),
    { category: "No data", amount: 0 }
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyTotal = state.expenses.reduce((sum, expense) => {
    const expenseDate = new Date(expense.date);
    if (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    ) {
      return sum + Number(expense.amount);
    }
    return sum;
  }, 0);

  updateSummaryCards(total, topCategory, monthlyTotal);
  renderCategorySummary(categoryTotals);
  renderExpenseList();
}

function updateSummaryCards(total, topCategory, monthlyTotal) {
  const totalElement = document.getElementById("total-expenses");
  const countElement = document.getElementById("transaction-count");
  const topCategoryElement = document.getElementById("top-category");
  const topCategoryAmount = document.getElementById("top-category-amount");
  const monthlyTotalElement = document.getElementById("monthly-total");

  totalElement.textContent = formatCurrency(total);
  countElement.textContent =
    state.expenses.length === 1
      ? "1 transaction"
      : `${state.expenses.length} transactions`;

  if (topCategory.amount > 0) {
    topCategoryElement.textContent = topCategory.category;
    topCategoryAmount.textContent = formatCurrency(topCategory.amount);
  } else {
    topCategoryElement.textContent = "No data";
    topCategoryAmount.textContent = formatCurrency(0);
  }

  monthlyTotalElement.textContent = formatCurrency(monthlyTotal);
}

function renderCategorySummary(categoryTotals) {
  const summaryContainer = document.getElementById("category-summary");
  summaryContainer.innerHTML = "";

  const maxAmount = Math.max(...categoryTotals.map((item) => item.amount), 1);

  categoryTotals.forEach((item) => {
    const row = document.createElement("div");
    row.className = "category-row";

    const topLine = document.createElement("div");
    topLine.className = "category-topline";

    const name = document.createElement("span");
    name.className = "category-name";

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.backgroundColor = CATEGORY_COLORS[item.category] || "#64748b";

    const label = document.createElement("span");
    label.textContent = item.category;

    name.append(dot, label);

    const amount = document.createElement("strong");
    amount.textContent = formatCurrency(item.amount);

    const progressWrap = document.createElement("div");
    progressWrap.className = "progress-bar";

    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.backgroundColor = CATEGORY_COLORS[item.category] || "#64748b";
    fill.style.width = `${(item.amount / maxAmount) * 100}%`;

    if (item.amount === 0) {
      fill.style.width = "0%";
    }

    progressWrap.appendChild(fill);
    topLine.append(name, amount);
    row.append(topLine, progressWrap);
    summaryContainer.appendChild(row);
  });
}

function renderExpenseList() {
  expenseList.innerHTML = "";

  if (state.expenses.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  const sortedExpenses = [...state.expenses].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  sortedExpenses.forEach((expense) => {
    const item = document.createElement("li");
    item.className = "expense-item";

    const mainInfo = document.createElement("div");
    mainInfo.className = "expense-main";

    const nameRow = document.createElement("div");
    nameRow.className = "expense-name-row";

    const name = document.createElement("span");
    name.className = "expense-name";
    name.textContent = expense.name;

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "category-pill";
    categoryBadge.style.backgroundColor = `${CATEGORY_COLORS[expense.category] || "#64748b"}22`;
    categoryBadge.style.color = CATEGORY_COLORS[expense.category] || "#475569";
    categoryBadge.textContent = expense.category;

    nameRow.append(name, categoryBadge);

    const meta = document.createElement("div");
    meta.className = "expense-meta";

    const date = document.createElement("span");
    date.textContent = formatDate(expense.date);

    meta.appendChild(date);

    mainInfo.append(nameRow, meta);

    const amount = document.createElement("strong");
    amount.className = "amount";
    amount.textContent = formatCurrency(expense.amount);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.dataset.id = String(expense.id);
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${expense.name}`);

    item.append(mainInfo, amount, deleteButton);
    expenseList.appendChild(item);
  });
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function loadExpenses() {
  try {
    const storedExpenses = localStorage.getItem(STORAGE_KEY);

    if (!storedExpenses) {
      return [];
    }

    const parsed = JSON.parse(storedExpenses);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (expense) =>
        expense &&
        typeof expense.name === "string" &&
        typeof expense.category === "string" &&
        typeof expense.date === "string" &&
        Number.isFinite(Number(expense.amount))
    );
  } catch (error) {
    console.warn("Local storage data could not be parsed. Resetting to an empty list.", error);
    return [];
  }
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
}
