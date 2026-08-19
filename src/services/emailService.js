// src/services/emailService.js
import nodemailer from "nodemailer";

// Buat transporter sekali saja — di-reuse untuk semua email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false, // false untuk port 587 (STARTTLS), true untuk 465 (SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Kirim welcome email ke user yang baru mendaftar
 * @param {string} email - Alamat email penerima
 */
const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "🎉 Selamat Datang di Enrollment App!",
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:32px;background:#f9f9f9;border-radius:12px">
        <h2 style="color:#1a1a2e">Selamat Datang! 👋</h2>
        <p style="color:#555;line-height:1.7">
          Halo, <strong>${email}</strong>!<br><br>
          Akun kamu di <strong>Student Enrollment App</strong> telah berhasil dibuat.
          Kamu sudah bisa login dan mulai menggunakan sistem.
        </p>
        <a href="http://localhost:3000" 
           style="display:inline-block;background:#50fa7b;color:#03080f;padding:12px 28px;
                  border-radius:8px;font-weight:700;text-decoration:none;margin-top:16px">
          Login Sekarang →
        </a>
        <p style="color:#999;font-size:12px;margin-top:24px">
          Jika kamu tidak merasa mendaftar, abaikan email ini.
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✉️ Welcome email terkirim ke", email, "— ID:", info.messageId);
  return info;
};

const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.APP_URL || "http://localhost:3000"}/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "✅ Verifikasi Email Kamu",
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:32px;background:#f9f9f9;border-radius:12px">
        <h2 style="color:#1a1a2e">Satu Langkah Lagi! 🔐</h2>
        <p style="color:#555;line-height:1.7">
          Halo, <strong>${email}</strong>!<br><br>
          Klik tombol di bawah untuk memverifikasi email kamu.
          Link ini berlaku selama 24 jam.
        </p>
        <a href="${verifyUrl}" 
           style="display:inline-block;background:#50fa7b;color:#03080f;padding:12px 28px;
                  border-radius:8px;font-weight:700;text-decoration:none;margin-top:16px">
          Verifikasi Email →
        </a>
        <p style="color:#999;font-size:12px;margin-top:24px">
          Jika kamu tidak merasa mendaftar, abaikan email ini.
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(
    "✉️ Verification email terkirim ke",
    email,
    "— ID:",
    info.messageId,
  );
  return info;
};

export { sendWelcomeEmail, sendVerificationEmail };
