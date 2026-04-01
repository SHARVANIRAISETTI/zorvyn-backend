const { AppError } = require('../utils/error.utils');
const { fetchNetBalance, computeMonthlySummary } = require('../services/aggregation.service');

const calculateUserFinancialPosition = async (req, res, next) => {
  try {
    const data = await fetchNetBalance();
    res.json({
      success: true,
      data: data
    });
  } catch (err) {
    next(new AppError(500, 'Failed to calculate financial position'));
  }
};

const getMonthlySummary = async (req, res, next) => {
  try {
    const data = await computeMonthlySummary();
    res.json({
      success: true,
      message: 'Monthly financial summary retrieved successfully',
      data: data
    });
  } catch (err) {
    next(new AppError(500, 'Failed to compute monthly summary'));
  }
};

module.exports = { calculateUserFinancialPosition, getMonthlySummary };
