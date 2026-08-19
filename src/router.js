import express from "express";
import authenticate from "./middlewares/auth.js";
import upload from "./middlewares/upload.js";

import * as authController from "./controllers/authController.js";
import * as kelasController from "./controllers/kelasController.js";
import * as kelasSayaController from "./controllers/kelasSayaController.js";
import * as materialController from "./controllers/materialController.js";

const router = express.Router();

// -- AUTH (public routes, tidak perlu token) --
router.post("/auth/register", authController.register);
router.get("/auth/verify-email", authController.verifyEmail);
router.post("/auth/login", authController.login);

// Kelas routes
router.get("/kelas", authenticate, kelasController.getAll);
router.get("/kelas/:id", authenticate, kelasController.getById);
router.post("/kelas", authenticate, kelasController.create);
router.patch("/kelas/:id", authenticate, kelasController.update);
router.delete("/kelas/:id", authenticate, kelasController.remove);

// Kelas Saya routes
router.get("/kelas-saya", authenticate, kelasSayaController.getAll);
router.get("/kelas-saya/:id", authenticate, kelasSayaController.getById);
router.post("/kelas-saya", authenticate, kelasSayaController.create);
router.patch("/kelas-saya/:id", authenticate, kelasSayaController.update);
router.delete("/kelas-saya/:id", authenticate, kelasSayaController.remove);

// Material routes
router.get("/materials", authenticate, materialController.getAll);
router.get("/materials/:id", authenticate, materialController.getById);
router.post("/materials", authenticate, materialController.create);
router.patch("/materials/:id", authenticate, materialController.update);
router.patch(
  "/materials/:id/thumbnail",
  authenticate,
  upload.single("thumbnail"),
  materialController.uploadThumbnail,
);
router.delete("/materials/:id", authenticate, materialController.remove);

export default router;
