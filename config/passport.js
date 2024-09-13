const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();  

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        if (!email.endsWith('@iiitn.ac.in')) {
            return done(null, false, { message: 'Only iiitn domain emails are allowed' });
        }

        const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            email: email
        };
        
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id); 
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
    
};
