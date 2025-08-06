// src/modules/driver/driver.controller.ts
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Driver } from './driver.model';

// Get all drivers
export const getAllDrivers = asyncHandler(async (req: Request, res: Response) => {
  const drivers = await Driver.find();
  res.json(drivers);
});

// Get a single driver by ID
export const getDriverById = asyncHandler(async (req: Request, res: Response) => {
  const driver = await Driver.findById(req.params.id);

  if (!driver) {
   res.status(404).json({ error: 'Driver not found' });
    return 
  }

  res.json(driver);
});

// Approve a driver
export const approveDriver = asyncHandler(async (req: Request, res: Response) => {
  const driver = await Driver.findById(req.params.id);

  if (!driver) {
    res.status(404).json({ error: 'Driver not found' });
     return
  }

  driver.status = 'approved';
  await driver.save();

  res.json({ message: 'Driver approved', driver });
});

// Suspend a driver
export const suspendDriver = asyncHandler(async (req: Request, res: Response) => {
  const driver = await Driver.findById(req.params.id);

  if (!driver) {
     res.status(404).json({ error: 'Driver not found' });
     return
  }

  driver.status = 'suspended';
  await driver.save();

  res.json({ message: 'Driver suspended', driver });
});
