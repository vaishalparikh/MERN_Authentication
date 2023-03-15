const express = require('express');
const { userControllers: { userControllers } } = require('../../controllers');

const userAuthRoutes = express.Router();
userAuthRoutes.post('/register', userControllers.register);
userAuthRoutes.get('/verify-otp', userControllers.verifyOtp);
userAuthRoutes.get('/login', userControllers.login);

module.exports = {
  userAuthRoutes,
};
