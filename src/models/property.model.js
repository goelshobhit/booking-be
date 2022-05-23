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
      required: false,
      trim: true,
      default: 1000,
    },
    securityDeposit: {
      type: Number,
      required: false,
      trim: true,
      default: 1000,
    },
    visibleType: {
      type: String,
      enum: [propertyTypes.PRIVATE, propertyTypes.PUBLIC],
      required: true,
    },
    interestCount: {
      type: Number,
      default: 0,
      required: false,
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
 * Check if name is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

 propertySchema.statics.isPropertyTaken = async function (name, excludeUserId) {
  const user = await this.findOne({ name, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * @typedef property
 */
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
