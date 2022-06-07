const validateProductId = (req, res, next) => {
  const ProductId = req.body.some(({ productId }) => {
    if (!productId || productId === '') {
      return true;
    } return false;
  });
  if (ProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const someQuantitySales = ({ quantity }) => {
  if (quantity === undefined || quantity === '') {
    return true;
  } return false;
};

const validateQuantitySales = (req, res, next) => {
  const QuantitySales = req.body.some(someQuantitySales);
  const QuantitySales2 = req.body.some(({ quantity }) => {
    if (quantity <= 0) {
      return true;
    } return false;
  });
  if (QuantitySales) {
    return res.status(400).json({ message: '"quantity" is required' });
  } if (QuantitySales2) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
    next();
};

module.exports = {
  validateProductId,
  validateQuantitySales,
};
