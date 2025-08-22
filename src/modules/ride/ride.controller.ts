import { Request, Response } from 'express';
import { Ride } from './ride.model';
import asyncHandler from 'express-async-handler';

// import { User } from '../user/user.model';
// import mongoose from 'mongoose';

// interface AuthenticatedRequest extends Request {
//   user?: {
//     id: string;
//     role: string;
//   };
// }



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

    if (ride.status !== 'requested') {
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


// In your controller file
export const getRideStatus = asyncHandler(async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) {
     res.status(404).json({ error: 'Ride not found' });
     return
  }
  res.json({ status: ride.status });
});

//  Get ride history for a specific rider
export const getRideHistory = asyncHandler(async (req, res) => {
  const riderId = req.params.id;

  // Find all rides requested by this rider
  const rides = await Ride.find({ rider: riderId })
    .populate("driver", "name email") // show driver info
    .sort({ createdAt: -1 }); // latest rides first

  if (!rides || rides.length === 0) {
     res.status(404).json({ message: "No rides found for this rider" });
  }

  res.status(200).json({
    riderId,
    totalRides: rides.length,
    rides,
  });
});








