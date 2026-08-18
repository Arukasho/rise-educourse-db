import express from "express";
const router = express.Router();

import * as kelasController from "./controllers/kelasController.js";
import * as kelasSayaController from "./controllers/kelasSayaController.js";
import * as materialController from "./controllers/materialController.js";

// Kelas routes
router.get("/kelas", kelasController.getAll);
router.get("/kelas/:id", kelasController.getById);
router.post("/kelas", kelasController.create);
router.patch("/kelas/:id", kelasController.update);
router.delete("/kelas/:id", kelasController.remove);

// Kelas Saya routes
router.get("/kelas-saya", kelasSayaController.getAll);
router.get("/kelas-saya/:id", kelasSayaController.getById);
router.post("/kelas-saya", kelasSayaController.create);
router.patch("/kelas-saya/:id", kelasSayaController.update);
router.delete("/kelas-saya/:id", kelasSayaController.remove);

// Material routes
router.get("/materials", materialController.getAll);
router.get("/materials/:id", materialController.getById);
router.post("/materials", materialController.create);
router.patch("/materials/:id", materialController.update);
router.delete("/materials/:id", materialController.remove);

export default router;
