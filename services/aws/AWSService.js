const { SQS_QUEUE_URL, IMAGES_PATH } = process.env;
const AWS = require('aws-sdk');
const { IMAGE_SHAPES } = require('../../utils/constants');

// Load the AWS SDK for Node.js
// Set the region
AWS.config.update({ region: 'REGION' });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const ImageProcessingService = require('../../services/imageProcessing/ImageProcessingService');
const ProductService = require('../../services/product/ProductService');

/**
 * Abstract Class AWSService
 */
class AWSService {
  /**
   *
   * @param data
   * @returns {Promise<void>}
   */
  static async sendMessageToQueue({ data }) {
    const { storeId, products, watermarkImage } = data;

    const params = {
      // Remove DelaySeconds parameter and value for FIFO queues
      DelaySeconds: 10,
      MessageAttributes: {
        storeId: {
          DataType: 'String',
          StringValue: storeId
        },
        products: {
          DataType: 'String',
          StringValue: JSON.stringify(products)
        },
        watermarkImage: {
          DataType: 'String',
          StringValue: watermarkImage
        }
      },
      MessageBody: 'Information about updating products\' watermark with store\'s new watermark image',
      QueueUrl: SQS_QUEUE_URL
    };


    sqs.sendMessage(params, (error, ok) => {
      if (error) {
        console.log('Error', error);
      } else {
        console.log('Success', ok.MessageId);
      }
    });
  }

  /**
   *
   * @returns {Promise<void>}
   */
  static async receiveMessageFromQueue() {
    const queueURL = SQS_QUEUE_URL;

    const params = {
      AttributeNames: [
        'SentTimestamp'
      ],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: [
        'All'
      ],
      QueueUrl: queueURL,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0
    };

    await sqs.receiveMessage(params, async (err, data) => {
      if (err) {
        console.log('Receive Error', err);
      } else if (data.Messages) {
        for (let i = 0; i < data.Messages.length; i++) {
          const { MessageAttributes: { products, watermarkImage } } = data.Messages[i];

          const { StringValue: watermarkImageAttribute } = watermarkImage;
          const { StringValue: productsAttributesString } = products;

          const productAttributes = JSON.parse(productsAttributesString);

          for (let j = 0; j < productAttributes.rows.length; j++) {
            const messageAttribute = productAttributes.rows[j];

            const { id: productId, image: productImage, title: productName } = messageAttribute;

            ImageProcessingService.mergeImages({ images: [productImage, watermarkImageAttribute], productName })
              .then((productFinalImage) => {
                const position = IMAGES_PATH.length;
                const smallImage = [productImage.slice(0, position), `${IMAGE_SHAPES.SMALL.size}-`, productImage.slice(position)].join('');

                ImageProcessingService.resizeAndWriteImage({ image: smallImage, imageName: productFinalImage, shapes: IMAGE_SHAPES.SMALL });
                ImageProcessingService.resizeAndWriteImage({ image: productFinalImage, imageName: productFinalImage, shapes: IMAGE_SHAPES.MEDIUM });
                ImageProcessingService.resizeAndWriteImage({ image: productFinalImage, imageName: productFinalImage, shapes: IMAGE_SHAPES.LARGE });

                ProductService.update({ data: { image: productFinalImage }, id: productId });
              })
              .catch();
          }
        }

        const deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, (error, ok) => {
          if (err) {
            console.log('Delete Error', error);
          } else {
            console.log('Message Deleted', ok);
          }
        });
      } else {
        console.log('<=== queue is empty ===>');
      }
    });
  }
}

module.exports = AWSService;
