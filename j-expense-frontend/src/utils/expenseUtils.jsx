// --- Week helpers ---
function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun, 6 = Sat
  const diff = d.getDate() - day; // go back to Sunday
  const sod = new Date(d.setDate(diff));
  sod.setHours(0, 0, 0, 0);
  console.log("[startOfWeek] input:", date, "=>", sod);
  return sod;
}

function endOfWeek(date) {
  const sow = startOfWeek(date);
  const eow = new Date(sow);
  eow.setDate(sow.getDate() + 6);
  eow.setHours(23, 59, 59, 999);
  console.log("[endOfWeek] input:", date, "=>", eow);
  return eow;
}

// --- Month helpers ---
function startOfMonth(date) {
  const som = new Date(date.getFullYear(), date.getMonth(), 1);
  console.log("[startOfMonth] input:", date, "=>", som);
  return som;
}

function endOfMonth(date) {
  const eom = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  console.log("[endOfMonth] input:", date, "=>", eom);
  return eom;
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

  console.log("[getWeekData] thisWeek:", thisWeekStart, "-", thisWeekEnd);
  console.log("[getWeekData] lastWeek:", lastWeekStart, "-", lastWeekEnd);

  const thisWeek = Array(7).fill(0);
  const lastWeek = Array(7).fill(0);

  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    console.log("[getWeekData] tx:", tx, "parsed date:", d);

    if (d >= thisWeekStart && d <= thisWeekEnd) {
      thisWeek[d.getDay()] += Number(tx.amount) || 0;
      console.log("  -> counted in thisWeek, day:", d.getDay(), "amount:", tx.amount);
    } else if (d >= lastWeekStart && d <= lastWeekEnd) {
      lastWeek[d.getDay()] += Number(tx.amount) || 0;
      console.log("  -> counted in lastWeek, day:", d.getDay(), "amount:", tx.amount);
    } else {
      console.log("  -> skipped (outside range)");
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

  console.log("[getMonthData] thisMonth:", thisMonthStart, "-", thisMonthEnd);
  console.log("[getMonthData] lastMonth:", lastMonthStart, "-", lastMonthEnd);

  const daysInThisMonth = thisMonthEnd.getDate();
  const labels = Array.from({ length: daysInThisMonth }, (_, i) => `${i + 1}`);

  const thisMonth = Array(daysInThisMonth).fill(0);
  const lastMonth = Array(lastMonthEnd.getDate()).fill(0);

  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    console.log("[getMonthData] tx:", tx, "parsed date:", d);

    if (d >= thisMonthStart && d <= thisMonthEnd) {
      const dayIndex = d.getDate() - 1;
      thisMonth[dayIndex] += Number(tx.amount) || 0;
      console.log("  -> counted in thisMonth, day:", dayIndex + 1, "amount:", tx.amount);
    } else if (d >= lastMonthStart && d <= lastMonthEnd) {
      const dayIndex = d.getDate() - 1;
      lastMonth[dayIndex] += Number(tx.amount) || 0;
      console.log("  -> counted in lastMonth, day:", dayIndex + 1, "amount:", tx.amount);
    } else {
      console.log("  -> skipped (outside range)");
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

  console.log("[getCategorySummary] category:", category);
  console.log("  thisWeek:", thisWeekStart, "-", thisWeekEnd);
  console.log("  lastWeek:", lastWeekStart, "-", lastWeekEnd);

  let totalThisWeek = 0;
  let totalLastWeek = 0;
  const recent = [];

  transactions.forEach((tx) => {
    console.log("[getCategorySummary] checking tx:", tx);

    if (tx.type !== "expense") {
      console.log("  -> skipped (not expense)");
      return;
    }

    const txCategory = tx.category || "Uncategorized";

    // ✅ Added normalization (case-insensitive + trim)
    const normalizedTxCategory = txCategory.trim().toLowerCase();
    const normalizedTargetCategory = category.trim().toLowerCase();

    if (normalizedTxCategory !== normalizedTargetCategory) {
      console.log("  -> skipped (category mismatch)", txCategory);
      return;
    }

    const d = new Date(tx.date);
    if (isNaN(d.getTime())) {
      console.log("  -> skipped (invalid date)", tx.date);
      return;
    }

    if (d >= thisWeekStart && d <= thisWeekEnd) {
      totalThisWeek += Number(tx.amount) || 0; // ✅ ensure numeric
      recent.push(tx);
      console.log("  -> counted in thisWeek, amount:", tx.amount);
    } else if (d >= lastWeekStart && d <= lastWeekEnd) {
      totalLastWeek += Number(tx.amount) || 0; // ✅ ensure numeric
      console.log("  -> counted in lastWeek, amount:", tx.amount);
    } else {
      console.log("  -> skipped (outside range)");
    }
  });

  const changePercent =
    totalLastWeek === 0
      ? totalThisWeek > 0
        ? 100
        : 0
      : Math.round(((totalThisWeek - totalLastWeek) / totalLastWeek) * 100);

  console.log("[getCategorySummary] result:", {
    total: totalThisWeek,
    changePercent,
    recent,
  });

  return {
    total: totalThisWeek,
    changePercent,
    recent: recent
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 2),
  };
}
