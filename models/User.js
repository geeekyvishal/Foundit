const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    items: [
        {
            type: {
                type: String, 
                required: true
            },
            description: {
                type: String,
                required: true
            },
            photo: {
                type: String,  
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
