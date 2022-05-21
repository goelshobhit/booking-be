const catchAsync = require('../utils/catchAsync');

const createFile = catchAsync(async (req, res) => {
  res.send(req.file);
});

module.exports = {
  createFile,
};
