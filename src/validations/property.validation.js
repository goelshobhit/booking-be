const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProperty = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    headerLine: Joi.string().required(),
    ownerId: Joi.string().required(),
    size: Joi.string().required(),
    montlyRent: Joi.string().required(),
    securityDeposit: Joi.string().required(),
    visibleType: Joi.string(),
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

const getProperty = {
  params: Joi.object().keys({
    propertyId: Joi.string().custom(objectId),
  }),
};

const updateProperty = {
  params: Joi.object().keys({
    propertyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      headerLine: Joi.string(),
      ownerId: Joi.string(),
      size: Joi.string(),
      montlyRent: Joi.string(),
      securityDeposit: Joi.string(),
      visibleType: Joi.string(),
    })
    .min(1),
};

const deleteProperty = {
  params: Joi.object().keys({
    PropertyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
};
