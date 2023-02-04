require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { get } = require('lodash');
const { getGithubUser } = require('../controllers/gh_auth');

router.get('/github', async (req, res) => {
    const code = get(req, 'query.code');
    const path = get(req, 'query.path', '/');

    if (!code) {
        return res.redirect(process.env.ORIGIN);
    }

    try {
        const user = await getGithubUser(code);
        const token = jwt.sign(user, process.env.JWT_SECRET);

        res.redirect(process.env.ORIGIN + path + `?gh_jwt=${token}`);
    } catch (err) {
        res.redirect(process.env.ORIGIN);
    }
});

router.get('/me/:token', (req, res) => {
    const token = get(req, 'params.token');

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).send({
            user,
            token
        });
    } catch (err) {
        return res.status(401).send('Unauthorized');
    }
});

module.exports = router;
