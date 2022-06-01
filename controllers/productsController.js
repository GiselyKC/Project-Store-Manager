const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const [rows] = await productsService.getAll();
  res.status(200).json(rows);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const [[rows]] = await productsService.getById(id);

  if (!rows || rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(rows);
};

const postAdd = async (req, res) => {
  const { name, quantity } = req.body;

  const [rows] = await productsService.getInfos(name);
  if (rows.length !== 0) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  const result = await productsService.postAdd(name, quantity);

  return res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  postAdd,
};
