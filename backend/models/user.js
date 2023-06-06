const mongoose = require('mongoose');
//create a field for user type inside schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'superAdmin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
   
    loyaltyPoints: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
