const otpExpiryTime = ({ date, minutes = 30 }) => new Date(date.getTime() + minutes * 60000);

const otp = () => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i += 1) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
const otpVerification = async ({ date }) => {
  const dateObj = new Date();
  const currentDate = dateObj.getDate();
  const currentMonth = dateObj.getMonth();
  const currentYear = dateObj.getFullYear();
  if (currentDate === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear()) {
    const currentTime = dateObj.getTime();
    const time = new Date(date).getTime();
    if (time >= currentTime) {
      return true;
    }
    return false;
  }
  return false;
};

module.exports = {
  otpExpiryTime,
  otp,
  otpVerification,
};
