const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  '/add-product',
  [
    body('title', 'title must be string and min 3 characters long')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl', 'please enter valid url').isURL(),
    body('price', 'please enter valid price').isFloat(),
    body('description', 'description must have 5 to 400 characters')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title', 'title must be string and min 3 characters long')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl', 'please enter valid url').isURL(),
    body('price', 'please enter valid price').isFloat(),
    body('description', 'description must have 5 to 400 characters')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
