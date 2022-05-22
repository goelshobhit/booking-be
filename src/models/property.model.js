const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { propertyTypes } = require('../config/propertyVisibility');

const propertySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    headerLine: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    montlyRent: {
      type: Number,
      required: true,
      trim: true,
    },
    securityDeposit: {
      type: Number,
      required: true,
      trim: true,
    },
    visibleType: {
      type: String,
      enum: [propertyTypes.PRIVATE, propertyTypes.PUBLIC],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
propertySchema.plugin(toJSON);
propertySchema.plugin(paginate);

/**
 * @typedef property
 */
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
