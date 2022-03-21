const morgan = require('morgan');
const express = require('express');
const AppError = require('./utility/appError');
const globalErrorHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const app = express();
app.use(cookieParser());
// app.use((request, response, next) => {
//   response.setHeader('Access-Control-Allow-Origin', '*');
//   response.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, PUT, DELETE, OPTIONS'
//   );
//   response.setHeader(
//     'Access-Control-Allow-Headers',
//     ' Origin, Content-Type, X-Auth-Token'
//   );
//   next();
// });

const corsOptions = {
  // origin: '*',
  origin:
    process.env.NODE === 'production'
      ? 'https://shopdi.herokuapp.com/'
      : 'http://localhost:3000',
  credentials: true,
};
// app.use(cors());
app.use(cors(corsOptions));
// app.options('*', cors());

app.enable('trust proxy', 1);
app.use(express.json());
app.use(express.static('public'));
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
    },
  })
);
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ['price', 'category'],
  })
);
app.use(morgan('dev'));
app.use(compression());

const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 1000,
  message: 'Too many request, Please try again later in an hour',
});

const ItemRouter = require('./routes/itemRoute');
const UserRouter = require('./routes/userRoute');
const ReviewRouter = require('./routes/reviewRoute');

// Routes
app.use('/api', limiter);
app.use('/api/v1/items', ItemRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/reviews', ReviewRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.all('*', (request, response, next) => {
  error = new AppError(`cannot find ${request.originalUrl}`, 404);
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
