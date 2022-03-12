const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
const ReviewRouter = require('../routes/reviewRoute');

const router = express.Router();

router.route('/').get(itemController.getAllItems);

router.post(
  '/createItem',
  authController.protect,
  itemController.uploadItemPhoto,
  itemController.resizeItemPhoto,
  itemController.createItem
);

router
  .route('/:ItemId')
  .get(itemController.getItem)
  .patch(itemController.editItem)
  .delete(itemController.deleteItem);

router.use('/:ItemId/reviews', ReviewRouter);

module.exports = router;
