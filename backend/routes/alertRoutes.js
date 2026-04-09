const express = require('express');
const { createAlert, listAlerts } = require('../controllers/alertController');

const router = express.Router();

router.get('/', listAlerts);
router.post('/', createAlert);

module.exports = router;
