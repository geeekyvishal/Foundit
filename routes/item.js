const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/add-item', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('add-item');
    } else {
        res.redirect('/');
    }
});

router.post('/add-item', upload.single('photo'), async (req, res) => {
    const { type,object, description } = req.body;
    const photoUrl = `/uploads/${req.file.filename}`;
    
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }

    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                items: { type,object, description, photo: photoUrl }
            }
        });
        res.redirect('/index');
    } catch (err) {
        console.error(err);
        res.redirect('/index');
    }
});

module.exports = router;
