const { AppError } = require('../utils/error.utils');

const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const role = req.user?.role;
      if (!role) throw new AppError(403, 'Forbidden');
      if (!allowedRoles.includes(role)) throw new AppError(403, 'Forbidden');
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = authorize;
