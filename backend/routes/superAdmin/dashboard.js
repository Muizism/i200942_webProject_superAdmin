const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Assuming you have some function to get dashboard stats
const { getDashboardStats } = require('../../controllers/dashboardController');

router.get('/', getDashboardStats);

module.exports = router;
