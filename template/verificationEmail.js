import config from "../lib/config";

module.exports = {
  verificationEmailTemplate: verificationCode => {
    return `Hello, <br>
      Welcome to GymHub. <br>
      ${verificationCode} is your email verification code.<br>
      `;
  }
};
