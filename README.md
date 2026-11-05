<div align="center">

# SpendWise

<p align="center">
  <strong>Track every rupee. Understand where it goes.</strong>
</p>

<p align="center">
  <a href="https://prathamesh55-MAV239.github.io/Spend-Wise/">
    <img src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2563eb?style=for-the-badge&logo=github&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Storage-localStorage-10b981?style=flat-square" alt="LocalStorage" />
  <img src="https://img.shields.io/badge/License-MIT-111827?style=flat-square" alt="MIT License" />
</p>

</div>

SpendWise is a private, lightweight expense tracker built for people who want clarity over their money without creating an account, connecting a database, or trusting a bloated app.

It helps you log daily spending, monitor category trends, review monthly totals, and export a clean PDF summary — all directly in your browser.

---

## Why SpendWise?

Most finance apps either feel too noisy or too invasive. SpendWise keeps things simple:

- no sign-up required
- no backend or server dependency
- all data stays on the device you use
- instant summaries and category-wise insights
- a clean dashboard designed for quick decision-making

---

## Highlights

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>📊 Instant insights</h3>
      See total spending, current month spend, and your top category at a glance.
    </td>
    <td width="33%" valign="top">
      <h3>🔍 Smart filtering</h3>
      Search transactions and filter by category to find expenses in seconds.
    </td>
    <td width="33%" valign="top">
      <h3>📄 PDF export</h3>
      Generate a polished summary report with category totals and recent transactions.
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>🔒 Privacy-first</h3>
      Your expenses live in browser storage, not in a cloud database.
    </td>
    <td width="33%" valign="top">
      <h3>🌗 Beautiful UI</h3>
      Sleek dashboard styling with light and dark mode support.
    </td>
    <td width="33%" valign="top">
      <h3>⚡ Zero setup</h3>
      No build tools, no installation, no package manager required.
    </td>
  </tr>
</table>

---

## Live Demo

Open the app here:

[**Launch SpendWise**](https://prathamesh55-MAV239.github.io/Spend-Wise/)

---

## Features

- 💸 Add expenses with description, amount, category, and date
- 🧾 Track total expenditure and monthly spending
- 📈 Identify your top spending category automatically
- 🏷️ Group costs into Food, Travel, Education, Shopping, and Other
- 🔎 Search by transaction name and filter by category
- 🌙 Toggle between light and dark modes
- 📤 Export a PDF overview report for personal or review use
- 🛡️ Keep all data locally in the browser using `localStorage`

---

## Quick Start

### Run locally

```bash
git clone https://github.com/prathamesh55-MAV239/Spend-Wise.git
cd Spend-Wise
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If Python is not available, you can also open `index.html` directly in a browser.

---

## How it works

1. Enter a transaction with its name, amount, category, and date.
2. The app updates the total expenditure and monthly summary automatically.
3. You can filter or search your records to review spending history.
4. Use the PDF export button to download a snapshot of your budget overview.
5. Your information stays on your device and is not sent to a server.

---

## Project Structure

```text
Spend-Wise/
├── index.html               # Main UI and dashboard layout
├── style.css                # Modern styling, responsive layout, themes
├── script.js                # Logic for tracking expenses, totals, search, and PDF export
├── html2pdf.bundle.min.js   # PDF generation library
├── LICENSE                  # MIT license
├── README.md                # Project documentation
└── .gitignore               # Ignore editor/system files
```

---

## Privacy & Data Storage

SpendWise is intentionally private by design.

| Storage key | Purpose |
| --- | --- |
| `spendwise-expenses` | Stores the user's expense records locally in the browser |
| `spendwise-theme` | Stores the selected light/dark theme preference |

This means:

- no user accounts are required
- no backend/database is used
- data remains in the browser where it was created
- clearing browser data will remove saved local records

---

## Tech Stack

- HTML5 for app structure
- CSS3 for responsive design and themes
- Vanilla JavaScript for logic and state management
- `localStorage` for browser-side persistence
- `html2pdf` for PDF generation

---

## Deployment

This project is a static frontend and works well with GitHub Pages.

1. Push the repo to GitHub.
2. Open the repository settings.
3. Navigate to **Pages**.
4. Select the `main` branch and the root folder.
5. Save your settings.

GitHub Pages will publish the app automatically.

---

## Contributing

Contributions, ideas, and bug reports are welcome.

```bash
git checkout -b feature/my-improvement
# make your changes
git commit -m "Add my improvement"
git push origin feature/my-improvement
```

Then open a pull request on GitHub.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

<strong>SpendWise</strong><br>
Simple tracking. Smarter choices.

</div>
