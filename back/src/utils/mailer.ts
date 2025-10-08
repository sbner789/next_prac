import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, code: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"SSR Board" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "회원가입 인증 코드",
    text: `회원가입 인증 코드: ${code}`,
  });
}