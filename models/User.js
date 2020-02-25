const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    password: {
        type: String,
        required: true,
        max: 225,
        min:6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);