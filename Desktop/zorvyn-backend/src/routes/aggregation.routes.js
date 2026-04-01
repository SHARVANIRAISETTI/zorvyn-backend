const router = require('express').Router();
const { getNetBalance } = require('../controllers/aggregation.controller');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

router.get('/net-balance', auth, authorize(['Admin', 'Analyst', 'Viewer']), getNetBalance);

module.exports = router;
