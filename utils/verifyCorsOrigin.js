const { whiteList } = require('../config');

module.exports = ({ headers: { origin } }) => {
  const white = whiteList ? whiteList.split(',') : null;
  return white && white.includes(origin) ? origin : '*';
};
