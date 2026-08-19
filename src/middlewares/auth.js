// src/middlewares/auth.js
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  // Ambil token dari header: "Authorization: Bearer eyJhbGci..."
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token tidak ditemukan!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan payload ke req.user untuk dipakai controller
    next(); // lanjutkan ke handler berikutnya
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Token tidak valid atau sudah expired!" });
  }
};

export default authenticate;
