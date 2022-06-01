const productsModel = require('../models/productsModel');

const getAll = () => productsModel.getAllProducts();
const getById = (id) => productsModel.getByIdProducts(id);

module.exports = {
  getAll,
  getById,
};
