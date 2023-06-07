const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'Admin'],
        default: 'Admin'
    }
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
