const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Assuming you have some function to get reports
const { getReports } = require('../../controllers/reportsController');

router.get('/',auth.superAdminAuth, getReports);

module.exports = router;
