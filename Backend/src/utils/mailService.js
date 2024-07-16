import Mail from "nodemailer/lib/mailer";
import transporter from "../config/smtp.config";

function sendMail(mailOptions) {
  return transporter.sendMail(mailOptions);
}

export const mailservice = { sendMail };

