const salesModel = require('../models/salesModel');

const getAll = () => salesModel.getAllSales();
const getById = (id) => salesModel.getByIdSales(id);

module.exports = {
  getAll,
  getById,
};
