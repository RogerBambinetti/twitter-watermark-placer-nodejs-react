const express = require('express');

const T = require('./config/keys');
const imageProcessing = require('./utils/imageProcessing');

const routes = express.Router();

routes.get('/requestImage', async (req, res) => {
    console.log(req.query.screen_name);
    console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    var { screen_name } = req.query;
    screen_name = screen_name.toLowerCase();
    T.get('users/show', { screen_name }).then(response => {
        var { profile_image_url } = response;
        profile_image_url = profile_image_url.replace('normal', '400x400');
        imageProcessing(screen_name, profile_image_url).then(
            setTimeout(() => res.json({ link: `https://letslove-server.herokuapp.com/outputs/${screen_name}.jpg` }), 3000)
        );
    }
    ).catch(console.error);

});

module.exports = routes;