// src/modules/driver/driver.model.ts
import mongoose, { Schema, Document } from 'mongoose';

// Interface for Driver Model
export interface IDriver extends Document {
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'approved';
  // Other fields specific to driver, e.g., license info, etc.
}

const driverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, default: 'active', enum: ['active', 'suspended', 'approved'] },
  // You can add more fields like license number, etc.
}, { timestamps: true });

// Driver Model
export const Driver = mongoose.model<IDriver>('Driver', driverSchema);
