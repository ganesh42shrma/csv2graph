const categories = ["North", "South", "East", "West"]; // Categories for pie charts
const regions = ["Region A", "Region B", "Region C", "Region D"]; // Regions for profit pie chart
const expenseTypes = ["Marketing", "Operations", "R&D", "Sales"]; // Types for expense pie chart

// Dataset 1: Sales and Profit for line/bar graph
const salesProfitData = Array.from({ length: 100 }, (_, index) => {
  const year = 2018 + index;
  const sales = 1000 + Math.floor(Math.random() * 500);
  const profit = 200 + Math.floor(Math.random() * 100);
  return [year, sales, profit];
});
salesProfitData.unshift(["Year", "Sales", "Profit"]);

// Dataset 2: Revenue and Expense for line/bar graph
const revenueExpenseData = Array.from({ length: 100 }, (_, index) => {
  const year = 2018 + index;
  const revenue = 1500 + Math.floor(Math.random() * 800);
  const expense = 500 + Math.floor(Math.random() * 300);
  return [year, revenue, expense];
});
revenueExpenseData.unshift(["Year", "Revenue", "Expense"]);

// Dataset 3: Growth Percentage for line/bar graph
const growthPercentageData = Array.from({ length: 100 }, (_, index) => {
  const year = 2018 + index;
  const growth = parseFloat((Math.random() * 10).toFixed(2)); // Random growth percentage
  return [year, growth];
});
growthPercentageData.unshift(["Year", "Growth Percentage"]);

// Dataset 4: Sales by Category for pie chart
const salesByCategory = categories.map((category) => {
  const sales = 1000 + Math.floor(Math.random() * 5000);
  // Ensure category is treated as a string
  return [String(category), sales];
});
salesByCategory.unshift(["Category", "Sales"]);

// Dataset 5: Profit by Region for pie chart
const profitByRegion = regions.map((region) => {
  const profit = 500 + Math.floor(Math.random() * 2000);
  // Ensure region is treated as a string
  return [String(region), profit];
});
profitByRegion.unshift(["Region", "Profit"]);

// Dataset 6: Expenses by Type for pie chart
const expensesByType = expenseTypes.map((type) => {
  const expense = 1000 + Math.floor(Math.random() * 3000);
  // Ensure type is treated as a string
  return [String(type), expense];
});
expensesByType.unshift(["Type", "Expenses"]);

export {
  salesProfitData,
  revenueExpenseData,
  growthPercentageData,
  salesByCategory,
  profitByRegion,
  expensesByType,
};
