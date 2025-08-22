/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/driver/driver.controller.ts
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Driver } from './driver.model';
import { Ride } from '../ride/ride.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const  getAvailableRides = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const availableRides = await Ride.find({ status: 'requested' }).populate('rider');
  res.json(availableRides);
});

export const getAllDrivers = asyncHandler(async (req: Request, res: Response) => {
  const drivers = await User.find({ role: "driver" });
  res.json(drivers);
});




// Get a single driver by ID
export const getDriverById = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.params;
  

  const driver = await Driver.findById(_id);
  if (!driver) {
    res.status(404).json({ error: "Driver not found" });
    return;
  }

  res.json(driver);
});

// controllers/ride.controller.ts
export const acceptRide = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const ride = await Ride.findById(req.params.id);

    if (!ride || ride.status !== 'requested') {
      res.status(400).json({ error: 'Ride not available' }); // ✅ No `return` here
      return;
    }

    ride.status = 'accepted';
  ride.driver = new mongoose.Types.ObjectId(req.user?.id);

// mark driver unavailable
await Driver.findOneAndUpdate(
  { user: req.user?.id },
  { availability: false }
);

    ride.timestamps = {
      ...(ride.timestamps || {}),
      acceptedAt: new Date(),
    };

    await ride.save();
    res.json(ride); // ✅ OK to end response here
  }
);
export const rejectRide = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const ride = await Ride.findById(req.params.id);

    if (!ride || ride.status !== 'requested') {
      res.status(400).json({ error: 'Ride is not available for rejection' }); // ✅ No `return` here
      return;
    }

    ride.status = 'rejected';
  ride.driver = new mongoose.Types.ObjectId(req.user?.id);
    ride.timestamps = {
      ...(ride.timestamps || {}),
      acceptedAt: new Date(),
    };

    await ride.save();
     res.json({ message: 'Ride rejected successfully', ride });
  }
);

// controllers/ride.controller.ts
export const startRide = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const ride = await Ride.findById(req.params.id);
  
  if (!ride || ride.status !== 'accepted' || ride.driver?.toString() !== req.user?.id) {
    res.status(400).json({ error: 'Cannot start this ride' });
    return;
  }

  ride.status = 'in_transit';
  ride.timestamps = { ...(ride.timestamps || {}), pickedUpAt: new Date() };

  await ride.save();
  res.json(ride);
});

// controllers/ride.controller.ts
export const completeRide = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride || ride.status !== 'completed' || ride.driver?.toString() !== req.user?.id) {
     res.status(400).json({ error: 'Cannot complete this ride' });
     return
  }

  ride.status = 'completed';
  ride.timestamps = { ...(ride.timestamps || {}), completedAt: new Date() };

  await ride.save();

  await Driver.findOneAndUpdate(
  { user: req.user?.id },
  { availability: true }
);
  res.json(ride);
});

export const getDriverEarnings = asyncHandler(
  
  async (req: AuthenticatedRequest, res: Response) => {
    const driverId = (req as any).user.id;;
    console.log("Driver ID from token:", driverId);

     if (!mongoose.Types.ObjectId.isValid(driverId)) {
    res.status(400).json({ error: "Invalid driver ID" });
    return;
  }

    // Find all completed rides by this driver
    const rides = await Ride.find({
      driver: driverId,
      status: "completed",
    }).sort({ completedAt: -1 }); // Latest first

    // Total earnings
    const totalEarnings = rides.reduce((sum, ride) => sum + (ride.fare || 0), 0);

   res.status(200).json({
    totalEarnings,
    rideCount: rides.length,
    rides,
  });
  }
);

export const updateRideStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const driverId = (req as any).user.id;

  const allowedStatuses = [ 'accepted', 'picked_up', 'in_transit', 'completed','cancelled','rejected'];

  if (!allowedStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Invalid status. Allowed: ${allowedStatuses.join(', ')}`);
  }

  const ride = await Ride.findOne({ _id: id });

  if (!ride) {
    res.status(404);
    throw new Error('Ride not found or not assigned to you');
  }

  ride.status = status;
  await ride.save();

  res.json({
    message: `Ride status updated to ${status}`,
    ride
  });
});

export const updateDriverAvailability = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const driverId = req.user?.id;

    if (!driverId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const driver = await Driver.findOne({ user: driverId });
    if (!driver) {
      res.status(404).json({ error: "Driver not found" });
      return;
    }

    // toggle or set explicitly
    driver.availability = req.body.availability;
    await driver.save();

    res.json({ message: "Availability updated", availability: driver.availability });
  }
);

export const getAvailableDrivers = asyncHandler(async (req: Request, res: Response) => {
  const drivers = await Driver.find({ availability: true }).populate("user", "name email");
  res.json(drivers);
});





