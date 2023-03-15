const otpUtils = require('./otpUtils');
const jwtToken = require('./jwtToken');
const sendMail = require('./mail');
const {sendMessage} = require('./sms');

module.exports = {
  otpUtils,
  jwtToken,
  sendMail,
  sendMessage,
};
