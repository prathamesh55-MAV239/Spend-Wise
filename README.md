# SpendWise

**Track your money. Manage your future.**

SpendWise is a responsive, beginner-friendly personal expense tracker built with HTML, CSS, and vanilla JavaScript. Expenses stay in your browser; no account, framework, paid API, or backend is required.

## Features

- Add expenses with a name, amount, category, and date
- Categories: Food, Travel, Education, Shopping, and Other
- See lifetime total, current-month total, and highest-spending category
- Review category totals with visual bars
- Search by expense name and filter by category
- See transactions ordered by date, newest first
- Delete individual expenses
- Save data in browser LocalStorage
- Validate names, positive amounts, decimal precision, categories, and dates
- Format amounts as Indian Rupees
- Responsive layout, accessible labels/status messages, and safe text rendering

## Project structure

```text
Spend-Wise/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
└── assets/           # optional screenshot and project images
```

## Run locally

No build step or dependencies are required.

```bash
git clone https://github.com/prathamesh55-MAV239/Spend-Wise.git
cd Spend-Wise
python -m http.server 8000
```

Open <http://localhost:8000> in your browser. You may also open `index.html` directly, but a local server is recommended for consistent browser storage behavior.

## Use the app

1. Enter an expense description, amount, category, and date.
2. Select **Add expense**; totals and the category breakdown update.
3. Search by description or filter history by category.
4. Select **Delete** beside an entry to remove it.
5. Refresh the page to check persistence.

## Data and privacy

Data is stored under the `spendwise-expenses` key in this browser's LocalStorage. Expenses are not uploaded or synchronized. Clearing site data or switching browsers/devices removes access to this browser's saved copy. Avoid using shared devices for private records.

## Testing checklist

Run these checks in a browser before presenting or deploying:

- [ ] Add a valid expense and verify total, category bar, and history update.
- [ ] Try a blank name, zero/negative amount, more than two decimal places, and invalid date; verify rejection.
- [ ] Add different categories and verify category and current-month totals.
- [ ] Search by partial name and filter by category; clear filters and confirm all entries return.
- [ ] Delete an expense and verify totals update.
- [ ] Refresh and confirm saved entries remain.
- [ ] Delete all entries and confirm the empty state returns.
- [ ] Check mobile and desktop widths and browser console.

Interactive browser tests have not been run as part of this repository update; please complete the checklist in a browser.

## Publish with GitHub Pages

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main` and the `/(root)` folder, then save.
4. Wait for deployment. GitHub Pages will show the published URL in Pages settings. The expected URL is <https://prathamesh55-MAV239.github.io/Spend-Wise/> once Pages is enabled and deployment succeeds.

This is a static site, so Pages needs no build command.

## Code overview

- `index.html`: accessible page structure and labeled form controls
- `style.css`: responsive layout, visual design, focus styles, and reduced-motion support
- `script.js`: validation, summaries, history filters, safe rendering, and LocalStorage

## Future ideas

- Edit expenses
- Optional monthly budgets
- CSV export/import
- Charts and dark theme

## License

See [LICENSE](LICENSE).
