const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
const { validateName, validateQuantity } = require('../middlewares/productsMiddleware');
const { validateProductId, validateQuantitySales } = require('../middlewares/salesMiddleware');

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);
router.post('/products', validateName, validateQuantity, productsController.postAdd);
router.post('/sales', validateProductId, validateQuantitySales, salesController.postAdd);
router.put('/products/:id', validateName, validateQuantity, productsController.putUpdate);
router.put('/sales/:id', validateProductId, validateQuantitySales, salesController.putUpdate);
router.delete('/products/:id', productsController.remove);
router.delete('/sales/:id', salesController.remove);

module.exports = router;
