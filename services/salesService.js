const salesModel = require('../models/salesModel');

const error = { status: 404, message: 'Sale not found' };

const getAll = () => salesModel.getAllSales();

const getById = async (id) => {
  const [rows] = await salesModel.getByIdSales(id);

  if (!rows || rows.length === 0) {
    throw error;
  }
  return rows;
};

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

const putUpdate = async (id, array) => {
  await getById(id);
  const infos = array.map(({ productId, quantity }) => {
    salesModel.putUpdateSales(id, productId, quantity);
    const arr = {
      productId,
      quantity,
    };
    return arr;
  });

  return {
    saleId: id,
    itemUpdated: infos,
  };
};

const remove = async (id) => {
  await getById(id);
  return salesModel.removeSales(id);
};

module.exports = {
  getAll,
  getById,
  postAdd,
  putUpdate,
  remove,
};
