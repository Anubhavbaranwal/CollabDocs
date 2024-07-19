import transporter from "../config/smtp.config.js";

function sendMail(mailOptions) {
  return transporter.sendMail(mailOptions);
}

export const mailservice = { sendMail };

