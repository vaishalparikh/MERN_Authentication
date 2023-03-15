const { environmentVariables } = require("../config");

const client = require("twilio")(
  environmentVariables.TWILIO_ACCOUNT_SID,
  environmentVariables.TWILIO_AUTH_TOKEN
);

const sendMessage = async ({ contactNo, name, otp }) => {
  client.messages
    .create({
      body: "Verification code is " + otp + " for " + name + "Thank you",
      to: "+91" + contactNo,
      from: environmentVariables.TWILIO_NUMBER,
    })
    .then((message) => console.log(message))
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  sendMessage,
};
