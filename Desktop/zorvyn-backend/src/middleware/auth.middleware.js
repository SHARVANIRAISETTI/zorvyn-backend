const { findById } = require('../models/user.model');
const { AppError } = require('../utils/error.utils');

const auth = async (req, res, next) => {
  try {
    const token = req.headers['x-user-id'] || req.headers['authorization'];
    if (!token) throw new AppError(401, 'Unauthorized');

    const userId = Number(token);
    if (!userId) throw new AppError(401, 'Invalid token');

    const user = await findById(userId);
    if (!user) throw new AppError(401, 'User not found');

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
