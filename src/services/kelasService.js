import * as kelasRepo from "../repositories/kelasRepository.js";

const getAllKelas = async ({
  search,
  sortBy,
  order,
  page = 1,
  limit = 10,
} = {}) => {
  const [data, total] = await Promise.all([
    kelasRepo.findAll({ search, sortBy, order, page, limit }),
    kelasRepo.countAll(search),
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
