const salesModel = require('../models/salesModel');

const getAll = () => salesModel.getAllSales();

const getById = (id) => salesModel.getByIdSales(id);

const postAdd = async (array) => {
  const { id } = await salesModel.postAddSales();

  const infos = array.map(({ productId, quantity }) => {
    salesModel.postAddSalesProducts(id, productId, quantity);
    const arr = {
      productId,
      quantity,
    };
    return arr;
  });

  return {
    id,
    itemsSold: infos,
  };
};

module.exports = {
  getAll,
  getById,
  postAdd,
};
