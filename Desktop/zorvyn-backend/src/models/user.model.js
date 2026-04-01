const { db } = require('../config/db');

const registerNewUser = (user) => {
  const { name, email, password, role, createdAt } = user;
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (name, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [name, email, password, role, createdAt], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, ...user });
    });
  });
};

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ? AND active = 1', [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ? AND active = 1', [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

module.exports = { registerNewUser, findByEmail, findById };
