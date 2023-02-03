require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const userId = await req.headers.authorization.split(' ')[0];
        const token = await req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        user.id = parseInt(user.id);

        if (parseInt(userId) !== user.id) {
            throw 'err';
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            error: new Error('Unauthorized request!')
        });
    }
}
