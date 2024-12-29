const express = require('express');

const twitterClient = require('./services/twitterClient');
const imageProcessing = require('./utils/imageProcessing');

const routes = express.Router();

routes.get('/requestImage/:screen_name', async (req, res) => {
    try {
        const { screen_name } = req.params;
        const { profile_image_url } = await twitterClient.get('users/show', { screen_name });

        const fileName = await imageProcessing.addWatermarkToImage(screen_name.toLowerCase(), profile_image_url.replace('normal', '400x400'));

        return res.json({ fileName });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

module.exports = routes;