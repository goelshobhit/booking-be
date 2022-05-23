const httpStatus = require('http-status');
const { Location } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Location
 * @param {Object} LocationBody
 * @returns {Promise<Location>}
 */
const createLocation = async (LocationBody) => {
  return Location.create(LocationBody);
};

/**
 * Query for Locations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLocations = async (filter, options) => {
  const Properties = await Location.paginate(filter, options);
  return Properties;
};

/**
 * Get Location by id
 * @param {ObjectId} id
 * @returns {Promise<Location>}
 */
const getLocationById = async (id) => {
  return Location.findById(id);
};

const getLocationByPropertyId = async (id) => {
  return Location.findOne({ propertyId: id });
};

/**
 * Get Location by email
 * @param {string} email
 * @returns {Promise<Location>}
 */
const getLocationByEmail = async (email) => {
  return Location.findOne({ email });
};

/**
 * Update Location by id
 * @param {ObjectId} LocationId
 * @param {Object} updateBody
 * @returns {Promise<Location>}
 */
const updateLocationById = async (LocationId, updateBody) => {
  const property = await getLocationById(LocationId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  Object.assign(property, updateBody);
  await Location.save();
  return Location;
};

/**
 * Delete Location by id
 * @param {ObjectId} LocationId
 * @returns {Promise<Location>}
 */
const deleteLocationById = async (LocationId) => {
  const property = await getLocationById(LocationId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  await Location.remove();
  return Location;
};

module.exports = {
  createLocation,
  queryLocations,
  getLocationById,
  getLocationByEmail,
  updateLocationById,
  deleteLocationById,
  getLocationByPropertyId,
};
