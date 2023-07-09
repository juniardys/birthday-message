const notFoundHandler = (err, req, res, next) => {
  return res.status(404).send({
    message: 'Not Found',
    statusCode: 404,
    requestedUrl: req.path,
  });
};

module.exports = {
  notFoundHandler
};