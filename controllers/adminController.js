const Admin = require('../models/admin');


exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ error: 'Admin not found' });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) return res.status(404).json({ error: 'Admin not found' });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ error: 'Admin not found' });
        await admin.remove();
        res.status(200).json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
