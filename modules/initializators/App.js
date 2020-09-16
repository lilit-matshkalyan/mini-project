const http = require('http');

class App {
  constructor({ app, database }) {
    this.app = app;
    this.database = database;
  }

  async run({ port }) {
    await this.database.init();

    const server = http.createServer(this.app.callback());

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.info(`Server is running on port : ${port} ✅`);
    });
  }
}

module.exports = App;
