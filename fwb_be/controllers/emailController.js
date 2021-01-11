import nodemailer from "nodemailer";

const sendEmail = async (email, content) => {
  // This is the content of email
  // const output = `<p>Hello ${username}, welcome to Friend with benefit<p>`;

  // Transporter is responseable for send email
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    // This is the email of administrator
    auth: {
      user: "khaclamvna@gmail.com", // generated ethereal user
      pass: "khaclam2409dat2711kl", // generated ethereal password
    },
    // Detete this whenever using in real project
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Khac Lam👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔ from nodemailer", // Subject line
    text: "Hello world?", // plain text body
    html: content, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export default sendEmail;
