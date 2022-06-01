const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);

module.exports = router;
