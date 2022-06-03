const connection = require('../db');

const getAllSales = () => connection.execute(
  `SELECT
    sap.sale_id AS saleId,
    sa.date,
    sap.product_id AS productId,
    sap.quantity
  FROM
    StoreManager.sales AS sa
    INNER JOIN StoreManager.sales_products AS sap ON sa.id = sap.sale_id`,
);

const getByIdSales = (id) => connection.execute(
  `SELECT
    sa.date,
    sap.product_id AS productId,
    sap.quantity
  FROM
    StoreManager.sales AS sa
    INNER JOIN StoreManager.sales_products AS sap ON sa.id = sap.sale_id
    WHERE sap.sale_id = ?`, [id],
);

const postAddSales = async () => {
  const [row] = await connection.execute(
    `INSERT INTO StoreManager.sales (date)
    VALUES (NOW())`,
  );
  const result = {
    id: row.insertId,
  };
  return result;
};

const postAddSalesProducts = async (id, productId, quantity) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
    [id, productId, quantity],
  );
};

const putUpdateSales = async (saleId, productId, quantity) => {
  console.log(saleId, productId, quantity);
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity=? WHERE sale_id=? AND product_id=?',
    [quantity, saleId, productId],
  );
};

module.exports = {
  getAllSales,
  getByIdSales,
  postAddSales,
  postAddSalesProducts,
  putUpdateSales,
};
