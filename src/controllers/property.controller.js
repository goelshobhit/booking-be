const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { propertyService, locationService, roomService, imageService } = require('../services');

const createProperty = catchAsync(async (req, res) => {
  const Property = await propertyService.createProperty(req.body);
  res.status(httpStatus.CREATED).send(Property);
});

const getPropertys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await propertyService.queryPropertys(filter, options);
  res.send(result);
});

const getProperty = catchAsync(async (req, res) => {
  const Property = await propertyService.getPropertyById(req.params.propertyId);
  if (!Property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }

  const locationData = await locationService.getLocationByPropertyId(req.params.propertyId);

  const propertyRooms = await roomService.getRoomsByPropertyId(req.params.propertyId);

  const propertyImages = await imageService.getImagesByPropertyId(req.params.propertyId);

  const data = {
    ...Property._doc,
    location: locationData,
    rooms: propertyRooms,
    images: propertyImages,
    coverImage: propertyImages[0],
  };
  res.send(data);
});

const updateProperty = catchAsync(async (req, res) => {
  const Property = await propertyService.updatePropertyById(req.params.PropertyId, req.body);
  res.send(Property);
});

const deleteProperty = catchAsync(async (req, res) => {
  await propertyService.deletePropertyById(req.params.PropertyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProperty,
  getPropertys,
  getProperty,
  updateProperty,
  deleteProperty,
};
