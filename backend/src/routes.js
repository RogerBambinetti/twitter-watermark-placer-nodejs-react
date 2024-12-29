const express = require('express');

const TwitterClient = require('./services/twitterClient');
const { addWatermarkToImage } = require('./utils/imageProcessing');

const routes = express.Router();

routes.get('/requestImage', async (req, res) => {
    console.log('Generating image for user', req.query.screen_name);

    var { screen_name } = req.query;
    const { profile_image_url } = await TwitterClient.get('users/show', { screen_name });

    addWatermarkToImage(screen_name.toLowerCase(), profile_image_url.replace('normal', '400x400')).then(
        setTimeout(() => res.json({ link: `https://letslove-server.herokuapp.com/outputs/${screen_name}.jpg` }), 3000)
    );
});

module.exports = routes;