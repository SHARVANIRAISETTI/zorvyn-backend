const router = require('express').Router();
const { calculateUserFinancialPosition, getMonthlySummary } = require('../controllers/aggregation.controller');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

router.get('/net-balance', auth, authorize(['Admin', 'Analyst', 'Viewer']), calculateUserFinancialPosition);
router.get('/monthly-summary', auth, authorize(['Admin', 'Analyst', 'Viewer']), getMonthlySummary);

module.exports = router;
