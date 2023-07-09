require('module-alias/register');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var Helmet = require('helmet');
var Compression = require('compression');

var app = express();
const route = require('@src/routes');
const { errorHandler } = require('@src/exceptions/error-handler.exception');
const { notFoundHandler } = require('@src/exceptions/not-found-handler.exception');

app.use(Helmet());
app.use(Compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use(cors());
app.use(logger('dev'));

// Route
app.use('/', route);

// catch 404 and forward to error handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// set header
app.use((req, res) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header('Content-Type', 'application/json');
  res.send();
});

module.exports = app;
