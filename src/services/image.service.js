const httpStatus = require('http-status');
const { Image } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Image
 * @param {Object} ImageBody
 * @returns {Promise<Image>}
 */
const createImage = async (ImageBody) => {
  return Image.create(ImageBody);
};

/**
 * Query for Images
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryImages = async (filter, options) => {
  const Images = await Image.paginate(filter, options);
  return Images;
};

/**
 * Get Image by id
 * @param {ObjectId} id
 * @returns {Promise<Image>}
 */
const getImageById = async (id) => {
  const ImageData = Image.findById(id);
  return ImageData;
};

/**
 * Get Image by email
 * @param {string} email
 * @returns {Promise<Image>}
 */
const getImageByEmail = async (email) => {
  return Image.findOne({ email });
};

const getImagesByPropertyId = async (id) => {
  return Image.find({ propertyId: id });
};

/**
 * Update Image by id
 * @param {ObjectId} ImageId
 * @param {Object} updateBody
 * @returns {Promise<Image>}
 */
const updateImageById = async (ImageId, updateBody) => {
  const property = await getImageById(ImageId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  Object.assign(property, updateBody);
  await Image.save();
  return Image;
};

/**
 * Delete Image by id
 * @param {ObjectId} ImageId
 * @returns {Promise<Image>}
 */
const deleteImageById = async (ImageId) => {
  const property = await getImageById(ImageId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  await Image.remove();
  return Image;
};

module.exports = {
  createImage,
  queryImages,
  getImageById,
  getImageByEmail,
  updateImageById,
  deleteImageById,
  getImagesByPropertyId,
};
