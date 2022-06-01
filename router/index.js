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
router.post('/sales', validateProductId, validateQuantitySales);
router.put('/products/:id', validateName, validateQuantity);
router.put('/sales/:id', validateProductId, validateQuantitySales);
module.exports = router;
