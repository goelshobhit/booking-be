const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: false,
      trim: true,
    },
    lat: {
      type: String,
      required: false,
      trim: true,
      default: 0,
    },
    lng: {
      type: String,
      required: false,
      trim: true,
      default: 0,
    },
    country: {
      type: String,
      required: false,
      trim: true,
    },
    formattedAddress: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: false,
      trim: true,
    },
    zipCode: {
      type: String,
      required: false,
      trim: true,
    },
    propertyId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef property
 */
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
