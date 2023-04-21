require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const ghRoutes = require('./routes/gh_auth');
const publicRoutes = require('./routes/public');
const authMiddleware = require('./controllers/auth_middleware');
const authenticatedRoutes = require('./routes/authenticated');

const app = express();

function listen(express) {
    const port = process.env.PORT || 8000;
    express.listen(port, () => console.log(`Listening on port ${port}`));
}

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: [process.env.ORIGIN],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(mongoSanitize);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {}, (err) => {
    if (err) {
        console.log('Error connecting to MongoDB', err);
    } else {
        console.log('Connected to MongoDB');
    }
}, listen(app));

app.use('/auth', ghRoutes);
app.use('/public', publicRoutes);

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'bing chilling'
    });
});

app.use(authMiddleware);
app.use('/user', authenticatedRoutes);

listen(app);
