const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
        },
    ],
    rating: {
        type: Number,
        default: 0
    },
     
});

const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;