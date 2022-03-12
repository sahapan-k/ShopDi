const mongoose = require('mongoose');
const Item = require('../models/ItemModel');

const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review cannot be empty!'],
    },
    rating: {
      type: Number,
      required: [true, 'A review must given a score'],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must have owner!'],
    },
    item: {
      type: mongoose.Schema.ObjectId,
      ref: 'Item',
      required: [true, 'A review must belong to item!'],
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name profilePhoto',
  });
  next();
});

ReviewSchema.statics.calcAverageRatings = async function (ItemId) {
  const stats = await this.aggregate([
    {
      $match: { item: ItemId },
    },
    {
      $group: {
        _id: '$item',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats) {
    await Item.findByIdAndUpdate(ItemId, {
      ratings: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Item.findByIdAndUpdate(ItemId, {
      ratings: 0,
      ratingsQuantity: 0,
    });
  }
};

ReviewSchema.index({ item: 1, user: 1 }, { unique: true });

ReviewSchema.pre('save', function (next) {
  this.constructor.calcAverageRatings(this.item);
  next();
});

ReviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

ReviewSchema.post(/^findOneAnd/, async function (ItemId) {
  await this.r.constructor.calcAverageRatings(this.r.item);
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
