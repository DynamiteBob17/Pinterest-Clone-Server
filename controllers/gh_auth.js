require('dotenv').config();
const axios = require('axios');

async function getGithubUser(code) {
    const token = await axios
        .post(
            'https://github.com/login/oauth/access_token'
            + `?client_id=${process.env.GH_CLIENT_ID}`
            + `&client_secret=${process.env.GH_CLIENT_SECRET}`
            + `&code=${code}`
        )
        .then(res => res.data)
        .catch(err => { throw err; });

    const accessToken = new URLSearchParams(token).get('access_token');

    return axios
        .get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(res => res.data)
        .catch(err => { throw err; });
}

module.exports = { getGithubUser };
