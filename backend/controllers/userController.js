//const User = require('../models/user');
const user = require('../models/user');

exports.getAllusers = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getuser = async (req, res) => {
    try {
        const user = await user.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'user not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createuser = async (req, res) => {
    console.log("Moiz is a crted user");
    try {
        const {name, email}=req.body;
        const u={name:name, email:email};
        const newuser = new user(u);
        console.log(newuser);
        const saveduser = await user.save();
        res.status(201).json(saveduser);
    } catch (error) {
        res.status(500).json("This is a 500 error");
    }
};

exports.updateuser = async (req, res) => {
    try {
        const updateduser = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateduser) return res.status(404).json({ error: 'user not found' });
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteuser = async (req, res) => {
    console.log(req.params.id);
    try {
        const user = await user.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json("it is a 404 error");
        
        res.status(200).json({ message: 'user deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
