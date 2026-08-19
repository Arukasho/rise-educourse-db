import * as kelasService from "../services/kelasService.js";

const getAll = async (req, res) => {
  try {
    const { search, sortBy, order, page, limit } = req.query;
    const { data, meta } = await kelasService.getAllKelas({
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
    const data = await kelasService.getKelasById(req.params.id);
    if (!data) return res.status(404).json({ error: "Kelas not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { tutor_id, kategori_id, title, price } = req.body;
    const data = await kelasService.createKelas(
      tutor_id,
      kategori_id,
      title,
      price,
    );
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { tutor_id, kategori_id, title, price } = req.body;
    const data = await kelasService.updateKelas(
      req.params.id,
      tutor_id,
      kategori_id,
      title,
      price,
    );
    if (!data) return res.status(404).json({ error: "Kelas not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await kelasService.deleteKelas(req.params.id);
    if (!data) return res.status(404).json({ error: "Kelas not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getAll, getById, create, update, remove };
