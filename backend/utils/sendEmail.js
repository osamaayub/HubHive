const nodemailer = require("nodemailer");


const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    service: process.env.GMAIL_SERVICE,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.text
  };
  await transporter.sendMail(mailOptions);
}
module.exports = sendEmail;