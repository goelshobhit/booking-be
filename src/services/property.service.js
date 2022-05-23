const httpStatus = require('http-status');
const { Property } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Property
 * @param {Object} PropertyBody
 * @returns {Promise<Property>}
 */
const createProperty = async (PropertyBody) => {
  if (await Property.isPropertyTaken(PropertyBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Property Name is already taken');
  }
  return Property.create(PropertyBody);
};

/**
 * Query for Propertys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPropertys = async (filter, options) => {
  const Properties = await Property.paginate(filter, options);
  return Properties;
};

/**
 * Get Property by id
 * @param {ObjectId} id
 * @returns {Promise<Property>}
 */
const getPropertyById = async (id) => {
  const PropertyData = Property.findById(id);
  return PropertyData;
};

/**
 * Get Property by email
 * @param {string} email
 * @returns {Promise<Property>}
 */
const getPropertyByEmail = async (email) => {
  return Property.findOne({ email });
};

/**
 * Update Property by id
 * @param {ObjectId} PropertyId
 * @param {Object} updateBody
 * @returns {Promise<Property>}
 */
const updatePropertyById = async (PropertyId, updateBody) => {
  const property = await getPropertyById(PropertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  Object.assign(property, updateBody);
  await Property.save();
  return Property;
};

/**
 * Delete Property by id
 * @param {ObjectId} PropertyId
 * @returns {Promise<Property>}
 */
const deletePropertyById = async (PropertyId) => {
  const property = await getPropertyById(PropertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  await Property.remove();
  return Property;
};

module.exports = {
  createProperty,
  queryPropertys,
  getPropertyById,
  getPropertyByEmail,
  updatePropertyById,
  deletePropertyById,
};
