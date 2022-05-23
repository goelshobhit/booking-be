const httpStatus = require('http-status');
const { Room } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Room
 * @param {Object} RoomBody
 * @returns {Promise<Room>}
 */
const createRoom = async (RoomBody) => {
  if (await Room.isRoomTaken(RoomBody.associatedRoomName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Room Name is already taken');
  }
  return Room.create(RoomBody);
};

/**
 * Query for Rooms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRooms = async (filter, options) => {
  const Properties = await Room.paginate(filter, options);
  return Properties;
};

/**
 * Get Room by id
 * @param {ObjectId} id
 * @returns {Promise<Room>}
 */
const getRoomById = async (id) => {
  const RoomData = Room.findById(id);
  return RoomData;
};

/**
 * Get Room by email
 * @param {string} email
 * @returns {Promise<Room>}
 */
const getRoomByEmail = async (email) => {
  return Room.findOne({ email });
};

const getRoomsByPropertyId = async (id) => {
  return Room.find({ propertyId: id });
};

/**
 * Update Room by id
 * @param {ObjectId} RoomId
 * @param {Object} updateBody
 * @returns {Promise<Room>}
 */
const updateRoomById = async (RoomId, updateBody) => {
  const property = await getRoomById(RoomId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  Object.assign(property, updateBody);
  await Room.save();
  return Room;
};

/**
 * Delete Room by id
 * @param {ObjectId} RoomId
 * @returns {Promise<Room>}
 */
const deleteRoomById = async (RoomId) => {
  const property = await getRoomById(RoomId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  await Room.remove();
  return Room;
};

module.exports = {
  createRoom,
  queryRooms,
  getRoomById,
  getRoomByEmail,
  updateRoomById,
  deleteRoomById,
  getRoomsByPropertyId,
};
