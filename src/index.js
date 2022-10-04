const express = require('express');
const bodyParser = require('body-parser');
const {routes:userRoutes} = require('./api/auth/routes');
const app = express();
app.use(bodyParser.json());
app.use('/user',userRoutes);
module.exports = app;
