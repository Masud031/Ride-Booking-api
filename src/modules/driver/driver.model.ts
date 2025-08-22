/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/driver/driver.model.ts
import mongoose, { Schema, Document } from 'mongoose';

// Interface for Driver Model
export interface IDriver extends Document {
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'approved';
  availability: any;
}

const driverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, default: 'active', enum: ['active', 'suspended', 'approved'] },
 availability: { type: Boolean, default: true },
}, { timestamps: true });

// Driver Model
export const Driver = mongoose.model<IDriver>('Driver', driverSchema);