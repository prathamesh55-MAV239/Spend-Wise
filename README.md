<div align="center">

# SpendWise

### A clearer picture of where your money goes.

A lightweight, privacy-minded expense tracker for recording everyday spending, understanding monthly and category totals, finding transactions, and exporting a PDF report.

[**Open the live app →**](https://prathamesh55-MAV239.github.io/Spend-Wise/)

<br />

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=111827)
![No build step](https://img.shields.io/badge/build-no%20build%20step-16a085?style=flat-square)
![License: MIT](https://img.shields.io/badge/license-MIT-2563eb?style=flat-square)

</div>

---

## At a glance

SpendWise keeps personal expense tracking simple: add a transaction, see your totals update, and explore spending by category. It runs in the browser with plain HTML, CSS, and JavaScript—no account or application server required.

- **Private by design:** Expense records and your theme preference are saved in your browser's local storage.
- **Useful at a glance:** Review all-time expenditure, this month's total, and your highest-spend category.
- **Easy to explore:** Search transactions and filter by category.
- **Ready to take with you:** Generate a PDF overview of your spending.
- **Comfortable to use:** Responsive layout with light and dark themes.

## Try it

Visit the [SpendWise live demo](https://prathamesh55-MAV239.github.io/Spend-Wise/)—no installation or account required.

## Run locally

SpendWise has no package installation or build step. You need Git and a modern browser. Serving the files locally with Python is optional but recommended.

```bash
git clone https://github.com/prathamesh55-MAV239/Spend-Wise.git
cd Spend-Wise
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser. If Python is unavailable, you can open `index.html` directly.

To stop the local server, press `Ctrl+C` in the terminal.

## How to use

1. **Add an expense** with a description, amount, category, and date. Amounts must be positive and may have up to two decimal places.
2. **Review your dashboard** for total expenditure, spending this calendar month, and the top category.
3. **Explore your history** by searching expense descriptions or selecting a category.
4. **Change the appearance** with the theme control; SpendWise can also follow your system's preferred color scheme until you choose a theme yourself.
5. **Export a report** with **Download PDF**. The report includes summary totals, a category breakdown, and up to 50 transactions. If PDF generation is unavailable, the app offers the browser print dialog as a fallback.
6. **Remove an entry** with its **Delete** button.

## Privacy and data

Expense data is stored in the browser's `localStorage` on the device and browser where you use SpendWise. It is not synced to an account or server, so it will not automatically appear on another device or browser. Clearing this site's browser data can remove saved expenses and preferences; consider saving a PDF report if you need a separate record.

| Storage key | Contents |
| --- | --- |
| `spendwise-expenses` | Expense records, including description, amount, category, date, and creation time |
| `spendwise-theme` | Your selected `dark` or `light` theme, when set |

The app also loads DM Sans and Manrope from Google Fonts when a network connection is available. The expense records themselves remain in browser storage.

## Project structure

```text
Spend-Wise/
├── index.html             # App structure and accessible interface
├── style.css              # Layout, themes, responsive styling, and print styles
├── script.js              # Expense data, summaries, filtering, and PDF export
├── html2pdf.bundle.min.js # Bundled client-side PDF generation library
├── LICENSE                # MIT License
└── README.md              # Project documentation
```

## Built with

- **HTML5** for semantic page structure and form controls
- **CSS3** for responsive layouts, theme styles, and print presentation
- **Vanilla JavaScript** for app behavior and browser storage
- **html2pdf.js bundle** for client-side PDF report generation

## Deploy with GitHub Pages

This is a static site and does not require a build command.

1. Push or fork the repository to GitHub.
2. Open **Settings → Pages** for the repository.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.

GitHub Pages will publish the site at the URL shown in the Pages settings.

## Contributing

Bug reports, ideas, and pull requests are welcome. For a change, fork the repository, create a focused branch, make and test your update in a browser, then open a pull request describing what changed.

## License

SpendWise is distributed under the [MIT License](LICENSE).

---

<div align="center">

**SpendWise** · Simple tracking. Smarter choices.

</div>
