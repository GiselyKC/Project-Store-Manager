const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const [rows] = await salesService.getAll();
  res.status(200).json(rows);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const rows = await salesService.getById(id);

  res.status(200).json(rows);
};

const postAdd = async (req, res) => {
  const array = req.body;

  const result = await salesService.postAdd(array);

  return res.status(201).json(result);
};

const putUpdate = async (req, res) => {
  const array = req.body;
  const { id } = req.params;

  const result = await salesService.putUpdate(id, array);

  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  postAdd,
  putUpdate,
};
