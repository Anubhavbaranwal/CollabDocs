import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.Smtp_email,//user email
    pass: process.env.Smtp_pass,//user password

  },
  secure: true,
});

export default transporter;