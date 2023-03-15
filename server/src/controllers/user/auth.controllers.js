const bcrypt = require('bcrypt');
const { otpUtils, jwtToken, sendMail, sendMessage } = require('../../utils');
const { environmentVariables } = require('../../config');
const { userValidation: { userValidation } } = require('../../validations');
const { userServices: { userServices } } = require('../../services');

const register = async (req, res) => {
  try {
    const { email, contactNo, fullName, password } = await userValidation.userSignUpValidation.validateAsync(req.body);
    /**
     * first check any user exist in db with same email or not
     */
    const isUserExistMobileNumber = await userServices.getUserByMobileNumber({ contactNo });
    if (isUserExistMobileNumber) {
      throw new Error('User already exist');
    }
    const isUserExist = await userServices.getUserByEmail({ email });
    if (isUserExist) {
      throw new Error('User already exist');
    }
    // now encrypt a password
    const salt = Number(environmentVariables.BCRYPT_SALT);
    const hashPassword = await bcrypt.hash(password, salt);
    // now register a user as well as create an otp for that
    const otp = otpUtils.otp();
    const validTill = otpUtils.otpExpiryTime({ date: new Date() });
    // now register a user
    const user = await userServices.addUser({
      fullName,
      email,
      contactNo,
      password: hashPassword,
      OTP: {
        otp,
        validTill,
      },
    });
    if (!user) {
      throw new Error('Server Issue failed to registration Process');
    }
    // send otp over mail and message
    await sendMail({ email, name: fullName, otp });
    await sendMessage({ contactNo, name: fullName , otp });
    return res.json({ success: true, message: 'OTP sends successfully' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = await userValidation.verifyOtpValidation.validateAsync(req.body);
    // check user exits or not
    const user = await userServices.getUserByEmail({ email });
    if (!user) {
      throw new Error('Not Found');
    }
    if (user.OTP.otp !== otp) {
      throw new Error('Wrong OTP');
    }
    // check otp expire or not
    const otpValidate = await otpUtils.otpVerification({ date: user.OTP.validTill });
    if (!otpValidate) {
      throw new Error('Otp expired.');
    }
    // update status of isEmailVerified
    user.isEmailVerified = true;
    await user.save();
    // now create a token
    const token = await jwtToken.createToken({ userId: user._id });
    if (!token) {
      throw new Error('Server Issue Failed to verify otp');
    }
    res.set('token', token);
    return res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const {
      email, password,
    } = await userValidation.userLoginValidation.validateAsync(req.body);
    let response = {};
    // check user exits or not
    const user = await userServices.getUserByEmail({ email });
    if (!user) {
      throw new Error('Invalid credential');
    }
    if (!user.isEmailVerified) {
      const otp = otpUtils.otp();
      const validTill = otpUtils.otpExpiryTime({ date: new Date() });
      user.OTP = {
        otp,
        validTill,
      };
      await user.save();
      // now send an otp
      await sendMail({ email: user.email, name: user.fullName, otp });
      response = 'OTP sends sucessfully';
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error('Invalid credential');
      }
      const token = await jwtToken.createToken({ userId: user._id });
      if (!token) {
        throw new Error('Server Issue Failed to login');
      }
      res.set('token', token);
      response = user;
    }
    return res.json({ success: true, response });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

module.exports = {
  register,
  verifyOtp,
  login,
};
