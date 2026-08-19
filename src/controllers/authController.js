// src/controllers/authController.js
import * as authService from "../services/authService.js";

const register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: "Registrasi berhasil! Cek email kamu.",
      data,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: "Token is required" });

    const user = await authService.verifyEmail(token);
    res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export { register, login, verifyEmail };
