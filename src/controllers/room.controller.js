const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { roomService } = require('../services');

const createRoom = catchAsync(async (req, res) => {
  const Room = await roomService.createRoom(req.body);
  res.status(httpStatus.CREATED).send(Room);
});

const getRooms = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roomService.queryRoom(filter, options);
  res.send(result);
});

const getRoom = catchAsync(async (req, res) => {
  const Room = await roomService.getRoomById(req.params.roomId);
  if (!Room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  res.send(Room);
});

const updateRoom = catchAsync(async (req, res) => {
  const Room = await roomService.updateRoomById(req.params.roomId, req.body);
  res.send(Room);
});

const deleteRoom = catchAsync(async (req, res) => {
  await roomService.deleteRoomById(req.params.roomId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
};
