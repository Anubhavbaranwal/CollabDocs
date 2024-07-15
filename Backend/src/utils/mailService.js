import Mail from "nodemailer/lib/mailer";
import transporter from "../config/smtp.config";

function sendMail(mailOptions) {
  return transporter.sendMail(mailOptions);
}

const mailservice = { sendMail };

export { mailservice };