const Jimp = require('jimp');

const watermark = new Jimp('./src/assets/watermark.png');

async function addWatermarkToImage(screen_name, profile_image_url) {
    Jimp.read(profile_image_url)
        .then(lenna => {
            return lenna
                .cover(720, 720)
                .quality(100)
                .greyscale()
                .composite(watermark, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacitySource: 1,
                    opacityDest: 0.9
                })
                .writeAsync(`./src/outputs/${screen_name}.jpg`);
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = { addWatermarkToImage };