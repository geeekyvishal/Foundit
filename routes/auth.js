const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/login-failed' }),
    (req, res) => {
        res.redirect('/index');
    }
);

router.get('/login-failed', (req, res) => {
    res.render('index', { message: 'Only @iiitn.ac.in emails are allowed' });
});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
