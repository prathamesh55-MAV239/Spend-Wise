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

## Run locally on Windows

**Important:** Start the server from the project folder that contains `index.html`, `style.css`, and `script.js`. If the server is started in `C:\Users\YourName` instead, the browser may show a folder listing instead of SpendWise.

### If the project is not cloned yet (Command Prompt)

Open Command Prompt, then run:

```bat
cd /d "%USERPROFILE%"
git clone https://github.com/prathamesh55-MAV239/Spend-Wise.git
cd /d "%USERPROFILE%\Spend-Wise"
dir
py -m http.server 8000
```

Check that `dir` lists `index.html`, `style.css`, and `script.js`. Keep this window open and visit <http://localhost:8000> or <http://127.0.0.1:8000>. Stop the server with `Ctrl+C`.

If you already cloned the project somewhere else, do not clone it again. In Command Prompt, change to its actual folder first, for example:

```bat
cd /d "C:\Users\YourName\Documents\Spend-Wise"
dir
py -m http.server 8000
```

Replace that example path with the folder where your repository is saved. `Get-ChildItem` is a PowerShell command, not a Command Prompt command; use `dir` in Command Prompt.

### If `py` is not recognized or port 8000 is busy

- Try `python -m http.server 8000` if Python is installed but the Windows launcher is unavailable.
- If port 8000 is already occupied, use `py -m http.server 8001` and open <http://localhost:8001>.
- A `404` for `/` means the current server folder doesn't contain an `index.html`; stop it with `Ctrl+C`, `cd` into the project folder, and restart.
- A `404` for `/favicon.ico` alone is harmless and does not prevent the app from working.
- If the page loads without styling or behavior, confirm the three project files are together in the folder, then hard-refresh the browser.

## Run locally on macOS/Linux

From the cloned project directory, run:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000> and leave the terminal running while you use the app.

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
