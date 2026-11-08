<div align="center">

# SpendWise

### See your spending clearly. Make your money go further.

A lightweight, privacy-minded expense tracker for recording everyday spending, spotting category trends, and downloading a PDF overview — right in your browser.

[**Open the live app →**](https://prathamesh55-MAV239.github.io/Spend-Wise/)

<br />

[![Live demo](https://img.shields.io/badge/Live%20demo-GitHub%20Pages-2563eb?style=for-the-badge&logo=github&logoColor=white)](https://prathamesh55-MAV239.github.io/Spend-Wise/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Vanilla JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e?style=flat-square)](LICENSE)

</div>

---

## At a glance

| | |
|---|---|
| **Purpose** | Record personal expenses and understand spending patterns |
| **Built with** | HTML, CSS, and vanilla JavaScript |
| **Storage** | Browser `localStorage` — no account or app backend |
| **Currency** | Indian rupees (INR) |
| **Setup** | Static site; no build step or package manager |

## What you can do

- **Record expenses** with a name, amount, category, and date.
- **Review your totals** including all-time spending, spending this calendar month, and your highest-spend category.
- **Explore category totals** across Food, Travel, Education, Shopping, and Other.
- **Find transactions** by searching names and filtering by category.
- **Remove entries** you no longer want to keep.
- **Choose a theme** with light and dark modes; the app can follow your system preference until you choose one.
- **Download a PDF overview** with summary figures, category totals, and up to 50 recent transactions. If PDF generation is unavailable, the app offers the browser print dialog.

## Get started

### Use the hosted app

Visit [SpendWise on GitHub Pages](https://prathamesh55-MAV239.github.io/Spend-Wise/) in a modern browser. Your records are saved in that browser on that device; they do not automatically sync to another browser or device.

### Run it locally

Clone the repository and serve the project directory with any static web server:

```bash
git clone https://github.com/prathamesh55-MAV239/Spend-Wise.git
cd Spend-Wise
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). You can also open `index.html` directly, though using a local server is generally more reliable.

There is no dependency installation or build command. The PDF library is included in the repository as `html2pdf.bundle.min.js`.

## How it works

1. Add an expense using the entry form. Amounts must be positive and may have up to two decimal places.
2. SpendWise updates the dashboard and category breakdown from your saved records.
3. Search or filter the transaction list to find an entry; delete individual entries from the list.
4. Export an overview as a PDF when you want a portable snapshot.

The app formats amounts as INR and uses the expense date to calculate the current calendar month's total.

## Privacy and data

SpendWise does not require an account and has no application backend. Expense records and your chosen theme are stored in the browser's `localStorage` under the keys `spendwise-expenses` and `spendwise-theme`.

- Data is local to the browser profile where you entered it; it is **not encrypted by SpendWise**, backed up, or synchronized across devices.
- Clearing site data or browser storage can permanently remove your records. Export a PDF if you need a separate report, and keep your own backup if your records matter.
- The page loads its typefaces from Google Fonts, which means the browser contacts Google to retrieve those fonts. This is separate from expense storage.
- PDF generation happens in the browser using the bundled `html2pdf` library. The generated report contains personal transaction details, so store and share it with care.

## Project layout

```text
Spend-Wise/
├── index.html              # App structure and form
├── style.css               # Layout, responsive styling, and themes
├── script.js               # Expense state, summaries, filtering, and PDF export
├── html2pdf.bundle.min.js  # Bundled PDF-generation library
├── LICENSE                 # MIT License
└── README.md               # Project documentation
```

## Deployment

SpendWise is a static site and is published with GitHub Pages. To configure deployment for a fork, open **Settings → Pages**, choose the branch containing the site and the repository root as the source, then save. GitHub Pages will provide the published URL when deployment is ready.

## Contributing

Bug reports, thoughtful suggestions, and pull requests are welcome. For a change:

1. Fork the repository and create a focused branch.
2. Make and test the change in a browser, including a narrow/mobile viewport where relevant.
3. Open a pull request with a concise description of the change and how you tested it.

## License

Distributed under the [MIT License](LICENSE). See the license file for details.

---

<div align="center">

**SpendWise** · Simple tracking. Smarter choices.

</div>
