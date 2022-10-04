const serverless = require("serverless-http");
const express = require("express");
const app = express();

const route = require('./src/index');
app.use(route);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
