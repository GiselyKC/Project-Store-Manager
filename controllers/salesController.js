const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const [rows] = await salesService.getAll();
  res.status(200).json(rows);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await salesService.getById(id);

  if (!rows || rows.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(rows);
};

module.exports = {
  getAll,
  getById,
};
