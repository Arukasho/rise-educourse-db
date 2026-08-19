import * as kelasSayaService from "../services/kelasSayaService.js";

const getAll = async (req, res) => {
  try {
    const { search, sortBy, order, page, limit } = req.query;
    const { data, meta } = await kelasSayaService.getAllKelasSaya({
      search,
      sortBy,
      order,
      page,
      limit,
    });
    res.status(200).json({ success: true, data, meta });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await kelasSayaService.getKelasSayaById(req.params.id);
    if (!data) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getByUserId = async (req, res) => {
  try {
    const data = await kelasSayaService.getKelasSayaByUserId(req.params.userId);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { kelas_id, user_id, status } = req.body;
    const data = await kelasSayaService.enrollKelas(kelas_id, user_id, status);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { status } = req.body;
    const data = await kelasSayaService.updateKelasSaya(req.params.id, status);
    if (!data) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await kelasSayaService.deleteKelasSaya(req.params.id);
    if (!data) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getAll, getById, getByUserId, create, update, remove };
