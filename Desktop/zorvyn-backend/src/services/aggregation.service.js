const { getNetBalance } = require('../models/record.model');
const { db } = require('../config/db');

const fetchNetBalance = async () => {
  const result = await getNetBalance();
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

module.exports = { fetchNetBalance, computeCategoryInsights };
