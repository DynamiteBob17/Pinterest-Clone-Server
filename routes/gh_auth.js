require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { get } = require('lodash');
const { getGithubUser } = require('../controllers/gh_auth');

const COOKIE_NAME = 'gh_jwt';

router.get('/github', async (req, res) => {
    const code = get(req, 'query.code');
    const path = get(req, 'query.path', '/');

    if (!code) {
        return res.redirect(process.env.ORIGIN);
    }

    try {
        const user = await getGithubUser(code);
        const token = jwt.sign(user, process.env.JWT_SECRET);

        res.cookie(COOKIE_NAME, token, {
            domain: process.env.CLIENT_DOMAIN,
            httpOnly: true
        });

        res.redirect(process.env.ORIGIN + path);
    } catch (err) {
        res.redirect(process.env.ORIGIN);
    }
});

router.get('/me', (req, res) => {
    const cookie = get(req, `cookies.${COOKIE_NAME}`);

    try {
        const user = jwt.verify(cookie, process.env.JWT_SECRET);

        return res.status(200).send(user);
    } catch (err) {
        return res.status(401).send('Unauthorized');
    }
});

module.exports = router;
