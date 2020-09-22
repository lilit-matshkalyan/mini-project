const jimp = require('jimp');
const uuid = require('uuid');

const { IMAGES_PATH } = process.env;

const { replaceSpaceInString } = require('../../utils/helpers');


/**
 * Abstract Class ImageProcessingService
 */
class ImageProcessingService {
  /**
     *
     * @param images
     * @param productName
     * @returns {Promise.<string>}
     */
  static async mergeImages({ images, productName }) {
    const projectPath = process.env.PWD;

    const imagePromise = jimp.read(`${projectPath}/${images[0]}`);
    const image = await imagePromise;

    const watermarks = await Promise.all(
      images.slice(1, images.length).map(img => jimp.read(`${projectPath}${img}`))
    );

    watermarks.forEach((watermark) => {
      image.blit(watermark, 0, 0);
    });

    const imageId = uuid.v4();

    const imagePath = `${IMAGES_PATH}${imageId}-${replaceSpaceInString({ string: productName, replacement: '-' })}.png`;
    image.write(imagePath);


    return imagePath;
  }

  /**
     *
     * @param image
     * @param imageName
     * @param shapes
     * @returns {Promise.<void>}
     */
  static resizeAndWriteImage({ image, imageName, shapes }) {
    const { width, size } = shapes;
    const position = IMAGES_PATH.length;
    const newImageName = [imageName.slice(0, position), `${size}-`, imageName.slice(position)].join('');


    jimp.read(image, (err, data) => {
      if (err) throw err;
      data
        .resize(width, jimp.AUTO)
        .write(newImageName);
    });
  }
}
module.exports = ImageProcessingService;
