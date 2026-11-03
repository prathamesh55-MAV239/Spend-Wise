# SpendWise

**Track your money. Manage your future.**

A responsive personal expense tracker built with HTML, CSS, and vanilla JavaScript. Expenses stay in your browser: no account, framework, paid API, or backend is needed.

## Features

- Add expenses with a name, amount, category, and date
- Food, Travel, Education, Shopping, and Other categories
- Lifetime and current-month spending summaries, plus top category
- Visual category totals; search and category filters for transaction history
- Newest-first history and individual delete actions
- LocalStorage persistence, rupee formatting, input validation, and responsive layout

## Files

- `index.html` — dashboard layout and accessible controls
- `style.css` — visual styling and responsive layouts
- `script.js` — validation, summaries, filters, and LocalStorage

## Run locally

The server must be started **from the directory containing `index.html`**. In the terminal, change to your project folder first, then run one of these commands:

**Windows (Python launcher):**

```powershell
cd path\to\Spend-Wise
py -m http.server 8000
```

If `py` is not recognized, try `python -m http.server 8000`. On macOS/Linux, use `python3 -m http.server 8000`.

Then open <http://localhost:8000> (or <http://127.0.0.1:8000>) in your browser. Keep the terminal open while using the site. Stop the server with `Ctrl+C`.

### If localhost does not open

- Confirm the terminal's current directory contains `index.html`, `style.css`, and `script.js`. Run `dir` in Windows PowerShell or `ls` in macOS/Linux to check.
- If the command is missing, install Python or use the VS Code **Live Server** extension: open `index.html`, right-click, choose **Open with Live Server**.
- If port 8000 is already in use, start another port, for example `py -m http.server 8001`, then visit <http://localhost:8001>.
- A `404` page usually means the server was started in the wrong folder; stop it with `Ctrl+C`, `cd` to the folder containing `index.html`, and restart.
- If the page loads without styling or behavior, verify that `style.css` and `script.js` are beside `index.html`, then hard-refresh the browser.

## Use the app

1. Enter a description, positive amount, category, and date; choose **Add expense**.
2. Review totals and category breakdown.
3. Search by description or filter history by category.
4. Delete a transaction using its **Delete** button.
5. Refresh the page to confirm that entries persist.

## Data and privacy

Entries are stored in this browser's LocalStorage under `spendwise-expenses`. They are not uploaded or synchronized. Clearing site data or using another browser/device means the saved copy is not available there.

## Manual test checklist

- [ ] Add a valid expense and confirm summary and history update.
- [ ] Reject blank description, zero/negative amount, amount with more than 2 decimal places, and invalid date.
- [ ] Check category totals and current-month summary.
- [ ] Search and category filters work and can be cleared.
- [ ] Delete an entry and verify totals update.
- [ ] Refresh and verify persistence; delete all entries and check the empty state.
- [ ] Check mobile and desktop widths and browser console.

Interactive browser tests have not been run from this coding environment; use the checklist above to verify in your browser.

## GitHub Pages

To publish, open the repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save. Once the deployment completes, GitHub Pages will show the live URL. The expected address is <https://prathamesh55-MAV239.github.io/Spend-Wise/> if Pages is enabled for this repository.

## License

See [LICENSE](LICENSE).
