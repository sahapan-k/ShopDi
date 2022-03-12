const Review = require('../models/reviewModel');
const catchAsync = require('../utility/catchAsync');

exports.getAllReviews = catchAsync(async (request, response) => {
  let filter = {};
  if (request.params.ItemId) filter = { item: request.params.ItemId };

  const reviews = await Review.find(filter);

  response.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (request, response) => {
  if (!request.body.item) request.body.item = request.params.ItemId;
  if (!request.body.user) request.body.user = request.user.id;
  const review = await Review.create(request.body);

  response.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.editReview = catchAsync(async (request, response) => {
  if (!request.body.item) request.body.item = request.params.ItemId;
  if (!request.body.user) request.body.user = request.user.id;
  const review = await Review.findByIdAndUpdate(request.body);
  response.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (request, response) => {
  if (!request.body.item) request.body.item = request.params.ItemId;
  if (!request.body.user) request.body.user = request.user.id;
  await Review.findByIdAndDelete(request.body);
  response.status(200).json({
    status: 'success',
    data: null,
  });
});
