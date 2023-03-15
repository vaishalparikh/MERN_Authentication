const express = require('express');
const userRoutes = require('./user');

const apiRoutes = express.Router();

apiRoutes.use('/user', userRoutes);

module.exports = apiRoutes;
