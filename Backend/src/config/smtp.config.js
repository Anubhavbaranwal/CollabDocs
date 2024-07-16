import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: username,//user email
    pass: password,//user password

  },
  secure: true,
});

export default transporter;