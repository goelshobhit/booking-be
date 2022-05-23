const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
  {
    fieldname: {
      type: String,
      required: true,
      trim: true,
    },
    originalname: {
      type: String,
      required: true,
      trim: true,
    },
    encoding: {
      type: String,
      required: false,
      trim: true,
      default: 0,
    },
    mimetype: {
      type: String,
      required: false,
      trim: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    filename: {
      type: String,
      required: true,
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
 * @typedef Image
 */
const Image = mongoose.model('image', imageSchema);

module.exports = Image;
