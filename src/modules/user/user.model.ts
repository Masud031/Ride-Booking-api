import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserRole = 'admin' | 'rider' | 'driver';
export type UserStatus = 'active' | 'approved' | 'blocked' | 'suspended';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus; // 
  isBlocked?: boolean;
  isApproved?: boolean; // Only for drivers
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'rider', 'driver'], required: true },
  status: {
    type: String,
    enum: ['active', 'approved', 'blocked', 'suspended'], // 
    default: 'active'
  },
   // Admin-related controls
  isBlocked: { type: Boolean, default: false },// Any user can be blocked
  isApproved: { type: Boolean, default: false }, // Driver-only
},
 { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', userSchema);
