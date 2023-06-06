const express = require('express');
const router = express.Router();
const hotelController = require('../../controllers/hotelController');
const auth = require('../../middleware/auth');

// Route to get all hotels
router.get('/hotels', hotelController.getAllhotels);

// Route to get a specific hotel by ID
router.get('/hotels/:id', hotelController.gethotel);

// Route to create a new hotel
router.post('/create', hotelController.createhotel);

// Route to update an existing hotel by ID
router.put('/hotels/:id', hotelController.updatehotel);

// Route to delete a hotel by ID
router.delete('/hotels/:id', hotelController.deletehotel);

module.exports = router;
