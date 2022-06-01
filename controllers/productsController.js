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

module.exports = {
  getAll,
  getById,
};
