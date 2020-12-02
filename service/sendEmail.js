import nodemailer from "nodemailer";
import config from "../lib/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS
  }
});

module.exports = mailOptions => {
  console.log("sendmail");
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(`Verification mail is send to ${mailOptions.to}`);
  });
};
