import * as kelasRepo from "../repositories/kelasRepository.js";

const getAllKelas = async () => {
  return await kelasRepo.findAll();
};

const getKelasById = async (id) => {
  return await kelasRepo.findById(id);
};

const createKelas = async (tutor_id, kategori_id, title, price) => {
  return await kelasRepo.create(tutor_id, kategori_id, title, price);
};

const updateKelas = async (id, tutor_id, kategori_id, title, price) => {
  return await kelasRepo.update(id, tutor_id, kategori_id, title, price);
};

const deleteKelas = async (id) => {
  return await kelasRepo.deleteById(id);
};

export { getAllKelas, getKelasById, createKelas, updateKelas, deleteKelas };
