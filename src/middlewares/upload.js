// src/middlewares/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Pastikan folder uploads ada — buat jika belum ada
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi tempat penyimpanan file
const storage = multer.diskStorage({
  // Folder tujuan
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  // Nama file: timestamp + random + ekstensi asli
  // Tujuan: hindari nama file duplikat
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `material-${uniqueSuffix}${ext}`);
  },
});

// Filter: hanya izinkan file gambar
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true); // Terima file
  } else {
    cb(new Error("Hanya file JPEG, PNG, atau WebP yang diizinkan!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maks 5 MB
});

export default upload;
