const { AppError } = require('../utils/error.utils');
const { fetchNetBalance } = require('../services/aggregation.service');

const getNetBalance = async (req, res, next) => {
  try {
    const data = await fetchNetBalance();
    res.json(data);
  } catch (err) {
    next(new AppError(500, 'Failed to fetch net balance'));
  }
};

module.exports = { getNetBalance };
