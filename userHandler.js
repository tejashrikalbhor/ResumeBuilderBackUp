
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/index');

const server = awsServerlessExpress.createServer(app);

module.exports.signUp = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
}

