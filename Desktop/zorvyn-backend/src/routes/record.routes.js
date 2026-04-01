const router = require('express').Router();
const { getRecords, createRecord, deleteRecord } = require('../controllers/record.controller');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

router.get('/', auth, authorize(['Admin', 'Analyst', 'Viewer']), getRecords);
router.post('/', auth, authorize(['Admin', 'Analyst']), createRecord);
router.delete('/:id', auth, authorize(['Admin']), deleteRecord);

module.exports = router;
