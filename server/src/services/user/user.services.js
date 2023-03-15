const { UserModel } = require('../../models');

const getUserByEmail = async ({ email }) => UserModel.findOne({ email });
const getUserByMobileNumber = async ({ contactNo }) => UserModel.findOne({ contactNo });

const addUser = async ({
  email, password, fullName, OTP, contactNo,
}) => UserModel.create({
  email,
  password,
  contactNo,
  fullName,
  OTP,
});

module.exports = {
  getUserByEmail,
  getUserByMobileNumber,
  addUser,
};
