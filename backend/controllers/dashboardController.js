const Admin = require('../models/admin');
const User = require('../models/user');
const Hotel = require('../models/hotel');

exports.getDashboardStats = async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        const userCount = await User.countDocuments();
        const hotelCount = await Hotel.countDocuments();
        

        res.status(200).json({
            adminCount,
            userCount,
            hotelCount
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
