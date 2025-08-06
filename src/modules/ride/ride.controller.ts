import { Request, Response } from 'express';
import { Ride } from './ride.model';
import asyncHandler from 'express-async-handler';

// import { User } from '../user/user.model';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}



export const requestRide = async (req: Request, res: Response) => {
  try {
    const { pickupLocation, destination } = req.body;

    const ride = await Ride.create({
      rider: req.user?.id,
      pickupLocation,
      destination,
      timestamps: { requestedAt: new Date() },
    });

    res.status(201).json({ message: 'Ride requested successfully', ride });
  } catch (error) {
    res.status(500).json({ error: 'Failed to request ride', details: error });
  }
};

export const cancelRide = async (req: Request, res: Response) => {
  try {
    const ride = await Ride.findOne({ _id: req.params.id, rider: req.user?.id });

    if (!ride) return res.status(404).json({ error: 'Ride not found' });

    if (ride.status !== 'pending') {
      return res.status(400).json({ error: 'Cannot cancel after accepted' });
    }

    ride.status = 'cancelled';
    ride.timestamps.cancelledAt = new Date();
    await ride.save();

    res.status(200).json({ message: 'Ride cancelled', ride });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel ride', details: error });
  }
};

export const getRideHistory = async (req: Request, res: Response) => {
  try {
    const rides = await Ride.find({ rider: req.user?.id }).sort({ createdAt: -1 });
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ride history', details: error });
  }
};

// controllers/ride.controller.ts
export const getAvailableRides = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  console.log('User ID:', req.user?.id);
  const availableRides = await Ride.find({ status: 'pending' }).populate('rider');
  res.json(availableRides);
});

// controllers/ride.controller.ts
export const acceptRide = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const ride = await Ride.findById(req.params.id);

    if (!ride || ride.status !== 'pending') {
      res.status(400).json({ error: 'Ride not available' }); // ✅ No `return` here
      return;
    }

    ride.status = 'accepted';
  ride.driver = new mongoose.Types.ObjectId(req.user?.id);
    ride.timestamps = {
      ...(ride.timestamps || {}),
      acceptedAt: new Date(),
    };

    await ride.save();
    res.json(ride); // ✅ OK to end response here
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
  res.json(ride);
});

// In your controller file
export const getRideStatus = asyncHandler(async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) {
     res.status(404).json({ error: 'Ride not found' });
     return
  }
  res.json({ status: ride.status });
});


