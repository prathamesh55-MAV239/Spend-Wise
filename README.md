# SpendWise

SpendWise is a clean and responsive personal expense tracker built with HTML, CSS, and vanilla JavaScript. It helps users track spending, review category totals, and keep data saved in the browser using LocalStorage.

Tagline: Track your money. Manage your future.

## Features

- Add expenses with name, amount, category, and date
- Categories: Food, Travel, Education, Shopping, Other
- Show total expenditure
- Display category-wise total spending
- Show latest expenses first in the history list
- Delete individual expenses
- Automatically save data in LocalStorage
- Helpful empty state when no expenses exist
- Input validation for invalid or negative values
- Indian Rupees (₹) currency formatting
- Responsive layout for desktop, tablet, and mobile

## Project Structure

spendwise/
- index.html
- style.css
- script.js
- README.md
- assets/
  - screenshot.png (add your own screenshot later)

## How to Run Locally

1. Open the project folder in VS Code.
2. Make sure all files are saved.
3. Open `index.html` in your browser.
4. Or use a local server if you prefer a better development experience:

   python -m http.server 8000

Then open:

http://localhost:8000

## Usage

1. Type the expense name.
2. Enter the amount in rupees.
3. Select a category.
4. Choose the date.
5. Click "Add Expense".
6. The dashboard updates automatically.
7. Use "Delete" to remove a single expense.

## Files Explained

- `index.html` — main app structure and dashboard layout
- `style.css` — styling, responsiveness, colors, cards, and layout
- `script.js` — expense logic, validation, totals, sorting, and LocalStorage handling

## LocalStorage Behavior

Your expense data is stored in the browser using LocalStorage, so it remains after a refresh. If the saved data is missing or corrupted, the app safely resets to an empty list instead of crashing.

## Testing Checklist

This project was built as an MVP and includes the following checks in logic:

- Add expense works
- Invalid or negative values are rejected
- Total expenditure updates correctly
- Category totals update correctly
- Delete expense works
- Data persists after refresh
- Empty state appears when no expenses exist
- Mobile layout remains usable
- No broken JavaScript syntax

## GitHub Upload Instructions

1. Open GitHub and create a new repository.
2. Name it something like `Spend-Wise`.
3. Do not initialize it with a README if you already have one locally.
4. In your terminal, run:

   git init
   git add .
   git commit -m "Initial commit: SpendWise MVP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main

5. Refresh your GitHub repository page to see the files.

## GitHub Pages Deployment

To publish the app using GitHub Pages:

1. Push the project to GitHub.
2. Open the repository on GitHub.
3. Go to Settings.
4. Click Pages in the left sidebar.
5. Under "Source", choose the main branch.
6. Keep the folder as `/root`.
7. Click Save.
8. GitHub will provide a live URL for your deployed app.

Example URL format:

https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/

## Notes for Beginners

This app is intentionally simple and beginner-friendly:

- HTML is used for structure
- CSS handles design and layout
- JavaScript adds the interactivity
- LocalStorage saves data in the browser without a backend

This keeps the project easy to learn while still working as a real expense tracker.

## Future Improvements

- Add monthly budget comparison
- Include editing functionality for expenses
- Add search and filter options
- Add charts for category spending
- Add dark mode
- Export/import data as CSV

## License

This project is available under the MIT License.
