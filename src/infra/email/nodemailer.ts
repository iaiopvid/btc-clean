import nodemailer from "nodemailer";

const mailHost = process.env.MAIL_HOST
const mailPort = process.env.MAIL_PORT
const mailName = process.env.MAIL_USER
const mailPassword = process.env.MAIL_PASSWORD
const env = process.env.NODE_ENV

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: Number(mailPort),
  secure: false,
  requireTLS: process.env.NODE_ENV === 'dev'
    ? false
    : true,
  auth: process.env.NODE_ENV === 'dev'
    ? {}
    : {
      user: mailName,
      pass: mailPassword,
    },
  logger: true
});

const sendMail = async (
  from: string,
  to: string,
  subject: string,
  html: string,
  headers: {} | undefined = null
) => {
  return await transporter.sendMail({
    from, // '"Sender Name" <from@example.net>',
    to, // "to@example.com",
    subject, // "Hello from node",
    html, // "<strong>Hello world?</strong>",
    headers, //{ 'x-myheader': 'test header' }
  });
}

export default sendMail