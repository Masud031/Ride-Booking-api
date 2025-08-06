import asyncHandler from 'express-async-handler';
import { Ride } from '../../modules/ride/ride.model';
import { User } from '../../modules/user/user.model';  


// controllers/admin.controller.ts
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
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

