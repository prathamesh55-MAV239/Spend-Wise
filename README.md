<div align="center">

  <h1>SpendWise</h1>

  <p><strong>Track your money. Manage your future.</strong></p>

  <p>A fast, private, and zero-dependency personal expense tracker built with native modern web standards.<br />Everything runs locally in your browser—no accounts, no backend, and no third-party tracking.</p>

  <p>
    <a href="https://prathamesh55-MAV239.github.io/Spend-Wise/">
      <img src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2f72e8?style=for-the-badge&logo=github&logoColor=white" alt="Live Demo" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Storage-LocalStorage-39bd91?style=flat-square" alt="LocalStorage" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License: MIT" />
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
  </p>

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Live Demo](#live-demo)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Run on Windows](#run-on-windows)
  - [Run on macOS & Linux](#run-on-macos--linux)
- [Project Architecture](#project-architecture)
- [Usage Guide](#usage-guide)
- [Data Storage & Privacy](#data-storage--privacy)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**SpendWise** is designed for individuals who want effortless and instant financial tracking without handing their private financial habits over to a remote cloud service or navigating bloated accounting software.

By leveraging pure HTML5, modern CSS3 custom properties, and vanilla ES6+ JavaScript, SpendWise delivers instantaneous page loads, zero runtime dependencies, and robust local persistence.

---

## Key Features

- 🌙 **Adaptive Dark & Light Theme**
  - Switch between light and dark themes at any time using the header toggle.
  - Automatically detects system preference (`prefers-color-scheme`).
  - Stores preference in `localStorage` with zero Flash of Unstyled Content (FOUC).
  - High-contrast, WCAG-conscious color palette engineered for clarity and eye comfort.

- 📥 **One-Click PDF Statement Export**
  - Download an executive overview report saved directly as a `.pdf` file to your PC.
  - Includes summary metrics (Total Expenditure, Monthly Total, Top Category), category percentage shares, and itemized transaction tables.
  - Bundled offline-ready engine with fallback support for standard browser printing.

- 📊 **Real-time Spending Intelligence**
  - Total expenditure counter with automatic Indian Rupee (`₹`) formatting.
  - Automatic calculation of current calendar month spending.
  - Dynamic identification of your top spending category with visual spend amounts.
  - Proportional category progress bars displaying relative financial allocations.

- 🔍 **Instant Search & Category Filtering**
  - Search transactions on-the-fly by title or notes.
  - Filter history by category (**Food**, **Travel**, **Education**, **Shopping**, **Other**).
  - Responsive empty states guide you when no entries or filter matches exist.

- 🔒 **100% Private by Design**
  - All expense entries are stored strictly on your device via browser `localStorage`.
  - Zero external database connections, zero telemetry, and zero tracking cookies.

- 📱 **Fully Responsive Layout**
  - Fluid mobile-first layout tested across mobile screens, tablets, laptops, and ultra-wide desktop monitors.
  - Accessible form controls with input validation and clear inline feedback.

---

## Live Demo

SpendWise can be hosted directly on GitHub Pages with zero server setup:

🔗 **[Launch SpendWise Live](https://prathamesh55-MAV239.github.io/Spend-Wise/)**

---

## Quick Start

### Prerequisites

You only need a modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari). Python is optional but convenient for serving files locally.

### Run on Windows

1. Open **Command Prompt** or **PowerShell**:
   ```bat
   git clone https://github.com/prathamesh55-MAV239/Spend-Wise.git
   cd Spend-Wise
   python -m http.server 8000
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```
3. Stop the server at any time with `Ctrl + C`.

> **Note:** If `python` is not recognized, try `py -m http.server 8000` or double-click `index.html` to open it directly in your browser.

### Run on macOS & Linux

```bash
git clone https://github.com/prathamesh55-MAV239/Spend-Wise.git
cd Spend-Wise
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## Project Architecture

```
Spend-Wise/
├── .gitignore              # Ignored operating system and editor cache files
├── index.html              # Accessible semantic layout and dashboard interface
├── style.css               # Design tokens, dark/light theme, and print stylesheets
├── script.js               # Reactive state, validation, filters, and PDF generator
├── html2pdf.bundle.min.js  # Offline-ready client-side PDF rendering library
├── LICENSE                 # MIT License terms
└── README.md               # Project documentation and specifications
```

---

## Usage Guide

1. **Record an Expense**:
   - Provide an item description (e.g., *"Grocery restocking"*).
   - Enter an amount (positive values up to 2 decimal places).
   - Select a relevant category and choose a date.
   - Click **Add expense**.

2. **Toggle Dark / Light Mode**:
   - Click the theme button in the upper-right corner of the topbar to switch between night and day modes.

3. **Export Your Financial Statement**:
   - Click **Download PDF** in the topbar to immediately generate and save a formatted spending report.

4. **Search and Filter**:
   - Use the search bar in the **Recent expenses** panel to find items by name.
   - Use the category dropdown to view transactions from a specific bucket.

5. **Delete Records**:
   - Click the **Delete** button next to any transaction to remove it and immediately update all metrics.

---

## Data Storage & Privacy

SpendWise stores records under the following keys in your browser's `window.localStorage`:

| Key | Type | Description |
| :--- | :--- | :--- |
| `spendwise-expenses` | `Array<Object>` | JSON array containing expense records (`id`, `name`, `amount`, `category`, `date`, `createdAt`) |
| `spendwise-theme` | `String` | User preference string (`"dark"` or `"light"`) |

*Your data never leaves your computer. Clearing your browser cache or site data will reset the application state.*

---

## Deployment

Deploying your own instance to **GitHub Pages** takes under 30 seconds:

1. Fork or push this repository to GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` and root `/`.
4. Click **Save**. GitHub will automatically provide a secure HTTPS link within 1–2 minutes.

---

## Contributing

Contributions, bug reports, and suggestions are welcome!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
