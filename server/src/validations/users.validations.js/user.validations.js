const Joi = require('joi');

const userSignUpValidation = Joi.object().keys({
  fullName: Joi.string().required().label('Full Name'),
  email: Joi.string()
    .max(255)
    .email({
      allowUnicode: true,
      tlds: false,
    })
    .required()
    .label('Email'),
  password: Joi.string().max(300).required().label('Password'),
  contactNo: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .label('Number'),
});

const verifyOtpValidation = Joi.object().keys({
  email: Joi.string()
    .max(255)
    .email({
      allowUnicode: true,
      tlds: false,
    })
    .required()
    .label('Email'),
  otp: Joi.string().required().label('OTP'),
});

const userLoginValidation = Joi.object().keys({
  email: Joi.string()
    .max(255)
    .email({
      allowUnicode: true,
      tlds: false,
    })
    .required()
    .label('Email'),
  password: Joi.string().max(300).required().label('Password'),
});

module.exports = {
  userSignUpValidation,
  verifyOtpValidation,
  userLoginValidation,
};
