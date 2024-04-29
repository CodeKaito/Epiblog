const nodemailer = require("nodemailer");

// Funzione per inviare l'email
const sendEmail = async (authorData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "brycen.hermann56@ethereal.email",
      pass: "phP8wuJxZf4546d7Wv",
    },
  });
  const mailBody = `<h1>Ciao ${authorData.name} ${authorData.surname},</h1>
                   <p>Benvenuto su Epiblog! Grazie per esserti registrato.</p>`;

  try {
    const mail = await transporter.sendMail({
      from: "Epicode Test <brycen.hermann56@ethereal.email>",
      to: authorData.email,
      subject: "Benvenuto su Epiblog",
      html: mailBody,
    });
    console.log(mail.messageId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
