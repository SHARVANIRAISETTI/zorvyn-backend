const { db } = require('../config/db');

const addRecord = (record) => {
  const { userId, amount, type, category, date, notes, createdAt } = record;
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO records (userId, amount, type, category, date, notes, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [userId, amount, type, category, date, notes, createdAt], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, ...record });
    });
  });
};

const getAllRecords = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM records WHERE deletedAt IS NULL';
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const deleteRecord = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE records SET deletedAt = ? WHERE id = ?';
    db.run(sql, [new Date().toISOString(), id], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return resolve(false);
      resolve(true);
    });
  });
};

const getNetBalance = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) as expense
      FROM records
      WHERE deletedAt IS NULL
    `;
    db.get(sql, [], (err, row) => {
      if (err) return reject(err);
      const income = row?.income || 0;
      const expense = row?.expense || 0;
      resolve({ income, expense, netBalance: income - expense });
    });
  });
};

module.exports = { addRecord, retrieveUserTransactions: getAllRecords, deleteRecord, calculateUserFinancialPosition: getNetBalance };
