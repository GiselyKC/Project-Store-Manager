const connection = require('../db');

const getAllProducts = () => connection.execute(
  'SELECT * FROM StoreManager.products',
);

const getByIdProducts = (id) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE id = ?', [id],
);

module.exports = {
  getAllProducts,
  getByIdProducts,
};
