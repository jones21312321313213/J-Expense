export const categoryMap = {
  1: "Food",
  2: "Transportation",
  3: "Entertainment",
  4: "Shopping",
  5: "Salary",        // income
  6: "Miscellaneous",
  7: "Grocery",
};

export function resolveCategory(t) {
  return categoryMap[t.categoryId] || "Uncategorized";
}
