const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    bed_count: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    roomType: {
      type: String,
      required: false,
      trim: true,
    },
    associatedRoomName: {
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
 * Check if email is taken
 * @param {string} email - The room's email
 * @param {ObjectId} [excludeUserId] - The id of the room to be excluded
 * @returns {Promise<boolean>}
 */
roomSchema.statics.isRoomTaken = async function (associatedRoomName, excludeUserId) {
  const room = await this.findOne({ associatedRoomName, _id: { $ne: excludeUserId } });
  return !!room;
};

/**
 * @typedef User
 */
const User = mongoose.model('Room', roomSchema);

module.exports = User;
