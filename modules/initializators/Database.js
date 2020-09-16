/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const { sequelize } = require('../../data/models');

class Database {
  constructor(logging = false) {
    this.logging = logging;
  }

  async init() {
    await sequelize.authenticate();
    console.info('Connected to mysql SQL database ✅');

    // return await sequelize.sync({ // eslint-disable-line
    //   logging: this.logging
    // });
  }
}

module.exports = Database;
