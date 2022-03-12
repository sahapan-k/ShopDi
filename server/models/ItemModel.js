const mongoose = require('mongoose');
const validator = require('validator');

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An item must have a name!'],
      validate: [
        validator.isAscii,
        'An item name must only contains regular letters (A-Z) and numbers',
      ],
    },
    price: {
      type: Number,
      required: [true, 'You must list a price in order to sale...'],
    },
    stockNumber: {
      type: Number,
      required: [true, 'Please fill in the stock number'],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: {
        values: [
          'electronics',
          'beautyPersonalCare',
          'fashion',
          'sportOutdoor',
          'tools',
          'petSupplies',
        ],
        message: 'Item must be only assign to provided categories',
      },
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    itemImage: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Item must belongs to seller!'],
    },
    // slug: {
    //   type: String,
    //   unique: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

ItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'seller',
    select: 'name profilePhoto',
  });
  next();
});

ItemSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'item',
  localField: '_id',
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
