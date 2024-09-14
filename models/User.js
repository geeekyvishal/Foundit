const mongoose = require('mongoose');
const cron = require('node-cron');

// Define the schema
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

const User = mongoose.model('User', UserSchema);

cron.schedule('*/1 * * *', async () => { 
    const oneWeekAgo = new Date(Date.now() -  7 * 24 * 60 * 60 * 1000); 

    try {
        await User.updateMany(
            {}, 
            { $pull: { items: { date: { $lt: oneWeekAgo } } } } 
        );
        console.log('Expired items (older than 1 week) removed');
    } catch (err) {
        console.error('Error removing expired items:', err);
    }
});

module.exports = User;
