const express = require('express');
const { userAuthRoutes } = require('./users.routes');

const userRoutes = express.Router();

userRoutes.use(userAuthRoutes);

module.exports = userRoutes;
