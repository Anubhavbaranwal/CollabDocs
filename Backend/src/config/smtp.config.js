import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "kuluruvineeth8623@gmail.com",//user email
    pass: "cqudocdrueyyuyyp",//user password
    
  },
  secure: true,
});

export default transporter;