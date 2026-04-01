const { calculateUserFinancialPosition } = require('../models/record.model');
const { db } = require('../config/db');

// Financial aggregation is computed at DB level to improve performance and reduce memory overhead
const fetchNetBalance = async () => {
  const result = await calculateUserFinancialPosition();
  return result;
};

const computeCategoryInsights = () => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT category, SUM(amount) as total
      FROM records
      WHERE deletedAt IS NULL
      GROUP BY category
    `, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const computeMonthlySummary = () => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT strftime('%Y-%m', date) as month,
             SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) as income,
             SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) as expense,
             SUM(CASE WHEN type='Income' THEN amount ELSE -amount END) as netBalance
      FROM records
      WHERE deletedAt IS NULL
      GROUP BY month
      ORDER BY month DESC
    `, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};
// Aggregations are executed at the database level to reduce application-layer computation
// and improve performance for large datasets.

module.exports = { fetchNetBalance, computeCategoryInsights, computeMonthlySummary };
