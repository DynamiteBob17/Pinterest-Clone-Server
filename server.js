require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ghRoutes = require('./routes/gh_auth');
const publicRoutes = require('./routes/public');
const authMiddleware = require('./controllers/auth_middleware');
const authenticatedRoutes = require('./routes/authenticated');

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {}, (err) => {
    if (err) {
        console.log('Error connecting to MongoDB', err);
    } else {
        console.log('Connected to MongoDB');
    }
});

app.use('/auth', ghRoutes);
app.use('/public', publicRoutes);
app.use(authMiddleware);
app.use('/user', authenticatedRoutes);

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'bing chilling'
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
