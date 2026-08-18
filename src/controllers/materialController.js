import * as materialService from "../services/materialService.js";

const getAll = async (req, res) => {
  try {
    const data = await materialService.getAllMaterial();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await materialService.getMaterialById(req.params.id);
    if (!data) return res.status(404).json({ error: "Material not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getByModulId = async (req, res) => {
  try {
    const data = await materialService.getMaterialByModulId(req.params.modulId);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { modul_id, type, title, video_url } = req.body;
    const data = await materialService.createMaterial(
      modul_id,
      type,
      title,
      video_url,
    );
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { modul_id, type, title, video_url } = req.body;
    const data = await materialService.updateMaterial(
      req.params.id,
      modul_id,
      type,
      title,
      video_url,
    );
    if (!data) return res.status(404).json({ error: "Material not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await materialService.deleteMaterial(req.params.id);
    if (!data) return res.status(404).json({ error: "Material not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getAll, getById, getByModulId, create, update, remove };
