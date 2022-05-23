const httpStatus = require('http-status');
const cloudinary = require('cloudinary').v2;
const catchAsync = require('../utils/catchAsync');
const { imageService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

cloudinary.config({
  cloud_name: 'shobhitgoel',
  api_key: '958996248145116',
  api_secret: '1BZTNAF1Ai3afi_CwuxEUhnfeEw',
});

const createFile = catchAsync(async (req, res) => {
  const imageData = { ...req.file, propertyId: req.body.propertyId };
  const finalImage = await imageService.createImage(imageData);
  res.status(httpStatus.CREATED).send(finalImage);
});

const getImages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await imageService.queryImage(filter, options);
  res.send(result);
});

const getImage = catchAsync(async (req, res) => {
  const Image = await imageService.getImageById(req.params.imageId);
  if (!Image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  res.send(Image);
});

const updateImage = catchAsync(async (req, res) => {
  const Image = await imageService.updateImageById(req.params.imageId, req.body);
  res.send(Image);
});

const deleteImage = catchAsync(async (req, res) => {
  const Image = await imageService.getImageById(req.params.imageId);
  cloudinary.uploader.destroy(Image.filename, async function (error, result) {
    if (result.result === 'ok') {
      await imageService.deleteImageById(req.params.imageId);
      res.status(httpStatus.NO_CONTENT).send();
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
    }
  });
});

module.exports = {
  createFile,
  getImage,
  getImages,
  updateImage,
  deleteImage,
};
