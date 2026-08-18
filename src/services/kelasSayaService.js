import * as kelasSayaRepo from "../repositories/kelasSayaRepository.js";

const getAllKelasSaya = async () => {
  return await kelasSayaRepo.findAll();
};

const getKelasSayaById = async (id) => {
  return await kelasSayaRepo.findById(id);
};

const getKelasSayaByUserId = async (user_id) => {
  return await kelasSayaRepo.findByUserId(user_id);
};

const enrollKelas = async (kelas_id, user_id, status) => {
  const existing = await kelasSayaRepo.findByUserAndKelas(user_id, kelas_id);
  if (existing) {
    throw new Error("User is already enrolled in this kelas");
  }
  return await kelasSayaRepo.create(kelas_id, user_id, status);
};

const updateKelasSaya = async (id, status) => {
  return await kelasSayaRepo.update(id, status);
};

const deleteKelasSaya = async (id) => {
  return await kelasSayaRepo.deleteById(id);
};

export {
  getAllKelasSaya,
  getKelasSayaById,
  getKelasSayaByUserId,
  enrollKelas,
  updateKelasSaya,
  deleteKelasSaya,
};
