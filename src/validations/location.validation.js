const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLocation = {
  body: Joi.object().keys({
    city: Joi.string().required(),
    lat: Joi.string().required(),
    lng: Joi.string().required(),
    country: Joi.string().required(),
    formattedAddress: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    propertyId: Joi.string().custom(objectId),
  }),
};

const getProperties = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

const updateLocation = {
  params: Joi.object().keys({
    locationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      city: Joi.string().required(),
      lat: Joi.string().required(),
      lng: Joi.string().required(),
      country: Joi.string().required(),
      formattedAddress: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      propertyId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLocation,
  getProperties,
  getLocation,
  updateLocation,
  deleteLocation,
};
