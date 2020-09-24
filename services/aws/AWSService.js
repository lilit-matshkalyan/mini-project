const { SQS_QUEUE_URL } = process.env;

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'REGION' });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });


/**
 * Abstract Class AWSService
 */
class AWSService {
  /**
     *
     * @param data
     * @param transaction
     * @returns {Promise.<*>}
     */
  static async sendMessageToQueue() { // { data, transaction }
    const params = {
      // Remove DelaySeconds parameter and value for FIFO queues
      DelaySeconds: 10,
      MessageAttributes: {
        Title: {
          DataType: 'String',
          StringValue: 'The Whistler'
        },
        Author: {
          DataType: 'String',
          StringValue: 'John Grisham'
        },
        WeeksOn: {
          DataType: 'Number',
          StringValue: '6'
        }
      },
      MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageGroupId: "Group1",  // Required for FIFO queues
      QueueUrl: SQS_QUEUE_URL
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.MessageId);
      }
    });
  }

  static async receiveMessageFromQueue() { // { data, transaction }
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

    sqs.receiveMessage(params, (err, data) => {
      if (err) {
        console.log('Receive Error', err);
      } else if (data.Messages) {
        console.log('=== data.Messages ===');
        console.log(data.Messages);
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
      }
    });
  }
}

module.exports = AWSService;
