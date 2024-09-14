const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');

dotenv.config();
require('./config/passport')(passport);

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');

const app = express();

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/', itemRoutes);

// app.js

app.get('/index', async (req, res) => {
    try {
        const lostItems = [];
        const foundItems = [];

        // Fetch all users and their items (no need for authentication to view items)
        const users = await User.find();

        users.forEach(user => {
            user.items.forEach(item => {
                if (item.type === 'Lost') {
                    lostItems.push({ user, item });
                } else if (item.type === 'Found') {
                    foundItems.push({ user, item });
                }
            });
        });

        res.render('index', { user: req.user || null, lostItems, foundItems });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

app.get('/', (req, res) => {
    res.render('index', { user: req.user || null, lostItems: [], foundItems: [] });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
