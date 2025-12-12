// utils/expenseUtils.jsx

// --- Week helpers ---
function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun, 6 = Sat
  const diff = d.getDate() - day; // go back to Sunday
  const sod = new Date(d.setDate(diff));
  sod.setHours(0, 0, 0, 0);
  return sod;
}

function endOfWeek(date) {
  const sow = startOfWeek(date);
  const eow = new Date(sow);
  eow.setDate(sow.getDate() + 6);
  eow.setHours(23, 59, 59, 999);
  return eow;
}

// --- Month helpers ---
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

// --- Weekly comparison data ---
export function getWeekData(transactions = []) {
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const thisWeekStart = startOfWeek(today);
  const thisWeekEnd = endOfWeek(today);

  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setDate(thisWeekStart.getDate() - 1);
  const lastWeekStart = startOfWeek(lastWeekEnd);

  const thisWeek = Array(7).fill(0);
  const lastWeek = Array(7).fill(0);

  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    if (d >= thisWeekStart && d <= thisWeekEnd) {
      thisWeek[d.getDay()] += Number(tx.amount) || 0;
    } else if (d >= lastWeekStart && d <= lastWeekEnd) {
      lastWeek[d.getDay()] += Number(tx.amount) || 0;
    }
  });

  return { thisWeek, lastWeek, labels };
}

// --- Monthly comparison data ---
export function getMonthData(transactions = []) {
  const today = new Date();
  const thisMonthStart = startOfMonth(today);
  const thisMonthEnd = endOfMonth(today);

  const lastMonthEnd = new Date(thisMonthStart);
  lastMonthEnd.setDate(thisMonthStart.getDate() - 1);
  const lastMonthStart = startOfMonth(lastMonthEnd);

  const daysInThisMonth = thisMonthEnd.getDate();
  const labels = Array.from({ length: daysInThisMonth }, (_, i) => `${i + 1}`);

  const thisMonth = Array(daysInThisMonth).fill(0);
  const lastMonth = Array(lastMonthEnd.getDate()).fill(0);

  transactions.forEach((tx) => {
    const d = new Date(tx.date);

    if (d >= thisMonthStart && d <= thisMonthEnd) {
      const dayIndex = d.getDate() - 1;
      thisMonth[dayIndex] += Number(tx.amount) || 0;
    } else if (d >= lastMonthStart && d <= lastMonthEnd) {
      const dayIndex = d.getDate() - 1;
      lastMonth[dayIndex] += Number(tx.amount) || 0;
    }
  });

  return { thisMonth, lastMonth, labels };
}

// --- Category summary for breakdown cards ---
export function getCategorySummary(category, transactions = []) {
  const today = new Date();
  const thisWeekStart = startOfWeek(today);
  const thisWeekEnd = endOfWeek(today);

  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setDate(thisWeekStart.getDate() - 1);
  const lastWeekStart = startOfWeek(lastWeekEnd);

  let totalThisWeek = 0;
  let totalLastWeek = 0;
  const recent = [];

  transactions.forEach((tx) => {
    if (tx.category !== category) return;
    const d = new Date(tx.date);

    if (d >= thisWeekStart && d <= thisWeekEnd) {
      totalThisWeek += Number(tx.amount) || 0;
      recent.push(tx);
    } else if (d >= lastWeekStart && d <= lastWeekEnd) {
      totalLastWeek += Number(tx.amount) || 0;
    }
  });

  const changePercent =
    totalLastWeek === 0
      ? totalThisWeek > 0
        ? 100
        : 0
      : Math.round(((totalThisWeek - totalLastWeek) / totalLastWeek) * 100);

  return {
    total: totalThisWeek,
    changePercent,
    recent: recent
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 2),
  };
}
