const multer = require('multer');
const sharp = require('sharp');

const Item = require('../models/ItemModel');
const AppError = require('../utility/appError');
const catchAsync = require('../utility/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (request, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadItemPhoto = upload.single('itemImage');

exports.getAllItems = catchAsync(async (request, response, next) => {
  // Filtering Query
  const queryObj = { ...request.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((element) => delete queryObj);

  // Advanced Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Item.find(JSON.parse(queryStr));

  // Sorting
  if (request.query.sort) {
    const sortBy = request.query.sort.split(',').join(' ');
    query = query.sort(request.query.sort);
  } else {
    query = query.sort('-createAt');
  }

  // Field Limiting
  if (request.query.fields) {
    const fields = request.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  //Pagination
  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 40;
  const skip = (page - 1) * limit;

  if (request.query.page) {
    const numItems = await Item.countDocuments();
    if (skip > numItems) {
      return next(new AppError('This page does not existed!', 404));
    }
  }

  query = query.skip(skip).limit(limit);

  // Execute Query
  const items = await query;

  response.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

exports.resizeItemPhoto = catchAsync(async (request, response, next) => {
  request.file.filename = `item-${request.user.id}-${
    request.body.name
  }-${Date.now()}.jpeg`;

  await sharp(request.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/items/${request.file.filename}`);

  next();
});

exports.getItem = catchAsync(async (request, response, next) => {
  const foundItem = await Item.findById(request.params.ItemId).populate(
    'reviews'
  );
  if (!foundItem) {
    return next(new AppError('No Item with this id found!', 404));
  }
  response.status(200).json({
    status: 'success',
    data: {
      foundItem,
    },
  });
});

exports.createItem = catchAsync(async (request, response, next) => {
  await Item.create({
    name: request.body.name,
    price: request.body.price,
    stockNumber: request.body.stockNumber,
    description: request.body.description,
    category: request.body.category,
    itemImage: request.file.filename,
    seller: request.user.id,
  });
  response.status(201).json({
    status: 'success',
    data: null,
  });
});

exports.editItem = catchAsync(async (request, response, next) => {
  const item = await Item.findByIdAndUpdate(
    request.params.ItemId,
    request.body,
    {
      new: true,
      runValidators: true,
    }
  );
  response.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

exports.deleteItem = catchAsync(async (request, response, next) => {
  const foundItem = await Item.findByIdAndDelete(request.params.id);
  if (!foundItem) {
    return next(new AppError('No Item with this id found!', 404));
  }
  response.status(204).json({
    status: 'success',
    data: null,
  });
});
