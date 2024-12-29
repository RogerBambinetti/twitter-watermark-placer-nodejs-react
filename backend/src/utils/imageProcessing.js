const { Jimp } = require('jimp');

async function addWatermarkToImage(screen_name, profile_image_url) {
    try {
        console.log('Adding watermark for user', screen_name);

        const watermark = await Jimp.read('./src/assets/watermark.png');
        const image = await Jimp.read(profile_image_url);

        image.cover({ w: 720, h: 720 })
            .greyscale()
            .composite(watermark, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacitySource: 1,
                opacityDest: 0.9
            });

        const fileName = `${screen_name}.jpg`;
        await image.write(`./src/outputs/${fileName}`);

        return fileName;
    } catch (error) {
        console.error('Error adding watermark:', error);
    }

}

module.exports = { addWatermarkToImage };