const productsModel = require('../models/productsModel');

const getAll = () => productsModel.getAllProducts();

const getInfos = (name) => productsModel.getInfosProducts(name);

const getById = (id) => productsModel.getByIdProducts(id);

const postAdd = (name, quantity) => productsModel.postAddProducts(name, quantity);

module.exports = {
  getAll,
  getInfos,
  getById,
  postAdd,
};
