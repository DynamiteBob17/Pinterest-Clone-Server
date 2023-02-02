require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const userId = await request.headers.authorization.split(" ")[0];
        const token = await request.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        user.user_id = parseInt(user.user_id);

        if (parseInt(userId) !== user.user_id) {
            throw "err";
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            error: new Error("Unauthorized request!")
        });
    }
}
