/*
* ############## DEPENDENCIES ##############
* */

const Koa = require('koa');
const restify = require('./middlewares/index');
const { App, Database } = require('./modules/initializators');
const { dbConfig, serverConfig } = require('./config');
const verifyCorsOrigin = require('./utils/verifyCorsOrigin');

// database instance
const database = new Database(dbConfig.logging);

// application instances
const app = new Koa();
/*
app.proxy = true;
*/

const server = new App({
  database,
  app
});

/**
 * ############## MIDDLEWARES ##############
 */

app.use(require('@koa/cors')({
  otigin: verifyCorsOrigin // TODO origin
}));

app.use(restify());

/**
 * ############## ROUTES ##############
 */
require('./routes')(app);

/**
 * ############## RUN SERVER ##############
 */
const { port } = serverConfig;


if (process.env.NODE_ENV === 'production') {
  server.run({}).catch((err) => {
    console.error(err);
  });
} else {
  server.run({ port }).catch((err) => {
    console.error(err);
  });
}
