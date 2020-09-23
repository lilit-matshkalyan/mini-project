const AWSService = require('../../services/aws/AWSService');

/**
 * Class AWSController
 */
class AWSController {
  /**
     *
     * @param data
     * @returns {Promise.<*>}
     */
  static async create({ data }) {
    const result = await AWSService.sendMessageToQueue({ data });

    return result;
  }

  /**
     *
     * @param data
     * @returns {Promise.<*>}
     */
  static async get({ data }) {
    const result = await AWSService.receiveMessageFromQueue({ data });

    return result;
  }
}

module.exports = AWSController;
