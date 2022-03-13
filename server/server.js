const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = require('./app');

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, './client/build')));
}

dotenv.config({ path: './config.env' });

const database = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(database).then(() => {
  // eslint-disable-next-line no-console
  console.log('Database connections successfully!');
});

process.on('uncaughtException', (error) => {
  console.log(error);
  console.log(error.message);
  console.log('UNHANDLED EXCEPTION !!');
  process.exit(1);
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has successfully started on PORT ${port}...`);
  console.log(`Server started with ${process.env.NODE_ENV} environment...`);
});

process.on('unhandledRejection', (error) => {
  console.log(error);
  console.log(error.message);
  console.log('UNHANDLED REJECTION !! 💣💣💣 Server Shutting down ....');
  server.close(() => {
    process.exit(1);
  });
});
