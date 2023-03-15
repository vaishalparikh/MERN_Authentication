// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');
const templateOtp = require('./template');

module.exports = async ({ email, name, otp }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  const mailOptions = {
    from: 'airbnb@gmail.com',
    to: email,
    subject: 'One Time Password From Airbnb',
    html: templateOtp(otp, name),
  };
  transporter.sendMail(mailOptions, async (error) => {
    if (error) {
      console.log(error);
    }
  });
};
