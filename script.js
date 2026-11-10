// ==========================================
// 1. WORK WITH MULTIPLE RECORDS (ARRAYS)
// ==========================================
// Initialize an empty global array to store all budget/expense items
let expenses = [];
let budgetLimit = 0;

// Cache DOM Elements for clean manipulation
const budgetForm = document.getElementById("budget-form");
const expenseForm = document.getElementById("expense-form");
const budgetInput = document.getElementById("budget-amount");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");

// Dashboard Cards to Update Dynamically
const totalBudgetCard = document.getElementById("total-budget-display");
const totalExpensesCard = document.getElementById("total-expenses-display");
const balanceCard = document.getElementById("balance-display");
const alertCard = document.getElementById("status-alert-display");
const expenseListContainer = document.getElementById("expense-list-rows");

// ==========================================
// 5. HANDLE USER INTERACTIONS (EVENTS)
// ==========================================

// Handle Budget Goal Setting
budgetForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page from refreshing
    
    const inputVal = parseFloat(budgetInput.value);
    
    // Simple Validation
    if (isNaN(inputVal) || inputVal <= 0) {
        alert("Please enter a valid budget amount.");
        return;
    }
    
    budgetLimit = inputVal;
    updateDashboard();
    budgetForm.reset();
});

// Handle Adding a New Expense Record
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page from refreshing
    
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;
    
    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please fill out all fields with valid data.");
        return;
    }
    
    // Create an object structure for our record collection
    const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };
    
    // Push new item into the array collection
    expenses.push(newExpense);
    
    // Sync backend updates to visual dashboard
    updateDashboard();
    expenseForm.reset();
});

// ==========================================
// 3. PROCESS DATA WITH LOOPS & 4. DOM UPDATES
// ==========================================
function updateDashboard() {
    let totalExpenses = 0;
    
    // Clear out the current UI table rows to prevent duplicating data views
    expenseListContainer.innerHTML = "";
    
    // Loop through the records array to compute aggregates and build view items
    for (let i = 0; i < expenses.length; i++) {
        const item = expenses[i];
        totalExpenses += item.amount;
        
        // Dynamically create a new table row element in memory
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td><span class="category-badge">${item.category}</span></td>
            <td>Ksh ${item.amount.toFixed(2)}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${item.id})">Remove</button></td>
        `;
        
        // Append row directly into the webpage document layout tree
        expenseListContainer.appendChild(row);
    }
    
    // Calculate final operational layout properties
    const balance = budgetLimit - totalExpenses;
    
    // Modify visual text values inside dashboard presentation nodes
    totalBudgetCard.textContent = `Ksh ${budgetLimit.toFixed(2)}`;
    totalExpensesCard.textContent = `Ksh ${totalExpenses.toFixed(2)}`;
    balanceCard.textContent = `Ksh ${balance.toFixed(2)}`;
    
    // ==========================================
    // 2. IMPLEMENT DECISION MAKING (CONDITIONALS)
    // ==========================================
    if (budgetLimit === 0) {
        alertCard.textContent = "Set a budget limit to track your standing.";
        alertCard.className = "alert-neutral";
    } else if (totalExpenses > budgetLimit) {
        alertCard.textContent = "Warning: Budget Limit Exceeded! Reduce spending.";
        alertCard.className = "alert-danger";
    } else if (totalExpenses >= budgetLimit * 0.8) {
        alertCard.textContent = "Alert: You have spent over 80% of your allocated budget.";
        alertCard.className = "alert-warning";
    } else {
        alertCard.textContent = "Good Standing: Your spending is within healthy boundaries.";
        alertCard.className = "alert-success";
    }
}

// Helper utility to clear a transaction record out of memory array matching an item ID
window.deleteExpense = function(id) {
    expenses = expenses.filter(item => item.id !== id);
    updateDashboard();
};
