const productsModel = require('../models/productsModel');

const error = { status: 404, message: 'Product not found' };

const getAll = () => productsModel.getAllProducts();

const getInfos = (name) => productsModel.getInfosProducts(name);

const getById = async (id) => {
  const [[rows]] = await productsModel.getByIdProducts(id);
  
  if (!rows || rows.length === 0) {
    throw error;
  }
  return rows;
};

const postAdd = (name, quantity) => productsModel.postAddProducts(name, quantity);

const putUpdate = async (id, name, quantity) => {
  await getById(id);
  productsModel.putUpdateProducts(id, name, quantity);
  const result = {
    id,
    name,
    quantity,
  };
  return result;
};

const remove = async (id) => {
  await getById(id);
  return productsModel.removeProducts(id);
};

module.exports = {
  getAll,
  getInfos,
  getById,
  postAdd,
  putUpdate,
  remove,
};
