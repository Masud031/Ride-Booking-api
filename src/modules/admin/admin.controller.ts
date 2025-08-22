import asyncHandler from 'express-async-handler';
import { Ride } from '../../modules/ride/ride.model';
import { User } from '../../modules/user/user.model';  



// controllers/admin.controller.ts
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});
export const getAllDrivers = asyncHandler(async (req, res) => {
  const drivers = await User.find({ role: "driver" }).select("-password").sort({ createdAt: -1 });
  res.json(drivers);
}); 

export const getDriverById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const driver = await User.findOne({ _id: id, role: "driver" })
    .select("-password");

  if (!driver) {
    res.status(404).json({ message: "Driver not found" });
     return
  }

  res.json(driver);
});

export const getAllRides = asyncHandler(async (req, res) => {
  const rides = await Ride.find().populate("driver rider", "name email role").sort({ createdAt: -1 });
  res.json(rides);
});

export const approveDriver = asyncHandler(async (req, res) => {
  const driver = await User.findById(req.params.id);

  if (!driver) {
     res.status(404).json({ error: 'Driver not found' });
     return
  }

  driver.status = 'approved';
  await driver.save();

  res.json({ message: 'Driver approved', driver });
});

export const suspendDriver = asyncHandler(async (req, res) => {
  const driver = await User.findById(req.params.id);

  if (!driver) {
     res.status(404).json({ error: 'Driver not found' });
     return
  }

  driver.status = 'suspended';
  await driver.save();

  res.json({ message: 'Driver suspended', driver });
});

export const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
     res.status(404).json({ error: 'User not found' });
     return
  }

  user.status = 'blocked';
  await user.save();

  res.json({ message: 'User blocked', user });
});

export const unblockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
     res.status(404).json({ error: 'User not found' });
     return
  }

  user.status = 'active';
  await user.save();

  res.json({ message: 'User unblocked', user });
});

export const getRideReports = asyncHandler(async (req, res) => {
  const completedRides = await Ride.find({ status: 'completed' })
    .populate('rider')
    .populate('driver');

  res.json(completedRides);
});

export const approveRider = asyncHandler(async (req, res) => {
  const Rider = await User.findById(req.params.id);

  if (!Rider) {
     res.status(404).json({ error: 'Rider not found' });
     return
  }

  Rider.status = 'approved';
  await Rider.save();

  res.json({ message: 'Rider approved', Rider });
});



