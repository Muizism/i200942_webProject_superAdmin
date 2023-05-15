const express = require('express');
const router = express.Router();
const hotelController = require('../../controllers/hotelController');
const auth = require('../../middleware/auth');

// Route to get all hotels
router.get('/hotels',auth.superAdminAuth, hotelController.getAllhotels);

// Route to get a specific hotel by ID
router.get('/hotels/:id',auth.superAdminAuth, hotelController.gethotel);

// Route to create a new hotel
router.post('/hotels',auth.superAdminAuth, hotelController.createhotel);

// Route to update an existing hotel by ID
router.put('/hotels/:id',auth.superAdminAuth, hotelController.updatehotel);

// Route to delete a hotel by ID
router.delete('/hotels/:id',auth.superAdminAuth, hotelController.deletehotel);

module.exports = router;
