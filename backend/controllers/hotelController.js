const Hotel = require('../models/hotel');

exports.getAllhotels = async (req, res) => {
    try {
        const hotels = await hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.gethotel = async (req, res) => {
    try {
        const hotel = await hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ error: 'hotel not found' });
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createhotel = async (req, res) => {
    try {
        console.log(req.body);
        const{name,addresss,rooms,rating}=req.body;
        const newhotel = new Hotel({ 
            name,
            address,
            rooms,
            rating
        });
        const savedhotel = await newhotel.save();
        res.status(201).json(savedhotel);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updatehotel = async (req, res) => {
    try {
        const updatedhotel = await hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedhotel) return res.status(404).json({ error: 'hotel not found' });
        res.status(200).json(updatedhotel);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deletehotel = async (req, res) => {
    try {
        const hotel = await hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ error: 'hotel not found' });
        await hotel.remove();
        res.status(200).json({ message: 'hotel deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
