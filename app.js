const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

dotenv.config();
require('./config/passport')(passport);

const app = express();

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

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);

app.get('/', (req, res) => res.render('login'));
app.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('home', { user: req.user });
    } else {
        res.redirect('/');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

