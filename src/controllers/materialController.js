import * as materialService from "../services/materialService.js";

const getAll = async (req, res) => {
  try {
    const { search, sortBy, order, page, limit } = req.query;
    const { data, meta } = await materialService.getAllMaterial({
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
    const { modul_id, type, title, video_url, thumbnail_url } = req.body;
    const data = await materialService.createMaterial(
      modul_id,
      type,
      title,
      video_url,
      thumbnail_url,
    );
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { modul_id, type, title, video_url, thumbnail_url } = req.body;
    const data = await materialService.updateMaterial(
      req.params.id,
      modul_id,
      type,
      title,
      video_url,
      thumbnail_url,
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

const uploadThumbnail = async (req, res) => {
  try {
    // req.file diisi oleh Multer middleware (sudah diproses sebelum controller ini)
    if (!req.file) {
      return res.status(400).json({ error: "Tidak ada file yang diupload!" });
    }

    const { id } = req.params;

    // Bangun URL yang bisa diakses client
    const thumbnailUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // Kirim ke service untuk update database
    const data = await materialService.updateMaterial(id, {
      thumbnail_url: thumbnailUrl,
    });
    res
      .status(200)
      .json({ success: true, message: "Thumbnail berhasil diupload!", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAll, getById, create, update, remove, uploadThumbnail };
