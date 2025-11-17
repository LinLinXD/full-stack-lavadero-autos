import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // o true según tu proveedor
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (to, code) => {
  await transporter.sendMail({
    from: '"Mi App" <no-reply@miapp.com>',
    to,
    subject: "Verifica tu correo",
    text: `Tu código de verificación es: ${code}`,
    html: `<p>Tu código de verificación es: <b>${code}</b></p>`,
  });
};
