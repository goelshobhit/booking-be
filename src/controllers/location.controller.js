const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { locationService } = require('../services');

const createLocation = catchAsync(async (req, res) => {
  const Location = await locationService.createLocation(req.body);
  res.status(httpStatus.CREATED).send(Location);
});

const getLocations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await locationService.queryLocation(filter, options);
  res.send(result);
});

const getLocation = catchAsync(async (req, res) => {
  const Location = await locationService.getLocationById(req.params.LocationId);
  if (!Location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  res.send(Location);
});

const updateLocation = catchAsync(async (req, res) => {
  const Location = await locationService.updateLocationById(req.params.LocationId, req.body);
  res.send(Location);
});

const deleteLocation = catchAsync(async (req, res) => {
  await locationService.deleteLocationById(req.params.LocationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLocation,
  getLocation,
  getLocations,
  updateLocation,
  deleteLocation,
};
