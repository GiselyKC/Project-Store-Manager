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

module.exports = {
  getAllSales,
  getByIdSales,
};
