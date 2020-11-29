const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendMail = (email, subject, text) => {
  sgMail.send({
    to: email,
    from: "aswhim6@gmail.com",
    subject: subject,
    text: text,
  });
};

// sendMail("aswhim7@gmail.com", "aaaaaa", "bbbbbb");

module.exports = sendMail;
