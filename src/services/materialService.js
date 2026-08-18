import * as materialRepo from "../repositories/materialRepository.js";

const getAllMaterial = async () => {
  return await materialRepo.findAll();
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

const updateMaterial = async (id, modul_id, type, title, video_url) => {
  return await materialRepo.update(id, modul_id, type, title, video_url);
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
