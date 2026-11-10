# SpendWise Dashboard - Interactive Budget Tracker

SpendWise is a responsive, interactive financial tracking interface designed to help users establish explicit spending limits, enter immediate transactional categories, and visualize real-time structural budget status alerts.

## JavaScript Architecture Details

### 1. Project Enhancements
This week, static text values were replaced with dynamic logic engines. The page acts as a persistent single-page environment where structural summary totals and transaction history lists render on the fly without refreshing the page.

### 2. Decision Making via Conditionals
Conditional evaluation blocks (`if`, `else if`, `else`) are run dynamically every time items change. The logic monitors the total limits against current costs to instantly push visual style flags to the user:
- **Exceeded States (`totalExpenses > budgetLimit`)**: Swaps dashboard warning badges to red alerts.
- **Threshold Warnings (`>= 80%`)**: Triggers amber caution states to signal strict limits.
- **Healthy Limits**: Displays green assurance fields.

### 3. Data Collections using Arrays
Individual variables are avoided for transaction entries. Expenses are stored inside a global `expenses` array object collection. Each entry object captures distinct traits (`id`, `name`, `amount`, `category`). This structure isolates raw application state away from visual HTML elements.

### 4. DOM Manipulation
Webpage document tree adjustments are managed entirely via JavaScript APIs. Functions utilize `document.getElementById` to target critical layout tracking cards. Visual balances update safely using `textContent`, while historical table rows are structured in memory via `document.createElement()` and committed to the document tree through `.appendChild()`.

### 5. Event Handling
Interaction is handled via standard element hooks:
- `.addEventListener("submit")` intercepts form interactions.
- `event.preventDefault()` suppresses baseline form actions to bypass unneeded browser reloads.
- Inline `onclick` attributes route explicit item IDs to structural arrays for deletion tasks.

## Encountered Challenges & Resolutions
- **Problem**: Table lists duplicated records repeatedly every time a item was added.
- **Resolution**: Implemented an explicit `innerHTML = ""` clearance call at the