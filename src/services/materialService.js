import * as materialRepo from "../repositories/materialRepository.js";

const getAllMaterial = async ({
  search,
  sortBy,
  order,
  page = 1,
  limit = 10,
} = {}) => {
  const [data, total] = await Promise.all([
    materialRepo.findAll({ search, sortBy, order, page, limit }),
    materialRepo.countAll(search),
  ]);

  return {
    data,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getMaterialById = async (id) => {
  return await materialRepo.findById(id);
};

const getMaterialByModulId = async (modul_id) => {
  return await materialRepo.findByModulId(modul_id);
};

const createMaterial = async (modul_id, type, title, video_url) => {
  return await materialRepo.create(modul_id, type, title, video_url);
};

const updateMaterial = async (id, data) => {
  const existing = await getMaterialById(id);

  const modul_id =
    data.modul_id !== undefined ? data.modul_id : existing.modul_id;
  const type = data.type !== undefined ? data.type : existing.type;
  const title = data.title !== undefined ? data.title : existing.title;
  const video_url =
    data.video_url !== undefined ? data.video_url : existing.video_url;
  const thumbnail_url =
    data.thumbnail_url !== undefined
      ? data.thumbnail_url
      : existing.thumbnail_url;

  return await materialRepo.update(
    id,
    modul_id,
    type,
    title,
    video_url,
    thumbnail_url,
  );
};

const deleteMaterial = async (id) => {
  return await materialRepo.deleteById(id);
};

export {
  getAllMaterial,
  getMaterialById,
  getMaterialByModulId,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
