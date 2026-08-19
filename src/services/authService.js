// src/services/authService.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import * as authRepo from "../repositories/authRepository.js";
import { sendVerificationEmail, sendWelcomeEmail } from "./emailService.js";

const register = async ({ fullName, email, password, userName }) => {
  const existing = await authRepo.findUserByEmail(email);
  if (existing) throw new Error("Email sudah terdaftar!");

  const hashed = await bcrypt.hash(password, 10);

  const user = await authRepo.createUser(fullName, email, hashed, userName);

  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  await authRepo.setVerificationToken(user.id, token, expiresAt);

  // Send verification email instead of welcome email
  try {
    await sendVerificationEmail(user.email, token);
  } catch (err) {
    console.error("Gagal kirim verification email:", err.message);
    // don't throw — registration should still succeed even if email fails
  }

  return user;
};

const verifyEmail = async (token) => {
  const user = await authRepo.findByVerificationToken(token);

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }
  if (new Date(user.verification_token_expires) < new Date()) {
    throw new Error("Verification token has expired");
  }

  const verifiedUser = await authRepo.markAsVerified(user.id);

  // Send welcome email now that they're verified
  try {
    await sendWelcomeEmail(verifiedUser.email);
  } catch (err) {
    console.error("Gagal kirim welcome email:", err.message);
    // don't throw — verification should still succeed even if email fails
  }

  return verifiedUser;
};

const login = async ({ email, password }) => {
  const user = await authRepo.findUserByEmail(email);
  if (!user) throw new Error("Email atau password salah!");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Email atau password salah!");

  const token = jwt.sign(
    { id: user.id, email: user.email, user_name: user.user_name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const { password_hash: _, ...safeUser } = user; // hapus field password dari response
  return { user: safeUser, token };
};

export { register, login, verifyEmail };
