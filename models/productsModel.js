const connection = require('../db');

const getAllProducts = () => connection.execute(
  'SELECT * FROM StoreManager.products',
);

const getInfosProducts = (name) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE StoreManager.products.name = ?',
  [name],
);

const getByIdProducts = (id) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE id = ?', [id],
);

const postAddProducts = async (name, quantity) => {
  const [row] = await connection.execute(
    `INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?)`,
    [name, quantity],
  );
  const result = {
    id: row.insertId,
    name,
    quantity,
  };
  return result;
};

const putUpdateProducts = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?',
    [name, quantity, id],
  );
};

module.exports = {
  getAllProducts,
  getInfosProducts,
  getByIdProducts,
  postAddProducts,
  putUpdateProducts,
};
