import express from 'express';
import createError from 'http-errors';
import routes from './config/routes.js';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
routes(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'This url does not exist.'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ error: message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`)
})