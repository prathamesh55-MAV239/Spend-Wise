# SpendWise

**Track your money. Manage your future.**

SpendWise is a responsive, beginner-friendly personal expense tracker built with HTML, CSS, and vanilla JavaScript. It records expenses in your browser, summarizes spending, and needs no account, framework, paid API, or backend.

## Features

- Add an expense with a name, amount, category, and date
- Categories: Food, Travel, Education, Shopping, and Other
- See lifetime total, current-month total, and highest-spending category
- Review category totals with visual bars
- Search by expense name and filter by category
- See transactions ordered by date, newest first
- Delete individual expenses
- Save data in browser LocalStorage
- Validate names, positive amounts, decimal precision, categories, and dates
- Format amounts as Indian Rupees
- Responsive layout and accessible form labels/status messages
- Safe text rendering: user-provided expense names are inserted as text, not HTML

## Project structure

```text
Spend-Wise/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
└── assets/           # optional project images/screenshots
```

## Run locally

No build step or dependencies are required.

1. Clone the repository and enter its folder:

   ```bash
   git clone https://github.com/prathamesh55-MAV239/Spend-Wise.git
   cd Spend-Wise
   ```

2. Start a local static server (recommended):

   ```bash
   python -m http.server 8000
   ```

3. Open <http://localhost:8000> in your browser.

You can also open `index.html` directly, but a local server is a more consistent way to test browser storage and deployment behavior.

## How to use

1. Enter a short expense description, amount, category, and date.
2. Select **Add expense**. The totals and category breakdown update immediately.
3. Search by description or choose a category in the history filters.
4. Select **Delete** beside an entry to remove it.
5. Refresh the page to verify the remaining expenses persist.

### Data and privacy

Expenses are stored under the `spendwise-expenses` key in the current browser's LocalStorage. They are not uploaded or synchronized. Clearing site data or switching browsers/devices removes access to that browser's saved copy. Avoid using shared devices for private financial records.

## Test checklist

Manual browser checks to run before presenting or deploying:

- [ ] Add a valid expense and confirm the total, category bar, and history update.
- [ ] Try a blank name, zero/negative amount, amount with more than two decimals, and an invalid date; verify each is rejected.
- [ ] Add different categories and verify category totals and current-month total.
- [ ] Search by part of an expense name and filter by category; clear each filter and verify the full list returns.
- [ ] Delete an expense and verify totals update.
- [ ] Refresh and confirm saved entries remain.
- [ ] Delete all entries and confirm the empty state returns.
- [ ] Inspect the layout at narrow/mobile and desktop widths.
- [ ] Check the browser console for errors.

The repository tools do not provide a browser runtime, so these interactive checks have not been independently executed here. Please run the checklist in a browser before describing them as verified.

## Publish with GitHub Pages

1. Push your project branch to GitHub. To publish from `main`, merge the work into `main` first.
2. Open the repository **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose `main` and the `/(root)` folder, then save.
5. Wait for the Pages deployment to finish. GitHub displays the published URL in Pages settings. For this repository, it will generally be `https://prathamesh55-MAV239.github.io/Spend-Wise/`.

The site is static, so GitHub Pages can serve it without a build command.

## Git workflow

This project is maintained in GitHub. For a fresh local clone, use the commands above. To publish your own copy under a different repository, create that repository first, then set its URL as `origin` and push your branch.

## How the code is organized

- `index.html` contains the accessible page structure and labeled form controls.
- `style.css` provides the visual design, responsive layout, focus styles, and reduced-motion support.
- `script.js` validates form entries, updates the dashboard and filters, safely renders the history, and loads/saves LocalStorage data.

## Future ideas

- Edit existing expenses
- Optional monthly budgets
- CSV export/import
- Optional charts
- Dark theme

## License

See [LICENSE](LICENSE).
