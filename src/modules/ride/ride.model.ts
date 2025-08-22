import mongoose, { Schema, model, Types } from 'mongoose';

export type RideStatus =
  | 'requested'
  | 'accepted'
  | 'picked_up'
  | 'in_transit'
  | 'completed'
  | 'cancelled'
  |'rejected'

const rideSchema = new Schema(
  {
    rider: { type: Types.ObjectId, ref: 'User', required: true },
driver: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: false,
},
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
     fare: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['requested', 'accepted', 'picked_up', 'in_transit', 'completed', 'cancelled','rejected'],
      default: 'requested',
    },
    
     completedAt: { type: Date },
     timestamps: {
      type: Object,
      default: {}, // 👈 ensures timestamps object always exists
    },
  },
  { timestamps: true },

);

export const Ride = model('Ride', rideSchema);
