const Joi = require('joi');
const { AppError } = require('../utils/error.utils');
const { addRecord, retrieveUserTransactions, deleteRecord, calculateUserFinancialPosition } = require('../models/record.model');

const recordSchema = Joi.object({
  amount: Joi.number().strict().required().min(0.01),
  type: Joi.string().valid('Income', 'Expense').required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  notes: Joi.string().max(500).allow(null, ''),
});

const getRecords = async (req, res, next) => {
  try {
    const results = await retrieveUserTransactions();
    res.json({
      success: true,
      message: 'Transactions retrieved successfully',
      data: results
    });
  } catch (err) {
    next(err);
  }
};

const createRecord = async (req, res, next) => {
  try {
    const { error, value } = recordSchema.validate(req.body);
    if (error) throw new AppError(400, error.details[0].message);

    const newRecord = {
      userId: req.user.id,
      amount: value.amount,
      type: value.type,
      category: value.category,
      date: new Date(value.date).toISOString(),
      notes: value.notes || null,
      createdAt: new Date().toISOString(),
    };

    const saved = await addRecord(newRecord);
    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: saved
    });
  } catch (err) {
    next(err);
  }
};

const removeRecord = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new AppError(400, 'Invalid record id');
    const removed = await deleteRecord(id);
    if (!removed) throw new AppError(404, 'Record not found');
    res.json({
      success: true,
      message: 'Record deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecords, createRecord, deleteRecord: removeRecord };
